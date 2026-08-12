import { useState, useEffect } from "react";
import { ArrowRight, Building2, Factory, Truck } from "lucide-react";
import { getCategoryColor } from "@/lib/categoryColor";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import deal1 from "@/assets/deal-1.jpg";
import deal2 from "@/assets/deal-2.jpg";
import deal3 from "@/assets/deal-3.jpg";

const heroImages = [hero1, hero2, hero3];

const deals = [
  { image: deal1, title: "인천광역시 중구 상업시설", tag: "부동산", desc: "복합상업시설 매각", Icon: Building2 },
  { image: deal2, title: "PROJECT STORM", tag: "제조·플랜트", desc: "기계·장비 플랜트 전문", Icon: Factory },
  { image: deal3, title: "경기도 이천시 물류센터", tag: "물류", desc: "수도권 물류센터 매각", Icon: Truck },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % deals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const deal = deals[currentIndex];

  return (
    <section className="relative h-screen flex items-center justify-start overflow-hidden">
      {heroImages.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="M&A Advisory"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === heroIndex ? "opacity-100" : "opacity-0"}`}
          width={1920}
          height={1080}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

      <div className="relative z-10 container">
        <div className="max-w-2xl animate-fade-up">
          <h1 className="font-serif text-2xl md:text-5xl text-primary-foreground leading-[1.4] md:leading-[1.3] mb-6 font-bold">
            <span className="md:hidden">
              당신의 인생을 건 도전,<br />
              가장 가치 있는 결실을 맺도록<br />
              <span className="text-gradient-gold">KPMG M&A센터</span>가 지원합니다.
            </span>
            <span className="hidden md:inline">
              당신의 인생을 건 도전,<br />
              가장 가치 있는 결실을 맺도록<br />
              <span className="text-gradient-gold">KPMG M&A센터</span>가 지원합니다.
            </span>
          </h1>
          <p className="text-primary-foreground/80 text-xs md:text-[16px] mb-10 leading-relaxed">
            국내 최고 M&A 전문가 그룹이 빠르고 효율적인 자문을 제공합니다.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-4">
            <a
              href="#contact"
              className="px-8 py-3 bg-cta text-cta-foreground text-sm tracking-wide hover:bg-cta-hover transition-colors text-center font-semibold"
            >
              매각 상담 요청
            </a>
            <a
              href="#service"
              className="px-8 py-3 border border-primary-foreground/40 text-primary-foreground font-medium text-sm tracking-wide hover:border-primary-foreground transition-colors text-center"
            >
              인수 기회 보기
            </a>
          </div>
        </div>
      </div>

      {/* Deal card - bottom right (desktop) / bottom (mobile) */}
      <div className="absolute bottom-6 md:bottom-12 left-0 right-0 md:left-auto md:right-8 z-10">
        <div className="container md:!p-0 md:!max-w-none md:!mx-0 md:w-auto flex justify-end md:block">
          <a
            href="https://www.kpmgmnacenter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-[182px] md:w-[320px] bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/15 overflow-hidden hover:bg-primary-foreground/15 transition-colors"
          >
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[9px] tracking-widest uppercase font-sans text-gold">{deal.tag}</span>
                <deal.Icon size={16} className="shrink-0 text-gold" strokeWidth={1.5} />
              </div>
              <h4 className="text-primary-foreground text-sm md:text-base font-serif font-semibold leading-snug mt-1.5 truncate md:line-clamp-none">{deal.title}</h4>
              <p className="text-primary-foreground/60 text-xs mt-1 truncate">{deal.desc}</p>
            </div>
            <div className="hidden md:flex px-4 pb-4 items-end justify-between gap-3">
              <div className="flex items-center gap-1.5 text-primary-foreground text-[11px] font-medium border border-primary-foreground/30 px-3 py-1.5 hover:border-primary-foreground/60 transition-colors">
                자세히 보기
                <ArrowRight size={11} className="text-gold" />
              </div>
              <div className="flex items-center gap-1.5 text-primary-foreground/60 text-xs font-medium ml-auto">
                <span className="text-primary-foreground">{currentIndex + 1}</span>/{deals.length}
                <svg width="20" height="20" viewBox="0 0 24 24" className="ml-0.5">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="hsl(var(--primary-foreground) / 0.2)" strokeWidth="2" />
                  <circle
                    cx="12" cy="12" r="10" fill="none" stroke="hsl(var(--gold))" strokeWidth="2"
                    strokeDasharray={`${((currentIndex + 1) / deals.length) * 62.83} 62.83`}
                    strokeLinecap="round"
                    transform="rotate(-90 12 12)"
                    className="transition-all duration-500"
                  />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 z-10">
        <div className="container">
          <div className="flex flex-col items-start gap-0">
            <div className="flex flex-col items-center gap-[3px]">
              {"SCROLL".split("").map((char, i) => (
                <span
                  key={i}
                  className="text-primary-foreground/50 text-[9px] tracking-[0.15em] font-medium leading-none"
                >
                  {char}
                </span>
              ))}
            </div>
            <div className="relative w-[1px] h-[60px] bg-primary-foreground/20 ml-[3.5px] mt-2 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[12px] bg-gradient-to-b from-primary-foreground/80 via-primary-foreground/40 to-transparent animate-scroll-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
