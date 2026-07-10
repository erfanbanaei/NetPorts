"use client";

import { Protocol, getFullName, protocolsData } from "@/lib/protocols";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import EmptyState from "@/components/EmptyState";
import FloatingButtons from "@/components/FloatingButtons";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import type { Lang } from "@/types";
import ProtocolCard from "@/components/ProtocolCard";
import ProtocolTable from "@/components/ProtocolTable";
import SearchModal from "@/components/SearchModal";
import StickyToolbar from "@/components/StickyToolbar";
import TopBar from "@/components/TopBar";
import { translations } from "@/lib/translations";
import { useDebounce } from "@/hooks/useDebounce";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useScrollTop } from "@/hooks/useScrollTop";
import { useUrlState, type TransportFilter } from "@/hooks/useUrlState";

// ۱. ایمپورت Fuse.js
import Fuse from "fuse.js";

const getProtocolId = (
  p: Protocol,
  index?: number
) => {
  return [
    p.name,
    p.port,
    p.transport,
    p.abbreviation,
    index,
  ]
    .filter(Boolean)
    .join("-");
};
export type SecurityType = "low" | "medium" | "high" | "critical" | "all";

function ProtocolGridInner() {
  const {
    search: urlSearch,
    category: urlCategory,
    transport: urlTransport,
    view: urlView,
    setSearch: setUrlSearch,
    setCategory: setUrlCategory,
    setTransport: setUrlTransport,
    setView: setUrlView,
  } = useUrlState();

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [transportFilter, setTransportFilter] = useState<TransportFilter>(urlTransport);
  const [securityFilter, setSecurityFilter] = useState<SecurityType>("all");
  const [showDeprecated, setShowDeprecated] = useState(true);
  const [viewMode, setViewMode] = useState(urlView);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const [isDark, setIsDark] = useLocalStorage<boolean>("netports:dark", () => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [lang, setLang] = useLocalStorage<Lang>("netports:lang", "fa");

  const { isFavorite, toggleFavorite, count: favoritesCount } = useFavorites();

  const toolbarRef = useRef<HTMLDivElement>(null);
  const showScrollTop = useScrollTop(300);
  const debouncedSearch = useDebounce(searchTerm, 200);

  const t = translations[lang];
  const isRTL = lang === "fa";

  // ۲. تنظیمات Fuse.js برای جستجوی هوشمند
  const fuse = useMemo(() => {
    return new Fuse(protocolsData, {
      keys: [
        { name: "name", weight: 2 },           // نام پروتکل اهمیت بیشتری دارد
        { name: "port", weight: 2 },           // پورت اهمیت بیشتری دارد
        { name: "abbreviation", weight: 1.5 },
        { name: "description.fa", weight: 1 },
        { name: "description.en", weight: 1 },
      ],
      threshold: 0.3, // حساسیت جستجو (کمتر = دقیق‌تر)
      distance: 100,
      includeMatches: true,
    });
  }, []);

  const debouncedUrlSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    if (debouncedUrlSearch !== urlSearch) setUrlSearch(debouncedUrlSearch);
  }, [debouncedUrlSearch, urlSearch, setUrlSearch]);

  useEffect(() => {
    if (selectedCategory !== urlCategory) setUrlCategory(selectedCategory);
  }, [selectedCategory, urlCategory, setUrlCategory]);

  useEffect(() => {
    if (transportFilter !== urlTransport) setUrlTransport(transportFilter);
  }, [transportFilter, urlTransport, setUrlTransport]);

  useEffect(() => {
    if (viewMode !== urlView) setUrlView(viewMode);
  }, [viewMode, urlView, setUrlView]);

  useEffect(() => setSearchTerm(urlSearch), [urlSearch]);
  useEffect(() => setSelectedCategory(urlCategory), [urlCategory]);
  useEffect(() => setTransportFilter(urlTransport), [urlTransport]);
  useEffect(() => setViewMode(urlView), [urlView]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSearchModal(false);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearchModal((p) => !p);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(
      protocolsData.map((p) => (lang === "fa" ? p.category.fa : p.category.en))
    );
    return [t.all, ...Array.from(unique)];
  }, [lang, t.all]);

  // ۳. منطق فیلتر کردن با ترکیب Fuse.js
  const filteredProtocols = useMemo(() => {
    let baseResults = protocolsData;

    // اگر متنی برای جستجو وجود دارد از Fuse استفاده کن
    if (debouncedSearch.trim()) {
      baseResults = fuse.search(debouncedSearch).map((r) => r.item);
    }

    // اعمال بقیه فیلترها (دسته، ترنسپورت، امنیت و...)
    return baseResults.filter((p) => {
      if (showFavoritesOnly && !isFavorite(getProtocolId(p))) {
        return false;
      }

      if (!showDeprecated && p.isDeprecated) {
        return false;
      }

      const cat = lang === "fa" ? p.category.fa : p.category.en;
      const matchCat =
        selectedCategory === "all" ||
        selectedCategory === t.all ||
        cat === selectedCategory;

      const matchTr =
        transportFilter === "all" || p.transport === transportFilter;

      const matchSecurity =
        securityFilter === "all" || p.securityRisk === securityFilter;

      return matchCat && matchTr && matchSecurity;
    });
  }, [
    debouncedSearch,
    selectedCategory,
    lang,
    t.all,
    transportFilter,
    securityFilter,
    showDeprecated,
    showFavoritesOnly,
    isFavorite,
    fuse,
  ]);

  const allTransportCounts = useMemo(
    () =>
      protocolsData.reduce(
        (a, p) => {
          a[p.transport] = (a[p.transport] || 0) + 1;
          return a;
        },
        {} as Record<string, number>
      ),
    []
  );

  const securityCounts = useMemo(
    () =>
      protocolsData.reduce(
        (a, p) => {
          if (p.securityRisk) {
            a[p.securityRisk] = (a[p.securityRisk] || 0) + 1;
          }
          return a;
        },
        {} as Record<string, number>
      ),
    []
  );

  const scrollToToolbar = useCallback(
    () =>
      toolbarRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
    []
  );

  const handleToggleLang = useCallback(() => {
    setLang((prev) => (prev === "fa" ? "en" : "fa"));
    setSelectedCategory("all");
    setSearchTerm("");
  }, [setLang]);

  const handleToggleDark = useCallback(() => {
    setIsDark((prev) => !prev);
  }, [setIsDark]);

  const handleModalSelect = useCallback(
    (name: string) => {
      setSearchTerm(name);
      setTimeout(scrollToToolbar, 80);
    },
    [scrollToToolbar]
  );

  const handleToggleFavoritesOnly = useCallback(() => {
    setShowFavoritesOnly((prev) => !prev);
  }, []);

  const emptyType =
    showFavoritesOnly && filteredProtocols.length === 0 && favoritesCount === 0
      ? "favorites"
      : "search";

  return (
    <>
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        lang={lang}
        isDark={isDark}
        isRTL={isRTL}
        t={t}
        onSelect={handleModalSelect}
      />

      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={`min-h-screen flex flex-col transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
            : "bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-slate-800"
        }`}
      >
        <TopBar
          isDark={isDark}
          lang={lang}
          t={t}
          onToggleDark={handleToggleDark}
          onToggleLang={handleToggleLang}
        />

        <Hero
          isDark={isDark}
          lang={lang}
          isRTL={isRTL}
          t={t}
          allTransportCounts={allTransportCounts}
          onBrowse={scrollToToolbar}
          onSearch={() => setShowSearchModal(true)}
        />

      
<StickyToolbar
  isDark={isDark}
  isRTL={isRTL}
  lang={lang}
  t={t}
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  selectedCategory={selectedCategory}
  onCategoryChange={setSelectedCategory}
  categories={categories}
  transportFilter={transportFilter}
  onTransportChange={setTransportFilter}
  securityFilter={securityFilter}
  onSecurityChange={setSecurityFilter}
  securityCounts={securityCounts}
  showDeprecated={showDeprecated}
  onToggleDeprecated={() => setShowDeprecated(!showDeprecated)}
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  filteredCount={filteredProtocols.length}
  totalCount={protocolsData.length}
  allTransportCounts={allTransportCounts}
  toolbarRef={toolbarRef}
  showFavoritesOnly={showFavoritesOnly}
  onToggleFavoritesOnly={handleToggleFavoritesOnly}
  favoritesCount={favoritesCount}
  // تابع پاک کردن همه فیلترها
  onClearFilters={() => {
    setSearchTerm("");
    setSelectedCategory("all");
    setTransportFilter("all");
    setSecurityFilter("all");
    setShowFavoritesOnly(false);
    setShowDeprecated(true);
  }}
/>
        <main className="flex-1 max-w-screen-2xl mx-auto px-3 sm:px-6 py-6 w-full">
          {filteredProtocols.length > 0 ? (
            viewMode === "card" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
             {filteredProtocols.map((protocol, index) => {
  const id = getProtocolId(protocol, index);

  return (
    <ProtocolCard
      key={id}
      protocol={protocol}
      isDark={isDark}
      lang={lang}
      t={t}
      searchTerm={searchTerm}
      isFavorite={isFavorite(id)}
      onToggleFavorite={() => toggleFavorite(id)}
      className="anim-card"
    />
  );
})}
              </div>
            ) : (
              <ProtocolTable
                protocols={filteredProtocols}
                isDark={isDark}
                lang={lang}
                t={t}
                searchTerm={searchTerm} // ارسال کلمه جستجو برای هایلایت
                isRTL={isRTL}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            )
          ) : (
            <EmptyState isDark={isDark} t={t} type={emptyType} />
          )}
        </main>

        <Footer isDark={isDark} t={t} />

        <FloatingButtons
          show={showScrollTop}
          isDark={isDark}
          isRTL={isRTL}
          t={t}
          onScrollTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          onSearch={() => setShowSearchModal(true)}
        />
      </div>
    </>
  );
}

export default function ProtocolGrid() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProtocolGridInner />
    </Suspense>
  );
}