import type { Translations } from "@/lib/translations";

interface Props {
  isDark: boolean;
  t: Translations;
}

export default function Footer({ isDark, t }: Props) {
  return (
    <footer
      className={`text-center py-10 text-sm border-t ${
        isDark
          ? "text-slate-500 border-slate-800"
          : "text-gray-500 border-gray-200"
      }`}
    >
      {t.madeWith}{" "}
      <a
        href="https://erfanbanaei.ir"
        target="_blank"
        rel="noopener noreferrer"
        className={`font-bold hover:underline ${
          isDark
            ? "text-blue-400 hover:text-blue-300"
            : "text-blue-600 hover:text-blue-700"
        }`}
      >
        {t.creatorName}
      </a>
    </footer>
  );
}