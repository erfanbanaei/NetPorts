// app/tools/subnet-calculator/page.tsx
"use client";

import { useEffect, useState } from "react";

import { Address4 } from "ip-address";
import type { Lang } from "@/types";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function SubnetCalculator() {
  const [isDark] = useLocalStorage<boolean>("netports:dark", true);
  const [lang] = useLocalStorage<Lang>("netports:lang", "fa");
  const isRTL = lang === "fa";

  const [ip, setIp] = useState("192.168.1.1");
  const [mask, setMask] = useState("24");
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");

      const calculate = () => {
    try {
      setError("");
      const addr = new Address4(`${ip}/${mask}`);
      
      const startAddr = addr.startAddress();
      const endAddr = addr.endAddress();
      
      const startNum = startAddr.bigInt(); 
      const endNum = endAddr.bigInt();

      // ✅ استفاده از BigInt(1) به جای 1n برای سازگاری با نسخه‌های قدیمی‌تر
      const firstHostNum = startNum + BigInt(1);
      const lastHostNum = endNum - BigInt(1);

      // تبدیل دوباره به آدرس
      const firstHost = (Address4 as any).fromBigInt(firstHostNum).address;
      const lastHost = (Address4 as any).fromBigInt(lastHostNum).address;

      // بقیه محاسبات...
      const totalHosts = Math.pow(2, 32 - parseInt(mask));
      const usableHosts = totalHosts <= 2 ? 0 : totalHosts - 2;

      setResults({
        network: startAddr.address,
        broadcast: endAddr.address,
        firstHost: firstHost,
        lastHost: lastHost,
        totalHosts: usableHosts,
        netmask: addr.mask(),
        binary: addr.binaryZeroPad(),
        cidr: addr.subnet,
      });
    } catch (err) {
      console.error(err);
      setError(lang === "fa" ? "آدرس IP یا Subnet Mask نامعتبر است" : "Invalid IP or Subnet Mask");
      setResults(null);
    }
  };
  // محاسبه خودکار هنگام تغییر ورودی‌ها
  useEffect(() => {
    calculate();
  }, [ip, mask]);

  const t = {
    title: lang === "fa" ? "ماشین حساب زیرشبکه" : "Subnet Calculator",
    ipLabel: lang === "fa" ? "آدرس IP" : "IP Address",
    maskLabel: lang === "fa" ? "Subnet Mask (CIDR)" : "Subnet Mask (CIDR)",
    netAddr: lang === "fa" ? "آدرس شبکه (Network)" : "Network Address",
    broadAddr: lang === "fa" ? "آدرس برادکست (Broadcast)" : "Broadcast Address",
    range: lang === "fa" ? "محدوده IP های قابل استفاده" : "Usable IP Range",
    total: lang === "fa" ? "تعداد کل میزبان‌ها (Hosts)" : "Total Usable Hosts",
    maskPlain: lang === "fa" ? "ماسک شبکه" : "Subnet Mask",
    back: lang === "fa" ? "بازگشت به ابزارها" : "Back to Tools",
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className={`min-h-screen transition-colors p-4 sm:p-8 ${isDark ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-slate-800"}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 mb-6 hover:underline">
          {isRTL ? "→" : "←"} {t.back}
        </Link>
        <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
          <span>🌐</span> {t.title}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs */}
          <div className={`p-6 rounded-2xl border h-fit ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">{t.ipLabel}</label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                  isDark ? "bg-slate-800 border-slate-700 focus:border-blue-500" : "bg-white border-gray-100 focus:border-blue-500"
                }`}
                placeholder="e.g. 192.168.1.1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">{t.maskLabel}</label>
              <input
                type="number"
                min="0"
                max="32"
                value={mask}
                onChange={(e) => setMask(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all ${
                  isDark ? "bg-slate-800 border-slate-700 focus:border-blue-500" : "bg-white border-gray-100 focus:border-blue-500"
                }`}
              />
            </div>
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ResultCard label={t.netAddr} value={results.network} isDark={isDark} color="blue" />
                <ResultCard label={t.broadAddr} value={results.broadcast} isDark={isDark} color="purple" />
                <ResultCard label={t.maskPlain} value={results.netmask} isDark={isDark} color="emerald" />
                <ResultCard label={t.total} value={results.totalHosts.toLocaleString()} isDark={isDark} color="orange" />
                
                <div className={`col-span-1 sm:col-span-2 p-6 rounded-2xl border ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">{t.range}</label>
                  <div className="text-xl font-black text-blue-500 tracking-tight">
                    {results.firstHost} <span className="text-slate-500 font-normal mx-2">→</span> {results.lastHost}
                  </div>
                </div>

                {/* Binary View */}
                <div className={`col-span-1 sm:col-span-2 p-6 rounded-2xl border overflow-hidden ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Binary Representation</label>
                  <div className="font-mono text-[10px] sm:text-xs break-all opacity-80 leading-relaxed">
                    {results.binary.match(/.{1,8}/g)?.join(" . ")}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`h-full flex items-center justify-center rounded-2xl border-2 border-dashed ${isDark ? "border-slate-800" : "border-gray-200"}`}>
                <p className="opacity-40">{lang === 'fa' ? 'در انتظار ورودی معتبر...' : 'Waiting for valid input...'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ label, value, isDark, color }: any) {
  const colors: any = {
    blue: "text-blue-500",
    purple: "text-purple-500",
    emerald: "text-emerald-500",
    orange: "text-orange-500",
  };
  
  return (
    <div className={`p-6 rounded-2xl border transition-all ${isDark ? "bg-slate-900 border-slate-800 hover:border-slate-700" : "bg-white border-gray-200 hover:border-blue-100"}`}>
      <label className="block text-[10px] uppercase font-bold tracking-widest mb-2 opacity-60">{label}</label>
      <div className={`text-xl font-black tracking-tight ${colors[color]}`}>{value}</div>
    </div>
  );
}