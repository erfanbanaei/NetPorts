import type { Translations } from "@/lib/translations";

interface Props {
  isDark: boolean;
  t: Translations;
  type?: "search" | "favorites";
}

export default function EmptyState({ isDark, t, type = "search" }: Props) {
  const isFavorites = type === "favorites";

  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4">
      <div className="text-6xl">{isFavorites ? "⭐" : "🔍"}</div>
      <p
        className={`text-xl font-bold ${
          isDark ? "text-slate-400" : "text-gray-500"
        }`}
      >
        {isFavorites ? t.noFavorites : t.noResult}
      </p>
      <p className={`text-sm ${isDark ? "text-slate-600" : "text-gray-400"}`}>
        {isFavorites ? t.noFavoritesSub : t.noResultSub}
      </p>
    </div>
  );
}