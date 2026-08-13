import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, ArrowUpRight, Info } from "lucide-react";
import advisoryTab1 from "@/assets/advisory-tab-1.jpg";
import advisoryTab2 from "@/assets/advisory-tab-2.jpg";
import advisoryTab3 from "@/assets/advisory-tab-3.jpg";
import advisoryTab4 from "@/assets/advisory-tab-4.jpg";
import advisoryTab5 from "@/assets/advisory-tab-5.jpg";
import SectionIcon from "./SectionIcon";

const advisoryImages = [advisoryTab1, advisoryTab2, advisoryTab4, advisoryTab3, advisoryTab5];

const advisoryItems = [
  {
    title: "기업 매각\n자문 요청",
    desc: "기업·사업부 매각 자문 서비스",
    heading: "기업 가치를 극대화하는\n전략적 매각 자문",
    body: "기업, 사업부 등 다양한 자산의 매각 자문 서비스를 제공합니다. 간략한 정보를 등록하시면 Teaser 작성과 함께 자문서비스를 시작합니다.",
  },
  {
    title: "기업 투자유치\n자문 요청",
    desc: "스타트업·중소기업의 투자유치 자문",
    heading: "성장을 위한 최적의\n투자 파트너, 삼정KPMG가\n연결합니다",
    body: "스타트업과 중소기업의 시리즈 투자유치를 위한 맞춤형 자문을 제공합니다.\nTeaser 작성부터 투자자 매칭, 딜 클로징까지 전 과정을 지원합니다.",
  },
  {
    title: "부동산 매각\n자문 요청",
    desc: "상업·물류·오피스 부동산 매각 자문",
    heading: "상업·물류·오피스,\n부동산 매각의 새로운 기준",
    body: "상업용, 물류, 오피스 등 부동산 매각을 위한 전문 자문을 제공합니다. 시장 분석부터 실사, 계약 체결까지 원스톱 서비스를 지원합니다.",
  },
  {
    title: "기업 매물\n관련 문의",
    desc: "M&A 매물 및 투자 기회 관련 문의",
    heading: "검증된 M&A 매물 정보를\n가장 먼저 확인하십시오",
    body: "삼정KPMG가 보유한 M&A 매물 및 투자 기회에 대해 안내해 드립니다. 관심 산업과 거래 규모를 알려주시면 적합한 매물을 큐레이션하여 제안해 드립니다.",
  },
  {
    title: "기업 인수\n자문 요청",
    desc: "M&A 대상 기업 인수 자문 서비스",
    heading: "전략적 성장을 위한\n기업 인수 자문",
    body: "M&A 대상 기업의 발굴부터 실사, 협상, 클로징까지 인수 전 과정에 대한 전문 자문을 제공합니다. 삼정KPMG의 광범위한 네트워크로 최적의 인수 기회를 지원합니다.",
  },
];

type FormField = {
  label: string;
  placeholder?: string;
  type?: "text" | "textarea" | "money" | "email" | "tel";
  hint?: string;
};

const advisoryForms: FormField[][] = [
  [
    { label: "회사명", placeholder: "회사명 입력" },
    { label: "최근 년도 회사 매출액", type: "money" },
    { label: "최근 년도 회사 영업이익", type: "money" },
    { label: "산업군", placeholder: "산업군 입력" },
    { label: "의뢰 사유", type: "textarea", placeholder: "사유 입력" },
    { label: "기타사항", type: "textarea", placeholder: "내용 입력" },
    { label: "연락처", type: "tel", placeholder: "연락처 입력" },
    { label: "이메일", type: "email", placeholder: "이메일 입력" },
  ],
  [
    { label: "회사명", placeholder: "회사명 입력" },
    { label: "최근 년도 회사 매출액", type: "money" },
    { label: "최근 년도 회사 영업이익", type: "money" },
    { label: "산업군", placeholder: "산업군 입력" },
    { label: "투자 유치 사유", type: "textarea", placeholder: "사유 입력" },
    { label: "기타사항", type: "textarea", placeholder: "내용 입력" },
    { label: "연락처", type: "tel", placeholder: "연락처 입력" },
    { label: "이메일", type: "email", placeholder: "이메일 입력" },
  ],
  [
    { label: "위치", placeholder: "위치 입력" },
    { label: "건물명", placeholder: "건물명 입력" },
    { label: "건물 구분", placeholder: "구분 입력", hint: "오피스, 호텔, 리테일, 물류창고/창고, 토지, etc 등" },
    { label: "평수", placeholder: "평수 입력" },
    { label: "희망 가격", type: "money" },
    { label: "기타사항", type: "textarea", placeholder: "내용 입력" },
    { label: "연락처", type: "tel", placeholder: "연락처 입력" },
    { label: "이메일", type: "email", placeholder: "이메일 입력" },
  ],
  [
    { label: "투자규모", type: "money" },
    { label: "인수 희망 산업", placeholder: "산업 입력" },
    { label: "선호 매출", type: "money" },
    { label: "선호 영업 이익 수준", type: "money" },
    { label: "기타 사항", type: "textarea", placeholder: "내용 입력" },
    { label: "연락처", type: "tel", placeholder: "연락처 입력" },
    { label: "이메일", type: "email", placeholder: "이메일 입력" },
  ],
  [
    { label: "투자규모", type: "money" },
    { label: "인수 희망 산업", placeholder: "산업 입력" },
    { label: "선호 매출", type: "money" },
    { label: "선호 영업 이익 수준", type: "money" },
    { label: "인수자 정보", placeholder: "정보 입력", hint: "회사명 또는 SI or FI 또는 상장사 여부" },
    { label: "인수 목적", type: "textarea", placeholder: "목적 입력" },
    { label: "연락처", type: "tel", placeholder: "연락처 입력" },
    { label: "이메일", type: "email", placeholder: "이메일 입력" },
  ],
];

const CARD_DURATION_MS = 4500;

const AdvisorySection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formIdx, setFormIdx] = useState(0);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [privacyInfoOpen, setPrivacyInfoOpen] = useState(false);
  const [privacyInfoModalOpen, setPrivacyInfoModalOpen] = useState(false);
  const isHoveredRef = useRef(false);
  const fields = advisoryForms[formIdx];
  const active = advisoryItems[formIdx];

  useEffect(() => {
    if (isHoveredRef.current || showForm) return;
    const t = setTimeout(() => {
      setActiveIdx((i) => (i + 1) % advisoryItems.length);
    }, CARD_DURATION_MS);
    return () => clearTimeout(t);
  }, [activeIdx, cycleKey, showForm]);

  const handleRequest = (idx: number) => {
    setFormIdx(idx);
    setPrivacyAgreed(false);
    setPrivacyInfoOpen(false);
    setPrivacyInfoModalOpen(false);
    setShowForm(true);
  };

  return (
    <section
      id="service"
      className="py-[64px] md:py-[120px] bg-background"
    >
      <div className="container">
        {/* Title */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-widest uppercase mb-2 flex items-center gap-2 text-gold">
              <SectionIcon activeIndex={0} size={14} className="text-gold" />
              Advisory
            </p>
            <h2 className="font-serif font-bold text-2xl md:text-3xl text-foreground">
              비즈니스 가치를 증명하는 전략
            </h2>
          </div>
        </div>


        {!showForm ? (
          /* CARD GRID */
          <div
            className="grid grid-cols-1 min-[769px]:grid-cols-2 lg:grid-cols-5 gap-0"
            onMouseLeave={() => { isHoveredRef.current = false; setCycleKey((k) => k + 1); }}
          >
            {advisoryItems.map((item, idx) => {
              return (
                <div
                  key={item.title}
                  onClick={() => handleRequest(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleRequest(idx); } }}
                  className={`group relative overflow-hidden cursor-pointer h-[120px] min-[769px]:h-[420px] lg:h-[600px] ${idx > 0 ? "border-t border-[#4D4F52] min-[769px]:border-t-0 lg:border-l lg:border-[#4D4F52]" : ""}`}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img
                      src={advisoryImages[idx]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-700 ease-out group-hover:opacity-50" />
                  </div>

                  {/* Mobile layout: top (title left, button right) + bottom-left badge */}
                  <div className="min-[769px]:hidden">
                    <div className="relative z-10 flex items-start justify-between gap-3 px-7 pt-7 pb-3">
                      <h3 className="font-serif font-semibold text-white text-base leading-tight truncate min-w-0 flex-1">{item.title.replace("\n", " ")}</h3>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRequest(idx); }}
                        className="shrink-0 inline-flex items-center justify-between gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-2.5 py-1.5 text-[11px] font-semibold w-fit hover:bg-white/20 transition-colors"
                      >
                        <span>자문 요청하기</span>
                        <ArrowUpRight size={12} />
                      </button>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 z-10 p-7 flex">
                      <span className="shrink-0 text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-white/25 text-white">
                        {["sell", "invest", "real estate", "inquiry", "acquire"][idx]}
                      </span>
                    </div>
                  </div>



                  {/* Desktop/Tablet layout: top badge, middle title+desc, bottom button */}
                  <div className="hidden min-[769px]:flex relative z-10 h-full flex-col p-7 lg:p-5">
                    <div className="flex items-start transition-transform duration-1000 ease-out group-hover:translate-y-[var(--badge-shift)] min-[769px]:[--badge-shift:98px] lg:[--badge-shift:178px]">
                      <span className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full border border-white/25 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#22263F] group-hover:border-white">
                        {["sell", "invest", "real estate", "inquiry", "acquire"][idx]}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-3">
                      <h3 className="font-serif font-bold text-white text-[22px] leading-snug">
                        {item.title.split("\n").map((line, i) => (
                          <span key={i} className="block">
                            <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-white after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-1000 after:ease-out">
                              {line}
                            </span>
                          </span>
                        ))}
                      </h3>
                      <p className="text-white/80 text-xs leading-relaxed line-clamp-3">{item.desc}</p>
                    </div>
                    <div className="transition-transform duration-1000 ease-out group-hover:-translate-y-[var(--btn-shift)] min-[769px]:[--btn-shift:100px] lg:[--btn-shift:180px]">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRequest(idx); }}
                        className="inline-flex items-center justify-between gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2.5 text-xs font-semibold w-fit transition-colors duration-300 group-hover:bg-[#B7935B] group-hover:border-[#B7935B] group-hover:text-white"
                      >
                        <span>자문 요청하기</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        ) : (
          /* FORM — 1360 x 540 panel matching card grid area */
          <div className="mx-auto w-full max-w-[1360px] relative lg:h-[600px] p-4 lg:p-7 overflow-hidden">
            <img
              src={advisoryImages[formIdx]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <button
              onClick={() => setShowForm(false)}
              className="hidden lg:inline-flex absolute bottom-4 left-6 lg:bottom-7 lg:left-7 items-center gap-2 border border-white/60 hover:border-white text-white px-6 py-2.5 text-[13px] font-medium transition-colors z-10"
            >
              <ArrowLeft size={14} />
              <span>이전으로</span>
            </button>
            <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-[510px_1fr] gap-6 lg:gap-10 items-start h-full">
              {/* Left — tabs + heading */}
              <div className="text-white pt-2">
                <div className="mb-6 grid grid-cols-3 md:grid-cols-5 border-y border-white/15 divide-x divide-white/15">
                  {advisoryItems.map((it, i) => {
                    const isActive = i === formIdx;
                    return (
                      <button
                        key={it.title}
                        type="button"
                        onClick={() => setFormIdx(i)}
                        className={`text-left py-2.5 px-2.5 transition-colors ${i < 3 ? "border-b border-white/15 md:border-b-0" : ""} ${i === 3 ? "!border-l-0 md:!border-l" : ""} ${i === 4 ? "border-r border-white/15 md:border-r-0" : ""} ${isActive ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
                      >
                        <div className={`font-serif font-bold text-[13px] leading-snug whitespace-pre-line ${isActive ? "text-white" : "text-white/90"}`}>
                          {it.title}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <h3 className={`font-serif font-bold text-2xl ${formIdx === 1 ? "lg:text-[24px]" : "lg:text-[26px]"} leading-[1.35] whitespace-pre-line mb-4`}>
                  {active.heading}
                </h3>
                <p className="text-white/90 text-[13px] leading-[1.7] whitespace-normal md:whitespace-pre-line">
                  {active.body}
                </p>
              </div>

              {/* Right — form */}
              <div className="bg-white p-4 pb-7 lg:h-[544px] lg:p-6 lg:pb-6 overflow-auto">
                <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-x-4 lg:gap-x-5 gap-y-2.5 h-full content-start">
                  {fields.map((f) => {
                    const isWide = f.type === "textarea";
                    const isMobileWide = f.label === "인수자 정보" || f.label === "건물 구분";
                    return (
                      <div key={f.label} className={isWide ? "col-span-2" : isMobileWide ? "col-span-2 lg:col-span-1" : "col-span-1"}>
                        <label className="font-bold text-[12px] text-[#222] mb-1 whitespace-nowrap flex items-center gap-[6px]">
                          {f.label}
                          <span className="inline-block w-[3px] h-[3px] rounded-full bg-[#D72660]" aria-label="필수" />
                        </label>
                        {f.type === "textarea" ? (
                          <textarea
                            placeholder={f.placeholder}
                            rows={2}
                            className="w-full bg-[#F2F2F2] border-0 px-3 py-2 text-[12px] text-[#222] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-1 focus:ring-[#AE9B7A] resize-none"
                          />
                        ) : f.type === "money" ? (
                          <div className="bg-[#F2F2F2] flex items-center">
                            <span className="pl-2.5 text-[#222] text-[12px]">₩</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              placeholder="입력"
                              className="flex-1 bg-transparent border-0 px-2 py-2 text-[12px] text-[#222] placeholder:text-[#9A9A9A] text-right focus:outline-none min-w-0"
                            />
                            <span className="pr-2.5 text-[#AE9B7A] text-[11px] font-medium">백만원</span>
                          </div>
                        ) : (
                          <input
                            type={f.type === "email" ? "email" : f.type === "tel" ? "tel" : "text"}
                            placeholder={f.placeholder}
                            className="w-full bg-[#F2F2F2] border-0 px-3 py-2 text-[12px] text-[#222] placeholder:text-[#9A9A9A] focus:outline-none focus:ring-1 focus:ring-[#AE9B7A]"
                          />
                        )}
                        {f.hint && (
                          <p className="mt-1 text-[10px] text-[#666] leading-tight">ex. {f.hint}</p>
                        )}
                      </div>
                    );
                  })}
                  <div className="col-span-2 flex flex-col items-stretch gap-4 pt-2 min-[426px]:flex-row min-[426px]:items-center min-[426px]:justify-between min-[769px]:gap-3">
                    <div className="flex items-center gap-1.5">
                      <label className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap text-[12px] text-[#222]">
                        <input
                          type="checkbox"
                          checked={privacyAgreed}
                          onChange={(event) => setPrivacyAgreed(event.target.checked)}
                          className="peer sr-only"
                        />
                        <span className="grid h-3.5 w-3.5 place-items-center rounded-none border border-[#666] bg-white peer-checked:border-[#1A3189] peer-checked:bg-[#1A3189]">
                          <svg viewBox="0 0 12 12" className={`h-3 w-3 text-white ${privacyAgreed ? "block" : "hidden"}`} aria-hidden="true">
                            <path d="M2 6.2 4.7 9 10 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter" />
                          </svg>
                        </span>
                        <span>개인정보 수집·이용에 동의합니다.</span>
                      </label>
                      <div
                        className="relative"
                        onMouseEnter={() => { if (window.innerWidth >= 768) setPrivacyInfoOpen(true); }}
                        onMouseLeave={() => setPrivacyInfoOpen(false)}
                      >
                        <button
                          type="button"
                          aria-label="개인정보 수집·이용 안내 보기"
                          aria-expanded={privacyInfoOpen}
                          aria-controls="privacy-collection-info"
                          onClick={() => {
                            if (window.innerWidth < 768) setPrivacyInfoModalOpen(true);
                            else setPrivacyInfoOpen((open) => !open);
                          }}
                          onFocus={() => { if (window.innerWidth >= 768) setPrivacyInfoOpen(true); }}
                          onBlur={() => setPrivacyInfoOpen(false)}
                          className="grid h-4 w-4 place-items-center text-[#1A3189] transition-colors hover:text-[#B7935B] focus:outline-none focus:ring-2 focus:ring-[#B7935B]/60"
                        >
                          <Info size={16} strokeWidth={2} aria-hidden="true" />
                        </button>
                        {privacyInfoOpen && (
                          <div
                            id="privacy-collection-info"
                            role="tooltip"
                            className="absolute bottom-full left-0 z-30 mb-3 hidden w-[min(88vw,430px)] border border-[#1A3189]/20 bg-white p-4 text-left text-[#222] shadow-[0_12px_30px_rgba(14,24,40,0.16)] min-[768px]:block sm:p-5"
                          >
                            <p className="font-serif text-[14px] font-bold text-[#1A3189]">개인정보 수집·이용 (필수)</p>
                            <div className="mt-3 overflow-hidden border border-[#1A3189]/25">
                              <div className="grid grid-cols-[1.4fr_1fr_0.9fr] bg-[#F2F4F7] text-[10px] font-bold text-[#1A3189] sm:text-[11px]">
                                <p className="border-r border-[#1A3189]/25 p-2.5">수집·이용 목적</p>
                                <p className="border-r border-[#1A3189]/25 p-2.5">항목</p>
                                <p className="p-2.5">보유기간</p>
                              </div>
                              <div className="grid grid-cols-[1.4fr_1fr_0.9fr] text-[10px] leading-relaxed text-[#3B4252] sm:text-[11px]">
                                <p className="border-r border-t border-[#1A3189]/25 p-2.5">기업 자문 문의 접수 및 상담 진행, 서비스 안내</p>
                                <p className="border-r border-t border-[#1A3189]/25 p-2.5">연락처, 이메일</p>
                                <p className="border-t border-[#1A3189]/25 p-2.5 font-semibold text-[#8C6B36]">확인 필요</p>
                              </div>
                            </div>
                            <p className="mt-3 text-[10px] leading-relaxed text-[#5C6470]">동의를 거부할 권리가 있으나, 동의하지 않을 경우 자문 문의 접수 및 상담 진행이 제한될 수 있습니다.</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {privacyInfoModalOpen && (
                      <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="privacy-modal-title"
                        className="fixed inset-0 z-50 grid place-items-center bg-[#0E1828]/55 p-5 min-[768px]:hidden"
                        onClick={() => setPrivacyInfoModalOpen(false)}
                      >
                        <div className="w-full max-w-[420px] bg-white p-5 shadow-[0_18px_50px_rgba(14,24,40,0.3)]" onClick={(event) => event.stopPropagation()}>
                          <div className="flex items-start justify-between gap-4">
                            <p id="privacy-modal-title" className="font-serif text-[16px] font-bold text-[#1A3189]">개인정보 수집·이용 (필수)</p>
                            <button type="button" onClick={() => setPrivacyInfoModalOpen(false)} className="-mt-1 text-[20px] leading-none text-[#1A3189]" aria-label="개인정보 안내 닫기">×</button>
                          </div>
                          <div className="mt-4 overflow-hidden border border-[#1A3189]/25">
                            <div className="grid grid-cols-[1.4fr_1fr_0.9fr] bg-[#F2F4F7] text-[10px] font-bold text-[#1A3189]">
                              <p className="border-r border-[#1A3189]/25 p-2.5">수집·이용 목적</p>
                              <p className="border-r border-[#1A3189]/25 p-2.5">항목</p>
                              <p className="p-2.5">보유기간</p>
                            </div>
                            <div className="grid grid-cols-[1.4fr_1fr_0.9fr] text-[10px] leading-relaxed text-[#3B4252]">
                              <p className="border-r border-t border-[#1A3189]/25 p-2.5">기업 자문 문의 접수 및 상담 진행, 서비스 안내</p>
                              <p className="border-r border-t border-[#1A3189]/25 p-2.5">연락처, 이메일</p>
                              <p className="border-t border-[#1A3189]/25 p-2.5 font-semibold text-[#8C6B36]">확인 필요</p>
                            </div>
                          </div>
                          <p className="mt-4 text-[11px] leading-relaxed text-[#5C6470]">동의를 거부할 권리가 있으나, 동의하지 않을 경우 자문 문의 접수 및 상담 진행이 제한될 수 있습니다.</p>
                          <button type="button" onClick={() => setPrivacyInfoModalOpen(false)} className="mt-5 w-full bg-[#1A3189] px-4 py-3 text-[13px] font-medium text-white">확인</button>
                        </div>
                      </div>
                    )}
                    <div className="flex w-full items-center gap-3 min-[426px]:w-auto min-[769px]:ml-auto">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="inline-flex flex-1 items-center justify-center gap-2 border border-[#1A3189] px-6 py-2.5 text-[13px] font-medium text-[#1A3189] transition-colors hover:bg-[#1A3189] hover:text-white min-[426px]:flex-none min-[1024px]:hidden"
                      >
                        <ArrowLeft size={14} />
                        <span>이전으로</span>
                      </button>
                      <button
                        type="submit"
                        className="inline-flex flex-1 items-center justify-center gap-2 bg-[#1A3189] px-6 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#005EB8] min-[426px]:flex-none"
                      >
                        <span>제출하기</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default AdvisorySection;
