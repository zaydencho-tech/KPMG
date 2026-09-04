import { useEffect, useRef } from "react";

type MobileContentsNavProps = {
  items: string[];
  activeSection: string;
};

const MobileContentsNav = ({ items, activeSection }: MobileContentsNavProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current?.querySelector<HTMLButtonElement>(`[data-toc-key="${CSS.escape(activeSection)}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeSection]);

  const scrollToSection = (item: string) => {
    document.getElementById(item)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div data-sticky-bottom className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur lg:hidden">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent" />
        <div
          ref={scrollerRef}
          className="flex gap-x-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
        >
          {items.map((item) => {
            const isActive = activeSection === item;
            return (
              <button
                type="button"
                key={item}
                data-toc-key={item}
                onClick={() => scrollToSection(item)}
                aria-current={isActive ? "location" : undefined}
                className={`shrink-0 inline-flex items-center whitespace-nowrap rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-colors ${
                  isActive
                    ? "border-gold bg-gold text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileContentsNav;
