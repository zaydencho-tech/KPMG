import { useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import SectionIcon from "./SectionIcon";
import grid1 from "@/assets/cases-grid-1.jpg";
import grid2 from "@/assets/cases-grid-2.jpg";
import grid3 from "@/assets/cases-grid-3.jpg";
import grid4 from "@/assets/cases-grid-4.jpg";

// 상단 3-column 대표 실적 (대형 딜)
const featuredCases = [
  { img: grid1, alt: "A사 경영권 인수 자문", title: "A사 경영권 인수 자문", desc: "전략적 인수자 발굴부터 클로징까지 전 과정 자문", amount: "5,200억원" },
  { img: grid2, alt: "B그룹 계열사 매각 자문", title: "B그룹 계열사 매각 자문", desc: "최적 매각 구조 설계 및 글로벌 투자자 매칭", amount: "3,800억원" },
  { img: grid3, alt: "C사 전략적 투자유치", title: "C사 전략적 투자유치", desc: "성장 단계별 맞춤형 투자유치 전략 수립 및 실행", amount: "2,400억원" },
];

// 하단 리스트 — 중·소형 실적
const listCases = [
  { img: grid4, alt: "D사 사업부 카브아웃 매각", title: "D사 사업부 카브아웃 매각", desc: "비핵심 사업부 분리 매각 및 PMI 자문", amount: "950억원" },
  { img: grid1, alt: "E사 시리즈C 투자유치", title: "E사 시리즈C 투자유치", desc: "국내외 전략적 투자자 매칭 및 밸류에이션 자문", amount: "620억원" },
  { img: grid2, alt: "F사 소수지분 매각 자문", title: "F사 소수지분 매각 자문", desc: "재무적 투자자 발굴 및 거래 구조 설계", amount: "380억원" },
];

const CasesSection = () => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <section id="cases" className="py-[64px] md:py-[120px] bg-background">
      <div className="container">
        {/* Top — title */}
        <div className="mb-6">
          <p className="text-gold text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
            <SectionIcon activeIndex={2} size={14} className="text-gold" />
            Track Record
          </p>
          <h2 className="font-serif font-bold text-2xl md:text-3xl text-foreground leading-tight">
            시장을 주도한 자문 실적
          </h2>
        </div>

        {/* Description + CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <p className="text-muted-foreground text-sm leading-relaxed md:whitespace-nowrap">
            삼정KPMG는 다양한 산업군에서 M&A, 투자유치, 매각 자문 등 풍부한 거래 경험을 보유하고 있으며, 최적의 딜 구조와 전략적 파트너십을 통해 성공적인 거래를 이끌어냅니다.
          </p>
          <a
            href="https://www.kpmgmnacenter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-xs transition-colors whitespace-nowrap ml-8"
          >
            자문 사례 리스트
            <ArrowRight size={12} className="text-gold" />
          </a>
        </div>

        {/* Featured 3-column showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mb-12">
          {featuredCases.map((item, i) => (
            <div
              key={i}
              className={`px-0 md:px-4 ${i === 0 ? 'md:pl-0' : ''} ${i === 2 ? 'md:pr-0' : ''}`}
            >
              <div className="relative h-[220px] overflow-hidden group">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={1280}
                  height={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <span className="inline-flex items-center border border-gold/70 bg-black/60 text-gold text-[11px] md:text-xs px-2.5 py-1 font-semibold mb-2 backdrop-blur-sm">
                    {item.amount}
                  </span>
                  <p className="text-white text-sm md:text-base font-medium leading-snug drop-shadow-md">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hover-reveal list — image anchored to hovered row */}
        <div
          className="border-t border-border"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {listCases.map((item, i) => {
            const isActive = hoverIdx === i;
            return (
              <a
                key={i}
                href="https://www.kpmgmnacenter.com"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoverIdx(i)}
                className={`relative block border-b border-border transition-colors duration-300 ${
                  isActive ? "bg-[#00338D]" : "bg-transparent"
                }`}
              >
                <div className="relative flex items-center justify-between gap-6 py-4 md:py-5 pr-6 pl-5">
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`font-serif text-base md:text-xl leading-tight mb-2 transition-colors ${
                        isActive ? "text-white" : "text-foreground"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed transition-colors ${
                        isActive ? "text-white/85" : "text-muted-foreground"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>

                  <div className="hidden md:block text-right shrink-0 z-10">
                    <span
                      className={`text-[10px] tracking-widest uppercase transition-colors ${
                        isActive ? "text-white/80" : "text-gold"
                      }`}
                    >
                      Deal Size
                    </span>
                    <p
                      className={`font-serif text-base mt-1 transition-colors ${
                        isActive ? "text-white" : "text-foreground"
                      }`}
                    >
                      {item.amount}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={28}
                    className={`shrink-0 z-10 transition-all ${
                      isActive ? "text-white translate-x-1 -translate-y-1" : "text-foreground"
                    }`}
                  />

                  {/* Hover image — overlaps the row to the right of center */}
                  <div
                    className={`pointer-events-none hidden md:block absolute right-[18%] top-1/2 -translate-y-1/2 w-[320px] z-[5] transition-all duration-300 ${
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                    }`}
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden bg-section-alt shadow-[0_20px_50px_-15px_hsl(var(--foreground)/0.45)]">
                      <img
                        src={item.img}
                        alt={item.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        width={1280}
                        height={720}
                      />
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
