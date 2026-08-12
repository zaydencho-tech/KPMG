import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import SectionIcon from "./SectionIcon";
import dealBg from "@/assets/deals-bg-v2.jpg";

const featuredDeal = {
  tag: "추천 매물 · F&B",
  badge: "3일 NEW",
  title: "Project Jupiter",
  rows: [
    { label: "위치", value: "미국 (뉴욕)" },
    { label: "매출 규모", value: "100~500억원" },
    { label: "Asking", value: "Equity 100% 기준 EBITDA의 [6.0~7.0] 배수" },
  ],
};

const expandable = [
  { title: "산업 및 거래 개요", body: "미국 뉴욕(맨하탄) 소재 K-BBQ F&B 3개 매장 및 미국 프랜차이즈 법인. 견고한 매출과 브랜드 인지도를 기반으로 북미 확장 가능성이 높은 매물입니다." },
  { title: "관련 자문 영역", body: "M&A 매각 자문, Cross-border 인수 구조 설계, 세무·법률 실사, 밸류에이션 및 협상 지원." },
];

const moreDeals = [
  {
    tag: "추천 매물 · 제조",
    badge: "5일 NEW",
    title: "Project Orion",
    rows: [
      { label: "위치", value: "한국 (경기)" },
      { label: "매출 규모", value: "300~700억원" },
      { label: "Asking", value: "EBITDA의 [5.0~6.0] 배수" },
    ],
  },
  {
    tag: "추천 매물 · 헬스케어",
    badge: "7일 NEW",
    title: "Project Atlas",
    rows: [
      { label: "위치", value: "한국 (서울)" },
      { label: "매출 규모", value: "200~400억원" },
      { label: "Asking", value: "EBITDA의 [7.0~8.0] 배수" },
    ],
  },
  {
    tag: "추천 매물 · IT/SaaS",
    badge: "10일",
    title: "Project Nova",
    rows: [
      { label: "위치", value: "싱가포르" },
      { label: "매출 규모", value: "50~150억원" },
      { label: "Asking", value: "Revenue의 [3.0~4.0] 배수" },
    ],
  },
];

const DealsSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [activeDeal, setActiveDeal] = useState(featuredDeal);

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={dealBg}
          alt="검증된 핵심 투자 기회"
          className="w-full h-full object-cover saturate-100"
          loading="lazy"
          width={1920}
          height={1080}
        />
      </div>
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-kpmg-blue/35 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/25 via-transparent to-background/15 z-[2]" />
      <div className="absolute inset-0 bg-black/40 z-[3]" />

      <div className="container relative z-10 py-[64px] md:py-[120px]">
        <p className="text-gold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
          <SectionIcon activeIndex={3} size={14} className="text-gold" />
          Latest Deals
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left: Headline */}
          <div className="lg:col-span-7 lg:pt-4 flex flex-col">
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-primary-foreground leading-tight">
              검증된 핵심 투자 기회
            </h2>
            <p className="mt-4 text-primary-foreground/70 text-sm leading-relaxed">
              삼정KPMG가 엄선한 국내외 우량 매물을 소개합니다. 산업·지역·규모별로 검증된 거래 기회를 통해 전략적 성장과<span className="hidden md:inline"><br /></span> 가치 창출을 실현하십시오.
            </p>
            <a
              href="https://www.kpmgmnacenter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-primary-foreground text-sm font-semibold hover:text-gold transition-colors"
            >
              모든 매물 보기
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-foreground text-[#00338D]">
                <Plus size={14} strokeWidth={2.5} />
              </span>
            </a>

            {/* Additional deals grid - small glass cards (bottom aligned) */}
            <div className="mt-auto pt-12 grid grid-cols-3 gap-3 w-full md:max-w-[88%]">
              {moreDeals.map((deal) => {
                const location = deal.rows.find((r) => r.label === "위치")?.value;
                const isActive = activeDeal.title === deal.title;
                return (
                  <div
                    key={deal.title}
                    onMouseEnter={() => setActiveDeal(deal)}
                    onMouseLeave={() => setActiveDeal(featuredDeal)}
                    className={`bg-primary-foreground/10 backdrop-blur-md border p-3 transition-colors cursor-pointer ${
                      isActive
                        ? "bg-primary-foreground/20 border-gold"
                        : "border-primary-foreground/15 hover:bg-primary-foreground/15"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[9px] tracking-widest uppercase text-gold">{deal.tag}</span>
                      <span className="text-[8px] tracking-widest uppercase px-1.5 py-0.5 bg-white/15 text-primary-foreground">
                        {deal.badge}
                      </span>
                    </div>
                    <p className="font-serif text-sm md:text-base font-semibold text-primary-foreground leading-snug mt-1.5">
                      {deal.title}
                    </p>
                    <p className="text-[10px] text-primary-foreground/60 mt-1">{location}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Info card */}
          <div className="lg:col-span-5">
            <div className="bg-kpmg-blue text-primary-foreground shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
              {/* Top: tag + badge */}
              <div className="px-8 pt-8 pb-4 flex items-start justify-between">
                <p className="text-sm text-primary-foreground/90 leading-snug">
                  {activeDeal.tag}
                </p>
                <span className="text-[10px] tracking-widest uppercase px-2.5 py-1 bg-gold text-primary-foreground">
                  {activeDeal.badge}
                </span>
              </div>

              {/* Project title */}
              <div className="px-8 pb-8">
                <p className="text-2xl md:text-4xl font-normal leading-tight md:leading-none font-sans">{activeDeal.title}</p>
              </div>

              {/* Info rows */}
              <div className="px-8 pb-8 border-b border-white/15">
                {activeDeal.rows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[100px_1fr] gap-4 py-1">
                    <p className="text-xs text-primary-foreground/70">{row.label}</p>
                    <p className="text-xs md:text-sm text-primary-foreground font-medium">{row.value}</p>
                  </div>
                ))}
              </div>

              {/* Expandable rows */}
              {expandable.map((item, i) => (
                <div key={item.title} className="bg-white border-b border-black/10 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between px-8 py-5 text-left hover:bg-black/[0.03] transition-colors"
                  >
                    <span className="text-sm md:text-base font-semibold text-[#00338D]">{item.title}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[#00338D] transition-transform ${open === i ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>
                  {open === i && (
                    <div className="px-8 pb-6 -mt-1 text-sm text-foreground/80 leading-relaxed">
                      {item.body}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
