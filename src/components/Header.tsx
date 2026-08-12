import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import KpmgLogo from "./KpmgLogo";

type SubItem = { label: string; href: string; state?: { tab: string } };
type NavItem = { label: string; href: string; children: SubItem[] };

const navItems: NavItem[] = [
  {
    label: "M&A 이해하기",
    href: "/ma-guide",
    children: [
      { label: "M&A란 무엇인가", href: "/ma-guide#M&A란 무엇인가" },
      { label: "회사 매각 준비", href: "/ma-guide#회사 매각 준비" },
      { label: "거래 과정과 실사", href: "/ma-guide#거래 과정과 실사" },
      { label: "승계·오너 엑시트", href: "/ma-guide#승계·오너 엑시트" },
      { label: "투자유치 이해", href: "/ma-guide#투자유치 이해" },
      { label: "부동산 거래의 특징", href: "/ma-guide#부동산 거래의 특징" },
      { label: "FAQ", href: "/ma-guide#FAQ" },
    ],
  },
  {
    label: "M&A 기회 보기",
    href: "/opportunities",
    children: [
      { label: "투자 및 협업 매물", href: "/opportunities", state: { tab: "sale" } },
      { label: "인수 희망", href: "/opportunities", state: { tab: "acquisition" } },
      { label: "부동산 매물 리스트", href: "/opportunities", state: { tab: "real_estate" } },
    ],
  },
  {
    label: "인사이트",
    href: "/insights",
    children: [
      { label: "KPMG 리포트", href: "/insights", state: { tab: "reports" } },
      { label: "M&A 트렌드", href: "/insights", state: { tab: "trends" } },
    ],
  },
  {
    label: "대표 자문 사례",
    href: "/case-studies",
    children: [
      { label: "Case Highlight", href: "/case-studies", state: { tab: "highlight" } },
      { label: "자문 사례 전체", href: "/case-studies", state: { tab: "all" } },
    ],
  },
  {
    label: "전문가 소개",
    href: "/professionals",
    children: [
      { label: "소속 구성원", href: "/professionals" },
    ],
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState<"KR" | "EN">("KR");
  const [hovered, setHovered] = useState<string | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const solid = scrolled || isOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Left: logo */}
        <Link to="/" className={`shrink-0 transition-colors hover:text-cta ${solid ? "text-[#1A3189]" : "text-primary-foreground"}`}>
          <KpmgLogo height={26} />
        </Link>

        {/* Right: nav + CTA */}
        <div className="hidden min-[769px]:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const isHovered = hovered === item.label;
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  to={item.href}
                  className={`relative block text-xs font-medium tracking-wide transition-colors py-5 ${
                    solid
                      ? isActive || isHovered
                        ? "text-foreground"
                        : "text-foreground/60 hover:text-foreground"
                      : isActive || isHovered
                        ? "text-primary-foreground"
                        : "text-primary-foreground/70 hover:text-primary-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-[14px] left-0 right-0 h-0.5 ${
                        solid ? "bg-cta" : "bg-gold"
                      }`}
                    />
                  )}
                </Link>
                {isHovered && item.children.length > 0 && (
                  <div
                    className={`absolute left-1/2 top-full z-50 min-w-[190px] -translate-x-1/2 border py-2 shadow-lg backdrop-blur-md ${
                      solid
                        ? "border-border bg-background/95"
                        : "border-primary-foreground/25 bg-primary/85"
                    }`}
                  >
                    {item.children.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.href}
                        state={sub.state}
                        onClick={() => setHovered(null)}
                        className={`block whitespace-nowrap px-5 py-2 text-xs transition-colors ${
                          solid
                            ? "text-foreground/70 hover:text-cta"
                            : "text-primary-foreground/80 hover:text-gold"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <a
            href="#contact"
            className={`px-4 py-1.5 border text-xs font-semibold bg-transparent transition-all duration-300 ${
              scrolled
                ? "border-cta text-cta hover:bg-cta hover:text-primary-foreground"
                : "border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            }`}
          >
            상담 요청
          </a>

          {/* Language selector */}
          <div className="relative -ml-4" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className={`group inline-flex items-center px-3 py-1.5 text-xs font-semibold tracking-wide bg-transparent transition-colors duration-300 ${
                scrolled
                  ? "text-cta hover:text-cta-hover"
                  : "text-primary-foreground hover:text-gold"
              }`}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
            >
              <span
                className={`inline-flex items-center gap-1 border-y py-1 ${
                  scrolled ? "border-cta" : "border-primary-foreground/60"
                }`}
              >
                {lang}
                <ChevronDown size={14} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </span>
            </button>
            {langOpen && (
              <ul
                role="listbox"
                className={`absolute left-1/2 -translate-x-1/2 mt-2 w-[40px] border backdrop-blur-md shadow-md py-1 z-50 ${
                  scrolled
                    ? "border-cta/40 bg-background/40"
                    : "border-primary-foreground/40 bg-primary-foreground/10"
                }`}
              >
                {(["KR", "EN"] as const).map((code) => (
                  <li key={code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={lang === code}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      className={`w-full text-center px-1 py-1.5 text-xs font-medium transition-colors ${
                        lang === code
                          ? "bg-white text-foreground"
                          : scrolled
                            ? "text-foreground hover:bg-foreground/5"
                            : "text-primary-foreground hover:bg-primary-foreground/10"
                      }`}
                    >
                      {code}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Mobile: KR/EN (only when open) + toggle */}
        <div className="min-[769px]:hidden flex items-center gap-[28px]">
          {isOpen && (
            <div className={`flex items-center gap-1 text-xs ${solid ? "" : "text-primary-foreground"}`}>
              {(["KR", "EN"] as const).map((code, i) => (
                <span key={code} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setLang(code)}
                    className={`px-1 py-0.5 font-medium transition-colors ${
                      lang === code
                        ? solid ? "text-cta font-semibold" : "text-gold font-semibold"
                        : solid ? "text-foreground/50 hover:text-foreground" : "text-primary-foreground/60 hover:text-primary-foreground"
                    }`}
                  >
                    {code}
                  </button>
                  {i === 0 && <span className={solid ? "text-foreground/30" : "text-primary-foreground/40"}>/</span>}
                </span>
              ))}
            </div>
          )}
          <button
            className={`transition-colors ${solid ? "text-foreground" : "text-primary-foreground"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="min-[769px]:hidden border-t bg-background border-border">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-sm font-medium ${
                    isActive ? "text-foreground border-l-2 border-cta pl-2" : "text-foreground/80 hover:text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="#contact"
              className="px-5 py-2 bg-cta text-primary-foreground text-sm font-medium text-center hover:bg-cta/90 transition-all"
              onClick={() => setIsOpen(false)}
            >
              상담 요청
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
