import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionIcon from "./SectionIcon";
import professionalImage1 from "@/assets/professional-kpmg-01.jpg";
import professionalImage2 from "@/assets/professional-kpmg-02.jpg";
import professionalImage3 from "@/assets/professional-kpmg-03.jpg";
import professionalImage4 from "@/assets/professional-kpmg-04.jpg";
import professionalImage5 from "@/assets/professional-kpmg-05.jpg";
import seoMuseongImage from "@/assets/professional-seo-museong-card.jpg";
import simJunboImage from "@/assets/professional-sim-junbo-card.jpg";
import yangJinhyeokImage from "@/assets/professional-yang-jinhyeok-card.jpg";
import wonJungjunImage from "@/assets/professional-won-jungjun-card.jpg";
import leeDongcheolImage from "@/assets/professional-lee-dongcheol-card.jpg";
import leeJunsangImage from "@/assets/professional-lee-junsang-card.jpg";
import limChangheeImage from "@/assets/professional-lim-changhee-card.jpg";
import hongSeokrinImage from "@/assets/professional-hong-seokrin-card.jpg";
import teamCardBackground from "@/assets/professionals-team-card-bg-bright.png";

const professionals = [
  { id: "kim-idong", name: "김이동", title: "대표", tags: ["#매각자문", "#DealAdvisory"], image: professionalImage1, position: "object-[14%_center]" },
  { id: "park-younggeol", name: "박영걸", title: "부대표", tags: ["#매각자문", "#DealAdvisory"], image: professionalImage5, position: "object-[14%_center]" },
  { id: "min-honggil", name: "민홍길", title: "전무", tags: ["#기업가치평가", "#DealAdvisory"], image: professionalImage2, position: "object-[8%_center]" },
  { id: "park-juhong", name: "박주홍", title: "전무", tags: ["#인수자문", "#DealAdvisory"], image: professionalImage3, position: "object-[14%_center]" },
  { id: "park-gyeongsang", name: "박경상", title: "상무", tags: ["#투자유치", "#DealAdvisory"], image: professionalImage4, position: "object-[14%_center]" },
  { id: "seo-museong", name: "서무성", title: "전무", tags: ["#매각자문", "#DealAdvisory"], image: seoMuseongImage, position: "object-[14%_center]" },
  { id: "sim-junbo", name: "심준보", title: "상무", tags: ["#기업가치평가", "#DealAdvisory"], image: simJunboImage, position: "object-[14%_center]" },
  { id: "yang-jinhyeok", name: "양진혁", title: "전무", tags: ["#인수자문", "#DealAdvisory"], image: yangJinhyeokImage, position: "object-[14%_center]" },
  { id: "wonjungjun", name: "원정준", title: "부대표", tags: ["#매각자문", "#DealAdvisory"], image: wonJungjunImage, position: "object-[14%_center]" },
  { id: "lee-dongcheol", name: "이동철", title: "상무", tags: ["#기업가치평가", "#DealAdvisory"], image: leeDongcheolImage, position: "object-[14%_center]" },
  { id: "lee-junsang", name: "이준상", title: "상무", tags: ["#인수자문", "#DealAdvisory"], image: leeJunsangImage, position: "object-[14%_center]" },
  { id: "lim-changhee", name: "임창희", title: "상무", tags: ["#매각자문", "#DealAdvisory"], image: limChangheeImage, position: "object-[14%_center]" },
  { id: "hong-seokrin", name: "홍석린", title: "부대표", tags: ["#기업가치평가", "#DealAdvisory"], image: hongSeokrinImage, position: "object-[14%_center]" },
];

const ProfessionalsIntro = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleProfessionals = Array.from(
    { length: 3 },
    (_, index) => professionals[(startIndex + index) % professionals.length],
  );

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
                to={`/professionals/${professional.id}`}
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
