import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Filter, Search, X } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionIcon from "@/components/SectionIcon";
import heroImage from "@/assets/subpage-cases.jpg";
import { advisoryCases, type AdvisoryCase } from "@/data/casesData";
import { caseHighlights, type CaseHighlight } from "@/data/caseHighlightsData";
import { getCaseCategory, type CaseCategory } from "@/lib/caseCategory";
import imgOffice from "@/assets/case-categories/office.jpg";
import imgHotel from "@/assets/case-categories/hotel.jpg";
import imgLogistics from "@/assets/case-categories/logistics.jpg";
import imgDatacenter from "@/assets/case-categories/datacenter.jpg";
import imgFactory from "@/assets/case-categories/factory.jpg";
import imgChemical from "@/assets/case-categories/chemical.jpg";
import imgEnergy from "@/assets/case-categories/energy.jpg";
import imgRetail from "@/assets/case-categories/retail.jpg";
import imgFnb from "@/assets/case-categories/fnb.jpg";
import imgHealthcare from "@/assets/case-categories/healthcare.jpg";
import imgBiotech from "@/assets/case-categories/biotech.jpg";
import imgTech from "@/assets/case-categories/tech.jpg";
import imgFinance from "@/assets/case-categories/finance.jpg";
import imgAutomotive from "@/assets/case-categories/automotive.jpg";
import imgShipping from "@/assets/case-categories/shipping.jpg";
import imgConstruction from "@/assets/case-categories/construction.jpg";
import imgMedia from "@/assets/case-categories/media.jpg";
import imgWaste from "@/assets/case-categories/waste.jpg";
import imgEducation from "@/assets/case-categories/education.jpg";
import imgDefault from "@/assets/case-categories/default.jpg";

const CATEGORY_IMAGE: Record<CaseCategory, string> = {
  office: imgOffice,
  hotel: imgHotel,
  logistics: imgLogistics,
  datacenter: imgDatacenter,
  factory: imgFactory,
  chemical: imgChemical,
  energy: imgEnergy,
  retail: imgRetail,
  fnb: imgFnb,
  healthcare: imgHealthcare,
  biotech: imgBiotech,
  tech: imgTech,
  finance: imgFinance,
  automotive: imgAutomotive,
  shipping: imgShipping,
  construction: imgConstruction,
  media: imgMedia,
  waste: imgWaste,
  education: imgEducation,
  default: imgDefault,
};

const ROLE_BADGE: Record<string, string> = {
  매각자문: "bg-primary text-primary-foreground",
  인수자문: "bg-gold text-primary-foreground",
  투자유치자문: "bg-foreground text-background",
  "M&A 자문": "bg-section-alt text-foreground",
};

const PAGE_SIZE = 10;

type TabKey = "highlight" | "all";
const TABS: { key: TabKey; label: string }[] = [
  { key: "highlight", label: "Case Highlight" },
  { key: "all", label: "자문 사례 전체" },
];

const HeroSection = () => (
  <section className="relative min-h-[260px] bg-primary pt-16 text-primary-foreground md:min-h-[480px] md:pt-28">
    <img src={heroImage} alt="KPMG 최근 자문 사례" className="absolute inset-0 h-full w-full object-cover opacity-50" width={1920} height={1080} />
    <div className="absolute inset-0 bg-primary/45" />
    <div className="container relative z-10 py-[64px] md:py-[120px]">
      <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold md:text-xs">
        <SectionIcon activeIndex={3} size={14} className="text-gold" />
        Recent Advisory Engagements
      </p>
      <h1 className="font-serif text-2xl font-bold leading-[1.3] md:text-5xl md:leading-[1.3]">최근 자문 사례</h1>
      <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-primary-foreground/80 md:mt-6 md:text-[16px]">
        삼정KPMG가 자문한 주요 M&A 사례입니다. 매각, 인수, 투자유치 등 다양한 거래 유형에서 축적된 경험과 전문성을 확인해 보십시오.
      </p>
    </div>
  </section>
);

const TabNav = ({ tab, onChange }: { tab: TabKey; onChange: (t: TabKey) => void }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollerRef.current?.querySelector<HTMLButtonElement>(`[data-tab-key="${tab}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [tab]);
  return (
    <div className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent md:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent md:hidden" />
        <div
          ref={scrollerRef}
          className="flex gap-x-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:container md:gap-x-8 md:gap-y-2 md:py-4"
        >
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                data-tab-key={t.key}
                onClick={() => onChange(t.key)}
                className={`shrink-0 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors md:mb-[-17px] md:rounded-none md:border-0 md:border-b-2 md:px-1 md:pb-4 md:pt-2 md:text-sm ${
                  active
                    ? "border-gold bg-gold text-primary-foreground md:bg-transparent md:text-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground md:border-transparent md:bg-transparent"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const HighlightGrid = ({ items, onSelect }: { items: CaseHighlight[]; onSelect: (item: CaseHighlight) => void }) => (
  <div className="grid gap-x-5 gap-y-5 bg-transparent md:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => (
      <button
        key={item.slug}
        type="button"
        onClick={() => onSelect(item)}
        className="group relative flex flex-col bg-background p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_hsl(var(--foreground)/0.18)] hover:ring-1 hover:ring-gold/60"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${ROLE_BADGE[item.role] ?? "bg-section-alt text-foreground"}`}>{item.role}</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{item.location}</span>
        </div>
        <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-foreground line-clamp-2 min-h-[3.5rem]">{item.title}</h3>
        <div className="mt-4 aspect-[16/9] w-full overflow-hidden bg-section-alt">
          <img src={item.image} alt={item.industry} loading="lazy" width={1280} height={720} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
        <div className="mt-4 grid gap-1.5">
          <SaleInfo label="회사명" value={item.company} />
          <SaleInfo label="산업" value={item.industry} />
        </div>
      </button>
    ))}
  </div>
);

const HighlightDetail = ({ item, onBack }: { item: CaseHighlight; onBack: () => void }) => (
  <div className="bg-background px-6 py-8 md:px-10 md:py-10">
    <div className="flex flex-wrap items-center gap-2">
      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${ROLE_BADGE[item.role] ?? "bg-section-alt text-foreground"}`}>{item.role}</span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{item.location}</span>
    </div>
    <h2 className="mt-3 font-serif text-2xl font-extrabold leading-tight text-foreground md:text-[32px]">{item.title}</h2>

    <div className="mt-8 overflow-hidden border border-border bg-background">
      <table className="w-full text-left text-[13px]">
        <tbody>
          {[
            ["회사명", item.company],
            ["산업", item.industry],
            ["세부 업무", item.tasks],
            ["진행 기간", item.period],
          ].map(([k, v]) => (
            <tr key={k} className="border-b border-border last:border-b-0">
              <th className="w-[28%] bg-section-alt/60 px-3 py-2.5 text-left font-bold text-foreground">{k}</th>
              <td className="px-3 py-2.5 leading-relaxed text-muted-foreground">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-8 aspect-[16/9] w-full overflow-hidden bg-section-alt">
      <img src={item.image} alt={item.industry} loading="lazy" width={1280} height={720} className="h-full w-full object-cover" />
    </div>

    {item.body.length > 0 && (
      <div className="mt-10 space-y-5">
        {item.body.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h4 className="mb-2 font-serif text-[15px] font-bold text-foreground md:text-base">{section.heading}</h4>
            )}
            <p className="text-[13px] leading-[1.8] text-muted-foreground md:text-[14px]">{section.text}</p>
          </div>
        ))}
      </div>
    )}

  </div>
);

const CaseStudies = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState<TabKey>(() => {
    const stateTab = (location.state as { tab?: TabKey } | null)?.tab;
    return stateTab && TABS.some((t) => t.key === stateTab) ? stateTab : "highlight";
  });
  useEffect(() => {
    const stateTab = (location.state as { tab?: TabKey } | null)?.tab;
    if (stateTab && TABS.some((t) => t.key === stateTab)) setTab(stateTab);
  }, [location.state]);
  const [query, setQuery] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const locationOptions = useMemo(() => Array.from(new Set(advisoryCases.map((c) => c.location))).sort(), []);
  const industryOptions = useMemo(() => Array.from(new Set(advisoryCases.map((c) => c.industry))).sort(), []);
  const roleOptions = useMemo(() => Array.from(new Set(advisoryCases.map((c) => c.role))).sort(), []);

  const filtered = useMemo(() => advisoryCases.filter((c) =>
    (selectedLocations.length === 0 || selectedLocations.includes(c.location)) &&
    (selectedIndustries.length === 0 || selectedIndustries.includes(c.industry)) &&
    (selectedRoles.length === 0 || selectedRoles.includes(c.role)) &&
    (query === "" || `${c.company} ${c.title} ${c.industry} ${c.tasks}`.toLowerCase().includes(query.toLowerCase()))
  ), [query, selectedLocations, selectedIndustries, selectedRoles]);

  const reset = () => { setQuery(""); setSelectedLocations([]); setSelectedIndustries([]); setSelectedRoles([]); setVisible(PAGE_SIZE); };

  const detail = useMemo(() => (slug ? caseHighlights.find((h) => h.slug === slug) ?? null : null), [slug]);

  useEffect(() => {
    if (detail) window.scrollTo({ top: 0, behavior: "auto" });
  }, [detail]);

  if (detail) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <TabNav tab="highlight" onChange={(t) => navigate(`/case-studies`, { state: { tab: t } })} />
          <section className="bg-section-alt pb-[64px] pt-12 md:pb-[120px] md:pt-20">
            <div className="container">
              <HighlightDetail item={detail} onBack={() => navigate(`/case-studies`)} />
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate(`/case-studies`)}
                  className="inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 md:px-7 md:py-3.5 text-[12px] md:text-[13px] font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  목록
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TabNav tab={tab} onChange={(t) => { setTab(t); window.scrollTo({ top: 0, behavior: "auto" }); }} />

        <section className="bg-section-alt pb-[64px] pt-12 md:pb-[120px] md:pt-20">
          <div className="container">
            {tab === "highlight" ? (
              <>
                <div className="max-w-3xl">
                  <h2 className="font-serif text-2xl font-extrabold leading-tight text-foreground md:text-[32px]">Case Highlight</h2>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground md:text-[14px]">
                    삼정KPMG가 자문한 주요 거래 중 산업적 의미와 전략적 가치가 높은 대표 사례입니다.
                  </p>
                </div>
                <div className="mt-8 md:mt-10">
                  <HighlightGrid items={caseHighlights} onSelect={(it) => navigate(`/case-studies/${it.slug}`)} />
                </div>
              </>
            ) : (
              <>
                <div className="max-w-3xl">
                  <h2 className="font-serif text-2xl font-extrabold leading-tight text-foreground md:text-[32px]">자문 사례 전체 보기</h2>
                </div>
                <div className="mt-6 bg-background px-3 py-3 md:mt-8 md:px-5 md:py-4">
                  <div className="hidden lg:grid lg:grid-cols-[48px_minmax(260px,1fr)_180px_180px_180px] lg:gap-4 lg:items-center">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Filter</span>
                    <label className="flex h-12 items-center gap-2 border border-border bg-background px-4 text-[14px] text-muted-foreground">
                      <Search size={16} />
                      <input
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
                        placeholder="키워드 검색"
                        className="w-full bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
                      />
                    </label>
                    <FilterSelect value={selectedLocations} onChange={(v) => { setSelectedLocations(v); setVisible(PAGE_SIZE); }} options={locationOptions} placeholder="본사 위치" />
                    <FilterSelect value={selectedIndustries} onChange={(v) => { setSelectedIndustries(v); setVisible(PAGE_SIZE); }} options={industryOptions} placeholder="산업" />
                    <FilterSelect value={selectedRoles} onChange={(v) => { setSelectedRoles(v); setVisible(PAGE_SIZE); }} options={roleOptions} placeholder="자문 유형" />
                  </div>

                  <div className="flex items-center gap-2 lg:hidden">
                    <label className="flex h-[42px] flex-1 items-center gap-2 border border-border bg-background px-3 text-[14px] text-muted-foreground">
                      <Search size={16} />
                      <input
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
                        placeholder="키워드 검색"
                        className="w-full bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
                      />
                    </label>
                    <UnifiedFilterButton
                      locationOptions={locationOptions}
                      industryOptions={industryOptions}
                      roleOptions={roleOptions}
                      selectedLocations={selectedLocations}
                      selectedIndustries={selectedIndustries}
                      selectedRoles={selectedRoles}
                      onLocationsChange={setSelectedLocations}
                      onIndustriesChange={setSelectedIndustries}
                      onRolesChange={setSelectedRoles}
                      onReset={reset}
                    />
                  </div>
                </div>

                {filtered.length === 0 ? (
                  <div className="mt-5 border border-border bg-background p-6 text-sm leading-relaxed text-muted-foreground md:mt-10 md:p-8">
                    선택한 조건에 해당하는 자문 사례가 없습니다. 필터를 조정해 다시 확인해 주세요.
                  </div>
                ) : (
                  <>
                    <div className="mt-5 flex flex-col gap-5 md:mt-10">
                      {filtered.slice(0, visible).map((c) => <CaseCard key={c.id} c={c} />)}
                    </div>
                    {visible < filtered.length && (
                      <div className="mt-8 flex justify-center md:mt-10">
                        <button
                          onClick={() => setVisible((v) => v + PAGE_SIZE)}
                          className="border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-section-alt md:px-8"
                        >
                          더 보기 ({filtered.length - visible}건 남음)
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const CaseCard = ({ c }: { c: AdvisoryCase }) => {
  const category = getCaseCategory(c.industry);
  const image = CATEGORY_IMAGE[category];
  return (
    <article className="group grid grid-cols-1 gap-6 bg-background p-6 lg:grid-cols-[420px_1fr] lg:gap-10 lg:p-8">
      <div className="aspect-[16/9] w-full overflow-hidden bg-section-alt">
        <img
          src={image}
          alt={c.industry}
          loading="lazy"
          width={1280}
          height={720}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${ROLE_BADGE[c.role] ?? "bg-section-alt text-foreground"}`}>{c.role}</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{c.location}</span>
        </div>
        <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-foreground md:text-2xl">{c.title}</h3>
        <div className="mt-5 grid gap-1.5 md:gap-2">
          <SaleInfo label="회사명" value={c.company} />
          <SaleInfo label="산업" value={c.industry} />
          <SaleInfo label="세부 업무" value={c.tasks} />
          <SaleInfo label="진행 기간" value={c.period} />
        </div>
      </div>
    </article>
  );
};

const SaleInfo = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[88px_1fr] items-start gap-3 md:grid-cols-[120px_1fr] md:gap-6">
    <p className="text-[12px] font-semibold leading-5 text-muted-foreground md:text-[13px]">{label}</p>
    <p className="text-[13px] leading-5 text-foreground md:text-[14px]">{value}</p>
  </div>
);

const FilterSelect = ({ value, onChange, options, placeholder }: { value: string[]; onChange: (v: string[]) => void; options: string[]; placeholder: string }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const toggle = (o: string) => {
    if (value.includes(o)) {
      onChange(value.filter((v) => v !== o));
    } else {
      onChange([...value, o]);
    }
  };

  const displayText = value.length > 0 ? `${placeholder} (${value.length})` : placeholder;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative flex h-12 w-full items-center justify-between border border-border bg-background pl-4 pr-9 text-left text-[14px] font-medium text-foreground"
      >
        <span className={value.length > 0 ? "text-foreground" : "text-muted-foreground"}>{displayText}</span>
        <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 md:items-center md:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex max-h-[70vh] w-full max-w-[480px] flex-col bg-background shadow-xl md:max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="text-[14px] font-semibold text-foreground">{placeholder}</p>
              <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {options.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => { toggle(o); }}
                  className="flex w-full items-center gap-3 px-5 py-3 text-left text-[14px] hover:bg-section-alt"
                >
                  <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${value.includes(o) ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                    {value.includes(o) && <Check size={12} />}
                  </span>
                  <span className={value.includes(o) ? "font-semibold text-foreground" : "text-foreground"}>{o}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-border px-5 py-3">
              <button
                type="button"
                onClick={() => { onChange([]); }}
                className="text-[13px] text-muted-foreground hover:text-foreground"
              >
                초기화
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground hover:bg-primary/90"
              >
                적용
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const UnifiedFilterButton = ({
  locationOptions,
  industryOptions,
  roleOptions,
  selectedLocations,
  selectedIndustries,
  selectedRoles,
  onLocationsChange,
  onIndustriesChange,
  onRolesChange,
  onReset,
}: {
  locationOptions: string[];
  industryOptions: string[];
  roleOptions: string[];
  selectedLocations: string[];
  selectedIndustries: string[];
  selectedRoles: string[];
  onLocationsChange: (v: string[]) => void;
  onIndustriesChange: (v: string[]) => void;
  onRolesChange: (v: string[]) => void;
  onReset: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const totalSelected = selectedLocations.length + selectedIndustries.length + selectedRoles.length;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const toggle = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((v) => v !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative flex h-[42px] shrink-0 items-center gap-2 border border-border bg-background px-4 text-[14px] font-medium text-foreground lg:h-12"
      >
        <Filter size={16} />
        <span>필터</span>
        {totalSelected > 0 && (
          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {totalSelected}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 md:items-center md:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-[520px] flex-col bg-background shadow-xl md:max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="text-[14px] font-semibold text-foreground">필터</p>
              <button type="button" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {locationOptions.length > 0 && (
                <div className="mb-6">
                  <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">본사 위치</p>
                  <div className="flex flex-wrap gap-2">
                    {locationOptions.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => toggle(selectedLocations, onLocationsChange, o)}
                        className={`px-3 py-1.5 text-[13px] border ${selectedLocations.includes(o) ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-section-alt"}`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {industryOptions.length > 0 && (
                <div className="mb-6">
                  <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">산업</p>
                  <div className="flex flex-wrap gap-2">
                    {industryOptions.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => toggle(selectedIndustries, onIndustriesChange, o)}
                        className={`px-3 py-1.5 text-[13px] border ${selectedIndustries.includes(o) ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-section-alt"}`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {roleOptions.length > 0 && (
                <div>
                  <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-muted-foreground">자문 유형</p>
                  <div className="flex flex-wrap gap-2">
                    {roleOptions.map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => toggle(selectedRoles, onRolesChange, o)}
                        className={`px-3 py-1.5 text-[13px] border ${selectedRoles.includes(o) ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:bg-section-alt"}`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-border px-5 py-4">
              <button
                type="button"
                onClick={() => { onReset(); setOpen(false); }}
                className="text-[13px] text-muted-foreground hover:text-foreground"
              >
                초기화
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="bg-primary px-6 py-2.5 text-[13px] font-medium text-primary-foreground hover:bg-primary/90"
              >
                적용
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CaseStudies;
