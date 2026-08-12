import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileContentsNav from "@/components/MobileContentsNav";
import SectionIcon from "@/components/SectionIcon";
import professionalImage from "@/assets/professional-wonjungjun-cutout-v7.png";
import backgroundImage from "@/assets/professional-wonjungjun-bg-empty.jpg";


const lnbItems = ["소개", "프로필", "관련 소식"];

const expertise = ["매각자문", "인수자문", "기업가치평가", "투자유치", "Pre-IPO"];

const introPoints = [
  "삼정KPMG Deal Advisory 5 본부장이자 M&A센터장으로, 기업 매각·인수자문과 기업가치평가를 담당하고 있습니다.",
  "제조·소비재·소프트웨어 등 폭넓은 산업에서 20건 이상의 매각·투자유치·Pre-IPO 자문을 수행하였습니다.",
  "한국공인회계사(KICPA)로서 오너 기업의 승계·매각 의사결정 전 과정을 지원하고 있습니다.",
];

const careers = [
  "삼정KPMG Deal Advisory 5 본부장 · M&A센터장 (現)",
  "[ 이전 경력 1 — 확인 후 기재 ]",
  "[ 이전 경력 2 — 확인 후 기재 ]",
  "한국공인회계사(KICPA)",
];

const trackRecords = ["전주페이퍼 매각자문", "티맥스소프트 매각자문", "오케스트로 투자유치 자문"];

const news = [
  { tag: "DEAL", title: "[ 티젠 매각 클로징 보도 기사 링크 — 확인 후 기재 ]", meta: "언론사 · YYYY.MM.DD" },
  { tag: "DEAL", title: "[ 헬리녹스 투자유치 보도 기사 링크 — 확인 후 기재 ]", meta: "언론사 · YYYY.MM.DD" },
  { tag: "INTERVIEW", title: "[ 인터뷰 기사 링크 — 확인 후 기재 ]", meta: "언론사 · YYYY.MM.DD" },
];

const ProfileDetails = ({ onShare }: { onShare: () => void }) => (
  <>
    <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#1B338A] md:text-xs">
      <SectionIcon activeIndex={0} size={14} className="text-[#1B338A]" />Our Professionals
    </p>
    <h1 className="flex flex-wrap items-baseline gap-x-3 font-serif text-[30px] font-bold leading-[1.3] text-foreground md:text-[42px]">
      원정준
      <span className="text-[14px] font-medium text-foreground/70 md:text-[16px]">부대표 · 본부장</span>
    </h1>
    <p className="mt-2 text-[14px] font-bold text-[#1B338A] md:text-[16px]">Deal Advisory 5 · M&A센터장</p>

    <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2 text-[13px] text-foreground/70 md:text-[14px]">
      <span>
        <span className="mr-2 font-semibold text-foreground">T</span>02-2112-[ ]
      </span>
      <span>
        <span className="mr-2 font-semibold text-foreground">E</span>jungjunwon@kr.kpmg.com
      </span>
    </div>
    <button
      type="button"
      onClick={onShare}
      className="mt-6 inline-flex items-center gap-2 border border-foreground px-5 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-white hover:text-foreground"
    >
      <Share2 size={14} />
      프로필 공유하기
    </button>
  </>
);

const Professionals = () => {
  const [activeSection, setActiveSection] = useState(lnbItems[0]);

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(t);
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    lnbItems.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "원정준 부대표 · 본부장 | 삼정KPMG M&A Center", url: window.location.href });
        return;
      } catch {
        /* user cancelled */
      }
    }
    navigator.clipboard?.writeText(window.location.href);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Sub visual */}
        <section className="relative min-h-0 bg-[#F2F4F7] pt-0 text-foreground md:min-h-[480px] md:bg-[#AFBCCB] md:pt-28">
          <div className="absolute inset-x-0 top-0 h-[300px] overflow-hidden sm:h-[340px] md:inset-0 md:h-auto">
            <img
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              className="absolute -top-[60px] left-0 h-[calc(100%+60px)] w-full object-cover object-top"
              width={1920}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-70% to-[#AFBCCB] md:bg-gradient-to-r md:from-transparent md:via-white/85 md:via-35% md:to-white/95" />
            <div className="absolute inset-0 z-[5] hidden bg-gradient-to-bl from-[#22263F]/50 via-[#22263F]/15 to-transparent md:block" />
            <img
              src={professionalImage}
              alt="원정준 부대표 프로필 사진"
              className="absolute left-0 top-[44px] h-[calc(100%-44px)] w-full origin-top scale-[1.08] object-cover object-top [filter:drop-shadow(0_18px_28px_rgba(30,44,66,0.14))] -translate-x-[13%] md:top-[100px] md:h-[calc(100%-100px)] md:scale-[1.2] md:-translate-x-[24%]"
              width={2064}
              height={448}
            />
          </div>

          <div className="container relative z-10 grid pt-[280px] pb-6 sm:pt-[320px] md:min-h-0 md:grid-cols-2 md:items-center md:py-[80px]">
            <div className="hidden md:block" />
            <div className="bg-background px-5 py-8 md:-ml-[100px] md:bg-transparent md:p-0">
              <ProfileDetails onShare={handleShare} />
            </div>
          </div>
        </section>

        {/* LNB + Content */}
        <section className="border-b border-border bg-section-alt">
          <div className="container grid gap-8 py-[56px] md:py-[80px] lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
            <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
              <div className="hidden lg:block">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gold md:mb-4 md:text-xs">Contents</p>
                <nav className="grid gap-2">
                  {lnbItems.map((item) => {
                    const isActive = activeSection === item;
                    return (
                      <a
                        key={item}
                        href={`#${item}`}
                        className={`border-l-2 px-4 py-[7px] text-[13px] transition-colors ${
                          isActive
                            ? "border-gold font-semibold text-foreground"
                            : "border-border font-medium text-muted-foreground hover:border-gold hover:text-foreground"
                        }`}
                      >
                        {item}
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="mt-0 lg:mt-10">
                <p className="mb-4 font-serif text-[14px] font-bold text-foreground">관련 분야</p>
                <div className="flex flex-wrap gap-2">
                  {expertise.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3.5 py-1.5 text-[12px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>

            <div className="min-w-0 space-y-[60px]">
              <article id="소개" className="scroll-mt-24">
                <h2 className="font-serif text-[22px] font-extrabold text-foreground md:text-[26px]">소개</h2>
                <div className="mt-6 border border-gold/30 bg-gold/5 p-5 md:mt-8 md:p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex items-center justify-center bg-gold text-white" style={{ width: 32, height: 32 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
                      </svg>
                    </span>
                    <p className="font-serif text-base font-extrabold tracking-wide text-foreground">국내 중견·중소기업 매각자문을 총괄하는 M&A센터장</p>
                  </div>
                  <ul className="space-y-2.5 md:space-y-3">
                    {introPoints.map((point, i) => (
                      <li key={i} className="flex gap-3 text-[13px] leading-[1.6] text-muted-foreground md:text-[14px]">
                        <span className="mt-2 h-1 w-1 flex-shrink-0 bg-gold" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </article>

              <article id="프로필" className="scroll-mt-24">
                <h2 className="font-serif text-[22px] font-extrabold text-foreground md:text-[26px]">프로필</h2>

                <h3 className="mt-8 font-serif text-[15px] font-bold text-foreground">경력사항</h3>
                <ul className="relative mt-5 space-y-3.5 before:absolute before:left-[3px] before:top-[10px] before:bottom-[10px] before:w-px before:bg-gold/40">
                  {careers.map((line) => (
                    <li key={line} className="flex items-center gap-3 text-[14px] leading-[1.4] text-muted-foreground">
                      <span className="relative z-[1] h-[7px] w-[7px] flex-shrink-0 bg-gold" />
                      {line}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-12 font-serif text-[15px] font-bold text-foreground">주요 활동 · Track Record</h3>
                <ul className="relative mt-5 space-y-3.5 before:absolute before:left-[3px] before:top-[10px] before:bottom-[10px] before:w-px before:bg-gold/40">
                  {trackRecords.map((line) => (
                    <li key={line} className="flex items-center gap-3 text-[14px] leading-[1.4] text-muted-foreground">
                      <span className="relative z-[1] h-[7px] w-[7px] flex-shrink-0 bg-gold" />
                      {line}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/case-studies"
                  className="mt-8 inline-flex items-center gap-2 border border-cta px-5 py-3 text-[13px] font-bold text-cta transition-colors hover:bg-cta hover:text-primary-foreground"
                >
                  주요 실적 전체 보기 (총 20건)
                </Link>
              </article>

              <article id="관련 소식" className="scroll-mt-24">
                <h2 className="font-serif text-[22px] font-extrabold text-foreground md:text-[26px]">관련 소식</h2>
                <div className="mt-8 border-t border-border">
                  {news.map((item) => (
                    <a
                      key={item.title}
                      href="#"
                      className="group block border-b border-border py-6 transition-colors hover:bg-section-alt"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gold">{item.tag}</p>
                      <p className="mt-2 text-[15px] font-medium text-foreground group-hover:text-cta">{item.title}</p>
                      <p className="mt-2 text-[12px] text-muted-foreground">{item.meta}</p>
                    </a>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <MobileContentsNav items={lnbItems} activeSection={activeSection} />
      <Footer />
    </div>
  );
};

export default Professionals;
