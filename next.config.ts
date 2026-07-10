import type { NextConfig } from "next";
import path from "path";

// آدرس نهایی روی دامنه‌ی سفارشی netports.ir سرو می‌شود (روت)، بنابراین basePath خالی است.
// برای انتشار روی مسیر پروژه‌ای GitHub Pages می‌توان NEXT_PUBLIC_BASE_PATH=/NetPorts را ست کرد.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // خروجی کاملاً استاتیک برای میزبانی روی GitHub Pages
  output: "export",

  // GitHub Pages سرور بهینه‌سازی تصویر ندارد؛ باید غیرفعال باشد
  images: { unoptimized: true },

  // هر مسیر به صورت پوشه/index.html خروجی می‌گیرد تا روی Pages درست سرو شود
  trailingSlash: true,

  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // ریشه‌ی workspace را صریح می‌کنیم تا هشدار «چند lockfile» حذف شود
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
