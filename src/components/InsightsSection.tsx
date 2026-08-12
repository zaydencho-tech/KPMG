import insight1 from "@/assets/insight-1.jpg";
import insight2 from "@/assets/insight-2.jpg";
import insight3 from "@/assets/insight-3.jpg";
import { ArrowRight } from "lucide-react";
import SectionIcon from "./SectionIcon";
import { getCategoryColor } from "@/lib/categoryColor";

const sideLinks = [
  { tag: "Deal List", title: "2026년 2월호 KPMG Deal List" },
  { tag: "Samjong INSIGHT", title: "글로벌 뷰티 트렌드를 견인하는 K-뷰티" },
  { tag: "Business Focus", title: "자원·물류·AI 3대 축으로 본 미국-이란 전쟁" },
  { tag: "Sustainability & Climate", title: "기후 변화와 에너지 전환에 대한 새로운 시각" },
  { tag: "M&A Trends", title: "2026년 상반기 글로벌 M&A 시장 전망" },
  { tag: "Industry Report", title: "반도체·AI 산업의 전략적 M&A 동향 분석" },
];

const InsightsSection = () => {
  return (
    <section id="insights" className="py-[64px] md:py-[120px] bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left — intro text (3/12) */}
          <div className="lg:col-span-3 flex flex-col justify-start pr-8 pb-8 lg:pb-0">
            <p className="text-gold text-xs tracking-widest uppercase mb-2 flex items-center gap-2">
              <SectionIcon activeIndex={4} size={14} className="text-gold" />
              Insights
            </p>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-foreground mb-4">M&A 시장 흐름과 분석</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              급변하는 시장 환경 속에서 새로운 분석과 접근이 필요합니다. 삼정KPMG 전문가들이 발간하는 깊이 있는 보고서를 통해 거시적 시각을 확보하세요.
            </p>
            <a href="#" className="inline-flex items-center gap-2 border border-foreground/40 text-foreground text-xs font-medium px-5 py-2.5 bg-transparent hover:bg-cta hover:border-cta hover:text-cta-foreground transition-all duration-300 w-fit">
              전체 보기
            </a>
          </div>

          {/* Center — featured article (5/12) */}
          <div className="lg:col-span-5 lg:pr-8">
            <div className="aspect-[4/3] overflow-hidden mb-4">
              <img src={insight1} alt="Featured insight" className="w-full h-full object-cover" loading="lazy" width={640} height={480} />
            </div>
            <span className="text-[10px] tracking-widest uppercase font-sans text-[#b29a76]">Deal List</span>
            <h3 className="font-sans text-foreground mt-1 mb-2 font-semibold text-xl">2026년 2월호 KPMG Deal List</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              국내외 주요 M&A 딜 동향과 시장 분석을 담은 월간 리포트입니다.
            </p>
          </div>

          {/* Right — link list in bordered box (4/12) */}
          <div className="lg:col-span-4 border border-border mt-6 lg:mt-0">
            {sideLinks.map((item, idx) => (
              <a
                key={item.title}
                href="#"
                className={`group flex items-start justify-between gap-3 px-5 py-4 hover:bg-muted/40 transition-colors ${idx < sideLinks.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="min-w-0">
                  <span className="text-[10px] tracking-widest uppercase font-sans text-[#b29a76]">{item.tag}</span>
                  <h4 className="font-sans text-sm text-foreground mt-0.5 group-hover:text-gold transition-colors line-clamp-2 font-medium">{item.title}</h4>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 mt-4 text-gold transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
