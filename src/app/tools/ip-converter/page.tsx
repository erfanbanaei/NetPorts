// app/tools/ip-converter/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";

import type { Lang } from "@/types";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function IPConverter() {
  const [isDark] = useLocalStorage<boolean>("netports:dark", true);
  const [lang] = useLocalStorage<Lang>("netports:lang", "fa");
  const isRTL = lang === "fa";

  const [input, setInput] = useState("192.168.1.1");
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");

  const convert = useCallback(() => {
    try {
      setError("");
      // پاکسازی ورودی
      const val = input.trim();

      // بررسی اینکه آیا ورودی IP است
      if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(val)) {
        const octets = val.split(".").map(Number);
        if (octets.some(o => o > 255)) throw new Error();

        // تبدیل به Integer
        const integer = (octets[0] << 24) >>> 0 | (octets[1] << 16) | (octets[2] << 8) | octets[3];
        
        // تبدیل به Binary
        const binary = octets.map(o => o.toString(2).padStart(8, "0")).join(".");
        
        // تبدیل به Hex
        const hex = octets.map(o => o.toString(16).padStart(2, "0").toUpperCase()).join("");

        setResults({ integer, binary, hex, type: "IP" });
      } 
      // بررسی اینکه آیا ورودی عدد صحیح است
      else if (/^\d+$/.test(val)) {
        const num = parseInt(val);
        if (num > 4294967295) throw new Error();

        const ip = [
          (num >>> 24) & 0xff,
          (num >>> 16) & 0xff,
          (num >>> 8) & 0xff,
          num & 0xff
        ].join(".");

        setResults({ ip, type: "INT" });
      } else {
        if (val !== "") throw new Error();
      }
    } catch (err) {
      setError(lang === "fa" ? "فرمت وارد شده نامعتبر است" : "Invalid format");
      setResults(null);
    }
  }, [input, lang]);

  useEffect(() => {
    convert();
  }, [convert]);

  const t = {
    title: lang === "fa" ? "مبدل IP" : "IP Converter",
    desc: lang === "fa" ? "تبدیل IPv4 به عدد صحیح، باینری و هگزادسیمال" : "Convert IPv4 to Integer, Binary, and Hex",
    placeholder: lang === "fa" ? "آدرس IP یا عدد صحیح را وارد کنید..." : "Enter IP address or Integer...",
    intLabel: lang === "fa" ? "عدد صحیح (Integer)" : "Integer Format",
    binLabel: lang === "fa" ? "باینری (Binary)" : "Binary Format",
    hexLabel: lang === "fa" ? "هگزادسیمال (Hex)" : "Hexadecimal",
    ipLabel: lang === "fa" ? "آدرس IP" : "IP Address",
    back: lang === "fa" ? "بازگشت به ابزارها" : "Back to Tools",
    copy: lang === "fa" ? "کپی" : "Copy",
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className={`min-h-screen transition-colors p-4 sm:p-8 ${isDark ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-slate-800"}`}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 mb-6 hover:underline">
          {isRTL ? "→" : "←"} {t.back}
        </Link>
        <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
          <span>🔢</span> {t.title}
        </h1>
        <p className={`mb-8 opacity-60`}>{t.desc}</p>

        {/* Input Space */}
        <div className={`p-2 rounded-2xl border mb-8 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.placeholder}
            className={`w-full px-6 py-4 rounded-xl text-xl font-mono outline-none transition-all ${
              isDark ? "bg-slate-900 text-white" : "bg-white text-gray-900"
            }`}
          />
        </div>

        {error && <p className="text-red-500 font-bold mb-4 px-2">{error}</p>}

        {/* Output Cards */}
        <div className="space-y-4">
          {results ? (
            results.type === "IP" ? (
              <>
                <ConvertCard label={t.intLabel} value={results.integer.toString()} isDark={isDark} t={t} />
                <ConvertCard label={t.binLabel} value={results.binary} isDark={isDark} t={t} mono />
                <ConvertCard label={t.hexLabel} value={`0x${results.hex}`} isDark={isDark} t={t} />
              </>
            ) : (
              <ConvertCard label={t.ipLabel} value={results.ip} isDark={isDark} t={t} />
            )
          ) : (
            <div className={`h-32 flex items-center justify-center rounded-2xl border-2 border-dashed ${isDark ? "border-slate-800" : "border-gray-200"}`}>
              <p className="opacity-40">{lang === 'fa' ? 'یک IP مثل 1.1.1.1 وارد کنید' : 'Enter an IP like 1.1.1.1'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ConvertCard({ label, value, isDark, t, mono }: any) {
  const handleCopy = () => navigator.clipboard.writeText(value);

  return (
    <div className={`p-6 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
      isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-gray-200 hover:border-blue-100"
    }`}>
      <div className="overflow-hidden">
        <label className="block text-[10px] uppercase font-bold tracking-widest mb-1 opacity-50">{label}</label>
        <div className={`text-xl font-black tracking-tight truncate ${mono ? "font-mono text-lg" : ""} ${isDark ? "text-blue-400" : "text-blue-600"}`}>
          {value}
        </div>
      </div>
      <button
        onClick={handleCopy}
        className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${
          isDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        {t.copy}
      </button>
    </div>
  );
}