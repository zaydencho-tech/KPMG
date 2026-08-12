import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionIcon from "./SectionIcon";
import professionalImage from "@/assets/professional-wonjungjun.jpg";
import advisorImage1 from "@/assets/professional-card-advisor-1-v2.png";
import advisorImage2 from "@/assets/professional-card-advisor-2-v2.png";
import teamCardBackground from "@/assets/professionals-team-card-bg-bright.png";

const professionals = [
  { name: "원정준", title: "부대표", tags: ["#매각자문", "#가치평가"], image: professionalImage, position: "object-[12%_center]" },
  { name: "000", title: "부대표", tags: ["#매각자문", "#기업가치평가"], image: advisorImage1, position: "object-[12%_center]" },
  { name: "000", title: "부대표", tags: ["#인수자문", "#투자유치"], image: advisorImage2, position: "object-[12%_center]" },
];

const ProfessionalsIntro = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleProfessionals = professionals.map((_, index) => professionals[(startIndex + index) % professionals.length]);

  const moveCards = (direction: -1 | 1) => {
    setStartIndex((current) => (current + direction + professionals.length) % professionals.length);
  };

  return (
    <section className="overflow-hidden bg-[#F6F7F9] py-16 md:py-20 lg:py-24">
      <div className="container">
        <div className="grid gap-9 lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,2.28fr)] lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-between lg:py-2">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-gold">
                <SectionIcon activeIndex={5} size={14} className="text-gold" />
                Our Professionals
              </p>
              <h2 className="mt-5 font-serif text-[27px] font-bold leading-[1.35] text-foreground md:text-[34px] lg:text-[38px]">
                <span className="block">국내 M&A시장을</span>
                <span className="block">선도하는 전문가들을</span>
                <span className="block">만나보세요</span>
              </h2>
            </div>
            <Link
              to="/professionals"
              className="mt-7 inline-flex w-fit items-center gap-2 border border-foreground/40 bg-transparent px-5 py-2.5 text-xs font-medium text-foreground transition-all duration-300 hover:border-cta hover:bg-cta hover:text-cta-foreground lg:mt-12"
            >
              전문가 전체 보기
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-3 xl:gap-4">
            {visibleProfessionals.map((professional, index) => (
              <Link
                key={`${professional.name}-${index}`}
                to="/professionals/wonjungjun"
                className="group flex min-w-0 flex-col overflow-hidden bg-section-alt transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[5/6] overflow-hidden bg-[#dce4e9]">
                  <img
                    src={professional.image}
                    alt={`${professional.name} 프로필 사진`}
                    loading="lazy"
                    width={1086}
                    height={1448}
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${professional.position}`}
                  />
                </div>
                <div className="h-[80px] min-h-[80px] bg-background px-3 py-3 md:px-4 md:py-2.5">
                  <p className="flex flex-wrap items-baseline gap-x-1.5 text-[16px] font-bold text-foreground md:text-[17px]">
                    {professional.name}
                    <span className="text-[13px] font-semibold text-gold md:text-[14px]">{professional.title}</span>
                  </p>
                  <p className="mt-1 flex flex-wrap gap-x-1.5 gap-y-0.5 text-[12px] leading-relaxed text-muted-foreground md:text-[13px]">
                    {professional.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </p>
                </div>
              </Link>
            ))}

            <div className="relative isolate col-span-1 flex min-h-[160px] flex-col justify-between overflow-hidden bg-[#0E1828] p-5 text-primary-foreground sm:min-h-0">
              <img src={teamCardBackground} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover object-[65%_72%]" loading="lazy" width={1024} height={1792} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">Meet our team</p>
              <p className="mt-3 whitespace-nowrap font-serif text-[17px] font-bold leading-snug">
                전문가를 <br className="sm:hidden" />더 만나보세요
              </p>
              <div className="mt-auto flex">
                <div className="flex border border-primary-foreground/30">
                  <button
                    type="button"
                    aria-label="이전 전문가 보기"
                    onClick={() => moveCards(-1)}
                    className="grid h-10 w-10 place-items-center border-r border-primary-foreground/30 transition-colors hover:bg-primary-foreground hover:text-[#0E1828]"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="다음 전문가 보기"
                    onClick={() => moveCards(1)}
                    className="grid h-10 w-10 place-items-center transition-colors hover:bg-primary-foreground hover:text-[#0E1828]"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalsIntro;
