import type { TransportColorSet } from "@/types";

/** رنگ badge نوع transport */
export function getTransportColor(
  transport: string,
  isDark: boolean
): string {
  const map: Record<string, string> = {
    TCP: isDark
      ? "bg-emerald-900/40 text-emerald-300 border-emerald-700"
      : "bg-emerald-50 text-emerald-700 border-emerald-200",
    UDP: isDark
      ? "bg-amber-900/40 text-amber-300 border-amber-700"
      : "bg-amber-50 text-amber-700 border-amber-200",
    "TCP/UDP": isDark
      ? "bg-violet-900/40 text-violet-300 border-violet-700"
      : "bg-violet-50 text-violet-700 border-violet-200",
  };
  return (
    map[transport] ??
    (isDark
      ? "bg-slate-800 text-slate-400 border-slate-700"
      : "bg-gray-100 text-gray-600 border-gray-200")
  );
}

/** رنگ دکمه‌های فیلتر transport */
export function getTransportFilterColors(
  isDark: boolean
): Record<"TCP" | "UDP" | "TCP/UDP", TransportColorSet> {
  return {
    TCP: {
      active: isDark
        ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20"
        : "bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20",
      dot: "bg-emerald-500",
      inactive: isDark
        ? "bg-emerald-900/30 border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/50"
        : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100",
    },
    UDP: {
      active: isDark
        ? "bg-amber-600 text-white border-amber-500 shadow-amber-500/20"
        : "bg-amber-500 text-white border-amber-400 shadow-amber-500/20",
      dot: "bg-amber-500",
      inactive: isDark
        ? "bg-amber-900/30 border-amber-800/60 text-amber-300 hover:bg-amber-900/50"
        : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100",
    },
    "TCP/UDP": {
      active: isDark
        ? "bg-violet-600 text-white border-violet-500 shadow-violet-500/20"
        : "bg-violet-500 text-white border-violet-400 shadow-violet-500/20",
      dot: "bg-violet-500",
      inactive: isDark
        ? "bg-violet-900/30 border-violet-800/60 text-violet-300 hover:bg-violet-900/50"
        : "bg-violet-50 border-violet-200 text-violet-700 hover:bg-violet-100",
    },
  };
}
export function getSecurityRiskBadge(
  risk: "low" | "medium" | "high" | "critical",
  isDark: boolean
): string {
  const styles = {
    low: isDark
      ? "bg-green-900/50 text-green-300 border border-green-700"
      : "bg-green-100 text-green-700 border border-green-300",
    medium: isDark
      ? "bg-yellow-900/50 text-yellow-300 border border-yellow-700"
      : "bg-yellow-100 text-yellow-700 border border-yellow-300",
    high: isDark
      ? "bg-orange-900/50 text-orange-300 border border-orange-700"
      : "bg-orange-100 text-orange-700 border border-orange-300",
    critical: isDark
      ? "bg-red-900/50 text-red-300 border border-red-700"
      : "bg-red-100 text-red-700 border border-red-300",
  };

  return styles[risk];
}