// app/tools/whois/page.tsx
"use client";

import type { Lang } from "@/types";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";

export default function WhoisLookup() {
  const [isDark] = useLocalStorage<boolean>("netports:dark", true);
  const [lang] = useLocalStorage<Lang>("netports:lang", "fa");
  const isRTL = lang === "fa";

  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = domain.trim().toLowerCase();
    if (!q) return;

    setLoading(true);
    setError("");
    setResults(null);

    // استفاده از RDAP (جایگزین مدرن Whois) مستقیم از مرورگر — بدون نیاز به سرور
    const getVcardField = (entity: any, field: string): string | undefined => {
      const arr = entity?.vcardArray?.[1];
      if (!Array.isArray(arr)) return undefined;
      const item = arr.find((x: any[]) => x[0] === field);
      return item ? (item[3] as string) : undefined;
    };
    const findEntity = (entities: any[], role: string): any =>
      (entities ?? []).find((en) => Array.isArray(en.roles) && en.roles.includes(role));
    const eventDate = (events: any[], action: string): string | undefined =>
      (events ?? []).find((ev) => ev.eventAction === action)?.eventDate;

    try {
      const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();

      const registrarEntity = findEntity(data.entities, "registrar");
      const registrantEntity = findEntity(data.entities, "registrant");

      setResults({
        registrar: getVcardField(registrarEntity, "fn"),
        registryExpiryDate: eventDate(data.events, "expiration"),
        creationDate: eventDate(data.events, "registration"),
        registrantOrganization:
          getVcardField(registrantEntity, "org") || getVcardField(registrantEntity, "fn"),
        status: Array.isArray(data.status) ? data.status.join(", ") : undefined,
        nameservers: (data.nameservers ?? []).map((n: any) => n.ldhName),
        raw: data,
      });
    } catch (err) {
      setError(lang === "fa" ? "اطلاعاتی برای این دامنه یافت نشد" : "Domain information not found");
    } finally {
      setLoading(false);
    }
  };

  const t = {
    title: lang === "fa" ? "اطلاعات دامنه (Whois)" : "Whois Lookup",
    placeholder: lang === "fa" ? "مثلاً google.com" : "e.g. google.com",
    btn: lang === "fa" ? "دریافت اطلاعات" : "Get Info",
    back: lang === "fa" ? "بازگشت به ابزارها" : "Back to Tools",
    registrar: lang === "fa" ? "ثبت‌کننده" : "Registrar",
    expiry: lang === "fa" ? "تاریخ انقضا" : "Expiry Date",
    creation: lang === "fa" ? "تاریخ ثبت" : "Creation Date",
    status: lang === "fa" ? "وضعیت دامنه" : "Domain Status",
    owner: lang === "fa" ? "مالک / سازمان" : "Registrant / Org",
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className={`min-h-screen transition-colors p-4 sm:p-8 ${isDark ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-slate-800"}`}>
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 mb-6 hover:underline">
          {isRTL ? "→" : "←"} {t.back}
        </Link>
        <h1 className="text-3xl font-black mb-6 flex items-center gap-3">
          <span>🧾</span> {t.title}
        </h1>

        {/* Input Form */}
        <form onSubmit={handleLookup} className="flex gap-2 mb-10">
          <input
            type="text" value={domain} onChange={(e) => setDomain(e.target.value)}
            placeholder={t.placeholder}
            className={`flex-1 px-6 py-4 rounded-2xl border-2 outline-none transition-all ${
              isDark ? "bg-slate-900 border-slate-800 focus:border-blue-500" : "bg-white border-gray-200 focus:border-blue-500"
            }`}
          />
          <button
            type="submit" disabled={loading}
            className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all disabled:opacity-50"
          >
            {loading ? "..." : t.btn}
          </button>
        </form>

        {error && <p className="text-red-500 font-bold mb-6">{error}</p>}

        {/* Info Grid */}
        {results && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label={t.registrar} value={results.registrar || results.registrarName} isDark={isDark} />
            <InfoCard label={t.expiry} value={results.registryExpiryDate || results.expires} isDark={isDark} />
            <InfoCard label={t.creation} value={results.creationDate || results.created} isDark={isDark} />
            <InfoCard label={t.owner} value={results.registrantOrganization || results.registrant} isDark={isDark} />
            
            {/* Full Output (Scrollable) */}
            <div className={`col-span-1 md:col-span-2 p-6 rounded-2xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
              <h3 className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-4">Raw Whois Data</h3>
              <pre className="text-[10px] font-mono opacity-60 h-48 overflow-y-auto custom-scrollbar">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({ label, value, isDark }: any) {
  return (
    <div className={`p-5 rounded-2xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
      <label className="block text-[10px] uppercase font-black text-indigo-500 mb-1">{label}</label>
      <div className="text-sm font-bold truncate">{value || "N/A"}</div>
    </div>
  );
}