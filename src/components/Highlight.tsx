// components/Highlight.tsx

interface Props {
  text: string;
  search: string;
  className?: string;
}

export default function Highlight({ text, search, className = "" }: Props) {
  if (!search.trim()) return <>{text}</>;

  // ایجاد یک عبارت منظم برای پیدا کردن کلمه جستجو شده (بدون حساسیت به حروف بزرگ و کوچک)
  const regex = new RegExp(`(${search})`, "gi");
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-blue-500/30 text-blue-500 rounded-sm px-0.5 border-b-2 border-blue-500">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}