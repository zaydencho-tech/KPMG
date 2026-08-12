import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp, Facebook, Linkedin, Youtube } from "lucide-react";
import KpmgLogo from "./KpmgLogo";

const footerLinks = {
  "자문 서비스": [
    { label: "투자유치 자문", href: "#service" },
    { label: "매각 자문", href: "#service" },
    { label: "기업 인수 자문", href: "#service" },
    { label: "부동산 자문", href: "#service" },
  ],
  "리소스": [
    { label: "최신 매물", href: "#deals" },
    { label: "인사이트", href: "#insights" },
    { label: "대표 자문사례", href: "#cases" },
    { label: "뉴스룸", href: "#" },
  ],
};

const socialLinks = [
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "YouTube", href: "#", Icon: Youtube },
  {
    label: "X",
    href: "#",
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.244 2H21l-6.52 7.45L22 22h-6.86l-4.79-6.27L4.8 22H2l7.02-8.02L2 2h6.91l4.36 5.79L18.244 2zm-2.4 18h1.86L7.27 4H5.32l10.524 16z" />
      </svg>
    ),
  },
  { label: "Facebook", href: "#", Icon: Facebook },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [stickyBottomH, setStickyBottomH] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const isMain = pathname === "/";
    const getThreshold = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) return 400;
      return isMain ? 800 : 600;
    };
    const onScroll = () => {
      setShowTopBtn(window.scrollY > getThreshold());
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    let observed: HTMLElement | null = null;
    const ro = new ResizeObserver(() => measure());
    const measure = () => {
      const el = document.querySelector<HTMLElement>("[data-sticky-bottom]");
      if (el !== observed) {
        if (observed) ro.unobserve(observed);
        if (el) ro.observe(el);
        observed = el;
      }
      setStickyBottomH(el ? el.getBoundingClientRect().height : 0);
    };
    measure();
    const mo = new MutationObserver(() => measure());
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="맨 위로 이동"
        style={{ bottom: `${stickyBottomH + 20}px`, right: "20px" }}
        className={`fixed lg:!bottom-8 lg:!right-8 z-30 lg:z-50 w-[42px] h-[42px] lg:w-12 lg:h-12 flex items-center justify-center bg-gold text-primary-foreground shadow-lg hover:bg-gold/90 transition-opacity duration-300 ${showTopBtn ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <ArrowUp size={18} strokeWidth={2} className="lg:hidden" />
        <ArrowUp size={20} strokeWidth={2} className="hidden lg:block" />
      </button>
      <footer ref={footerRef} className="py-[64px] md:py-[120px] bg-[#141721]">
        <div className="container">
        {/* Top: Logo + link columns */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-10">
          <div className="md:max-w-[420px] lg:max-w-[680px] flex flex-col">
            <div className="text-background mb-4">
              <KpmgLogo height={28} />
            </div>
            <p className="text-background/40 text-xs leading-relaxed mb-[44px]">
              © 2026 KPMG Samjong Accounting Corp., a Korea Limited Liability Company and a member firm of the KPMG global organization of independent member firms affiliated with KPMG International Limited, a private English company limited by guarantee. All rights reserved.
            </p>
            <a
              href="https://kpmg.com/kr/ko.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] font-medium text-background/70 border border-background/20 rounded hover:bg-background/10 hover:text-background transition-colors px-[10px] py-[5px] w-fit -translate-y-5 md:translate-y-0"
            >
              KPMG 공식 홈페이지
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-12 md:gap-x-16 lg:gap-x-[104px] gap-y-10">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="min-w-0">
                <h4 className="font-sans text-background/40 text-[10px] uppercase tracking-widest mb-4 whitespace-nowrap">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-background/70 text-[14px] hover:text-background transition-colors whitespace-nowrap"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6 text-background/40 text-xs">
            <a href="#" className="hover:text-background/70 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-background/70 transition-colors">이용약관</a>
            <a href="#" className="hover:text-background/70 transition-colors">보안 및 사기 방지</a>
          </div>
          <div className="flex items-center gap-1">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center border border-background/20 text-background/50 hover:text-background hover:bg-background/10 transition-colors"
              >
                <Icon className="w-[14px] h-[14px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
      </footer>
    </>
  );
};

export default Footer;
