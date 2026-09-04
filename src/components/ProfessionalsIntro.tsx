import { useState } from "react";
import { Link } from "react-router-dom";
import SectionIcon from "./SectionIcon";
import professionalsSymbol from "@/assets/our-professionals-deal-handshake.png";
import teamCardBackground from "@/assets/professionals-team-card-bg-bright.png";

const ProfessionalsIntro = () => {
  const [isCtaActive, setIsCtaActive] = useState(false);

  return (
    <section className="bg-[#F6F7F9] py-16 md:py-20 lg:py-[120px]">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-[minmax(150px,0.72fr)_minmax(0,2.1fr)_minmax(220px,0.88fr)] lg:gap-12 xl:gap-16">
          <div className="contents lg:block lg:self-start">
            <p className="order-1 col-span-2 mb-2 flex items-start gap-2 text-xs leading-4 uppercase tracking-widest text-gold">
              <span className="flex h-4 flex-none items-center" aria-hidden="true">
                <SectionIcon activeIndex={4} size={14} className="!mt-0 text-gold" />
              </span>
              <span>Our Professionals</span>
            </p>
            <div className="order-3 min-w-0">
              <img
                src={professionalsSymbol}
                alt="M&A 전문가 네트워크 심볼"
                loading="lazy"
                width={1200}
                height={1200}
                className="h-16 w-16 object-cover md:h-[72px] md:w-[72px] lg:mt-9"
              />
              <p className="mt-6 max-w-[170px] text-xs leading-relaxed text-muted-foreground md:mt-9">
                전략 수립부터 거래 종결까지,
                <br />
                각 단계에 필요한 전문 자문을
                <br />
                제공합니다.
              </p>
            </div>
          </div>

          <div className="contents lg:flex lg:h-[252px] lg:flex-col lg:justify-between">
            <h2 className="order-2 col-span-2 max-w-[720px] font-serif text-2xl font-bold text-foreground md:text-3xl lg:mb-4">
              <span className={`transition-colors duration-300 ${isCtaActive ? "text-[#CCD0D8]" : "text-foreground"}`}>
                국내 M&A시장을 선도하는 삼정KPMG M&A센터의 전문가들을 만나보세요.{" "}
              </span>
              <span className={`transition-colors duration-300 ${isCtaActive ? "text-[#1B1D2D]" : "text-[#CAD0D9]"}`}>
                다양한 산업에 대한 깊은 이해와 풍부한 거래 경험을 바탕으로 고객의 성공적인 의사결정을 지원합니다.
              </span>
            </h2>

            <div className="order-5 col-span-2 flex items-center gap-5 lg:mt-14 lg:-translate-y-6">
              <span className="h-px flex-1 bg-border" aria-hidden="true" />
              <Link
                to="/professionals"
                onMouseEnter={() => setIsCtaActive(true)}
                onMouseLeave={() => setIsCtaActive(false)}
                onFocus={() => setIsCtaActive(true)}
                onBlur={() => setIsCtaActive(false)}
                className="inline-flex flex-none items-center border border-foreground/50 bg-transparent px-6 py-3 text-[13px] font-semibold text-foreground transition-all duration-300 hover:border-cta hover:bg-cta hover:text-cta-foreground"
              >
                전문가 전체 보기
              </Link>
            </div>
          </div>

          <div className="order-4 min-w-0 justify-self-end lg:order-none lg:self-start">
            <p className="mb-9 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Meet our team
            </p>
            <div className="h-[180px] w-full max-w-[180px] overflow-hidden bg-[#0E1828] md:h-auto md:w-[180px] md:aspect-[180/203]">
              <img
                src={teamCardBackground}
                alt="삼정KPMG M&A 전문가 회의"
                loading="lazy"
                width={1024}
                height={1792}
                className="h-full w-[125%] max-w-none -translate-x-[20%] object-cover object-[65%_72%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalsIntro;
