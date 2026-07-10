// app/tools/dns-lookup/page.tsx
"use client";

import type { Lang } from "@/types";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";

export default function DNSLookup() {
  const [isDark] = useLocalStorage<boolean>("netports:dark", true);
  const [lang] = useLocalStorage<Lang>("netports:lang", "fa");
  const isRTL = lang === "fa";

  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = domain.trim();
    if (!q) return;

    setLoading(true);
    setError("");
    setResults(null);

    // جستجوی DNS مستقیم از مرورگر با DNS-over-HTTPS کلادفلر (بدون نیاز به سرور)
    const query = async (type: string) => {
      const res = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(q)}&type=${type}`,
        { headers: { Accept: "application/dns-json" } }
      );
      if (!res.ok) throw new Error("DoH request failed");
      const data = await res.json();
      return (data.Answer ?? []) as Array<{ data: string; type: number }>;
    };

    try {
      const [a, mx, ns, txt] = await Promise.all([
        query("A"),
        query("MX"),
        query("NS"),
        query("TXT"),
      ]);

      setResults({
        a: a.map((r) => r.data),
        mx: mx.map((r) => {
          const [priority, ...rest] = r.data.split(" ");
          return { priority: Number(priority), exchange: rest.join(" ").replace(/\.$/, "") };
        }),
        ns: ns.map((r) => r.data.replace(/\.$/, "")),
        // رکوردهای TXT در فرمت DoH داخل کوتیشن هستند
        txt: txt.map((r) => r.data.replace(/^"|"$/g, "")),
      });
    } catch (err) {
      setError(lang === "fa" ? "یافتن رکوردها ناموفق بود" : "Lookup failed");
    } finally {
      setLoading(false);
    }
  };

  const t = {
    title: lang === "fa" ? "جستجوی DNS" : "DNS Lookup",
    placeholder: lang === "fa" ? "مثلاً google.com" : "e.g. google.com",
    btn: lang === "fa" ? "جستجو" : "Lookup",
    back: lang === "fa" ? "بازگشت به ابزارها" : "Back to Tools",
    noRecords: lang === "fa" ? "رکوردی یافت نشد" : "No records found",
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className={`min-h-screen transition-colors p-4 sm:p-8 ${isDark ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-slate-800"}`}>
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 mb-6 hover:underline">
          {isRTL ? "→" : "←"} {t.back}
        </Link>
        <h1 className="text-3xl font-black mb-6 flex items-center gap-3">
          <span>🌍</span> {t.title}
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleLookup} className="flex gap-2 mb-10">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder={t.placeholder}
            className={`flex-1 px-6 py-4 rounded-2xl border-2 outline-none transition-all ${
              isDark ? "bg-slate-900 border-slate-800 focus:border-blue-500 text-white" : "bg-white border-gray-200 focus:border-blue-500 text-gray-900"
            }`}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all disabled:opacity-50"
          >
            {loading ? "..." : t.btn}
          </button>
        </form>

        {error && <p className="text-red-500 font-bold mb-6">{error}</p>}

        {/* Results Grid */}
        {results && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecordBox title="A Records (IPv4)" data={results.a} isDark={isDark} t={t} />
            <RecordBox title="MX Records (Mail)" data={results.mx.map((m: any) => `${m.exchange} (Prio: ${m.priority})`)} isDark={isDark} t={t} />
            <RecordBox title="NS Records (Nameservers)" data={results.ns} isDark={isDark} t={t} />
            <RecordBox title="TXT Records" data={results.txt.flat()} isDark={isDark} t={t} />
          </div>
        )}
      </div>
    </div>
  );
}

function RecordBox({ title, data, isDark, t }: any) {
  return (
    <div className={`p-6 rounded-2xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
      <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 mb-4">{title}</h3>
      {data.length > 0 ? (
        <ul className="space-y-2">
          {data.map((item: string, i: number) => (
            <li key={i} className="font-mono text-sm break-all opacity-80 border-b border-slate-700/20 pb-2 last:border-0">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs opacity-40 italic">{t.noRecords}</p>
      )}
    </div>
  );
}