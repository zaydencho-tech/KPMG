import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Mail } from "lucide-react";
import ResponsiveFilters from "@/components/ResponsiveFilters";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionIcon from "@/components/SectionIcon";
import heroImage from "@/assets/subpage-opportunities.jpg";
import {
  saleDeals,
  financingDeals,
  acquisitionMandates,
  realEstateDeals,
  type SaleDeal,
  type AcquisitionMandate,
  type RealEstateDeal,
} from "@/data/opportunitiesData";
import { formatIndustryPath } from "@/lib/industryClassification";

type TabKey = "sale" | "acquisition" | "real_estate";

const TABS: { key: TabKey; label: string }[] = [
  { key: "sale", label: "투자 및 협업 매물" },
  { key: "acquisition", label: "인수 희망" },
  { key: "real_estate", label: "부동산 매물 리스트" },
];

const combinedSaleDeals = [...saleDeals, ...financingDeals];

type DetailState =
  | { kind: "sale"; deal: SaleDeal; sourceCategory: "sale" | "financing" }
  | { kind: "real_estate"; deal: RealEstateDeal }
  | null;

const Opportunities = () => {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState<TabKey>(() => {
    const stateTab = (location.state as { tab?: TabKey } | null)?.tab;
    if (stateTab && TABS.some((t) => t.key === stateTab)) return stateTab;
    if (category === "financing") return "sale";
    const fromRoute = TABS.find((t) => t.key === category);
    return fromRoute?.key ?? "sale";
  });

  useEffect(() => {
    const stateTab = (location.state as { tab?: TabKey } | null)?.tab;
    if (stateTab && TABS.some((item) => item.key === stateTab)) {
      setTab(stateTab);
    }
  }, [location.state]);

  const detail: DetailState = useMemo(() => {
    if (!category || !slug) return null;
    if (category === "sale") {
      const d = saleDeals.find((x) => x.id === slug)
        ?? financingDeals.find((x) => x.id === slug);
      if (d) return { kind: "sale", deal: d, sourceCategory: saleDeals.includes(d) ? "sale" : "financing" };
    } else if (category === "financing") {
      const d = financingDeals.find((x) => x.id === slug);
      if (d) return { kind: "sale", deal: d, sourceCategory: "financing" };
    } else if (category === "real_estate") {
      const d = realEstateDeals.find((x) => x.id === slug);
      if (d) return { kind: "real_estate", deal: d };
    }
    return null;
  }, [category, slug]);

  // Scroll to top when entering detail view
  useEffect(() => {
    if (detail) window.scrollTo({ top: 0, behavior: "auto" });
  }, [detail]);

  if (detail) {
    const detailTab: TabKey = detail.kind === "sale" ? "sale" : "real_estate";
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="relative min-h-[260px] bg-primary pt-16 text-primary-foreground md:min-h-[480px] md:pt-28">
            <img src={heroImage} alt="KPMG M&A 매물·기회 보기" className="absolute inset-0 h-full w-full object-cover opacity-50" width={1920} height={1080} />
            <div className="absolute inset-0 bg-primary/45" />
            <div className="container relative z-10 py-[64px] md:py-[120px]">
              <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold md:text-xs">
                <SectionIcon activeIndex={1} size={14} className="text-gold" />
                Live Deal Pipeline
              </p>
              <h1 className="font-serif text-[26px] font-bold leading-[1.3] md:text-5xl md:leading-[1.3]">매물·기회 보기</h1>
              <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-primary-foreground/80 md:mt-6 md:text-[16px]">
                삼정KPMG가 보유한 경영권 매각, 투자 및 협업, 부동산 매물 기회를 한 곳에서 확인하세요.
              </p>
            </div>
          </section>

          <TabNav tab={detailTab} onChange={(t) => navigate(`/opportunities`, { state: { tab: t } })} />

          <section className="bg-section-alt pb-[64px] pt-12 md:pb-[120px] md:pt-20">
            <div className="container">
              <div className="bg-background">
                {detail.kind === "sale"
                  ? <SaleDetailContent deal={detail.deal} category={detail.sourceCategory} />
                  : <RealEstateDetailContent deal={detail.deal} />}
              </div>
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate(`/opportunities`, { state: { tab: detailTab } })}
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
        <section className="relative min-h-[260px] bg-primary pt-16 text-primary-foreground md:min-h-[480px] md:pt-28">
          <img src={heroImage} alt="KPMG M&A M&A 기회 보기" className="absolute inset-0 h-full w-full object-cover opacity-50" width={1920} height={1080} />
          <div className="absolute inset-0 bg-primary/45" />
          <div className="container relative z-10 py-[64px] md:py-[120px]">
            <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold md:text-xs">
              <SectionIcon activeIndex={1} size={14} className="text-gold" />
              Live Deal Pipeline
            </p>
            <h1 className="font-serif text-[26px] font-bold leading-[1.3] md:text-5xl md:leading-[1.3]">M&A 기회 보기</h1>
            <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-primary-foreground/80 md:mt-6 md:text-[16px]">
              삼정KPMG가 보유한 경영권 매각, 투자 및 협업, 부동산 매물 기회를 한 곳에서 확인하세요.
            </p>
          </div>
        </section>

        <TabNav tab={tab} onChange={(t) => { setTab(t); window.scrollTo({ top: 0, behavior: "auto" }); }} />
        {tab === "sale" && <SalePanel deals={combinedSaleDeals} kind="sale" onSelect={(d) => navigate(`/opportunities/sale/${d.id}`)} />}
        {tab === "acquisition" && <AcquisitionPanel mandates={acquisitionMandates} />}
        {tab === "real_estate" && <RealEstatePanel deals={realEstateDeals} onSelect={(d) => navigate(`/opportunities/real_estate/${d.id}`)} />}

        <section
          className="relative bg-section-cta py-[64px] md:py-[120px] overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(to right, hsl(var(--foreground) / 0.04) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        >
          <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-background">Contact</p>
              <h2 className="font-serif text-2xl font-extrabold text-foreground md:text-4xl">찾으시는 매물이 없으신가요?</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-foreground/70">
                새로운 매물을 등록하거나 특정 조건에 맞는 매물 추천을 원하시면 언제든 KPMG M&A Center로 문의 주십시오.
                비공개 거래를 포함한 폭넓은 딜 파이프라인에서 최적의 기회를 찾아드립니다.
              </p>
            </div>
            <Link
              to="/deal-inquiry"
              className="inline-flex items-center justify-center gap-2 border border-foreground bg-foreground px-7 py-4 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              매물 등록·문의 <ArrowRight size={16} className="text-gold" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const HeroStat = ({ value, label }: { value: number; label: string }) => (
  <div className="border-l border-primary-foreground/20 pl-4">
    <div className="font-serif text-2xl font-bold text-gold md:text-3xl">{value}<span className="ml-1 text-xs font-medium text-primary-foreground/70">건</span></div>
    <div className="mt-1 text-[11px] uppercase tracking-widest text-primary-foreground/70">{label}</div>
  </div>
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
        {/* Edge fade hints for mobile scroll */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent md:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent md:hidden" />
        <div
          ref={scrollerRef}
          className="flex gap-x-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:container md:gap-x-6 md:gap-y-2 md:py-4"
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

/* === Sale & Financing list panel === */
const SalePanel = ({ deals, kind, onSelect }: { deals: SaleDeal[]; kind: "sale" | "financing"; onSelect: (d: SaleDeal) => void }) => {
  const [query, setQuery] = useState("");
  const [loc, setLoc] = useState<string[]>([]);
  const [rev, setRev] = useState<string[]>([]);
  const [ind, setInd] = useState<string[]>([]);

  const locOptions = useMemo(() => Array.from(new Set(deals.map((d) => d.locationBase))).sort(), [deals]);
  const revOptions = useMemo(() => Array.from(new Set(deals.map((d) => d.revenueBand))).sort(), [deals]);
  const indOptions = useMemo(() => Array.from(new Set(deals.map((d) => d.industry))).sort(), [deals]);

  const filtered = deals.filter((d) =>
    (loc.length === 0 || loc.includes(d.locationBase)) &&
    (rev.length === 0 || rev.includes(d.revenueBand)) &&
    (ind.length === 0 || ind.includes(d.industry)) &&
    (query === "" || `${d.code} ${d.summary} ${d.industry} ${d.location}`.toLowerCase().includes(query.toLowerCase()))
  );

  const [visible, setVisible] = useState(12);
  useEffect(() => { setVisible(12); }, [query, loc, rev, ind, kind]);
  const visibleDeals = filtered.slice(0, visible);

  return (
    <section className="bg-section-alt pb-[64px] pt-12 md:pb-[120px] md:pt-20">
      <div className="container">
        <SectionHeading
          title="투자 및 협업 매물"
        />
        <ResponsiveFilters
          query={query}
          onQuery={setQuery}
          filters={[
            { id: "loc", label: "본사 위치", value: loc, onChange: setLoc, options: locOptions },
            { id: "rev", label: "매출 규모", value: rev, onChange: setRev, options: revOptions },
            { id: "ind", label: "산업", value: ind, onChange: setInd, options: indOptions },
          ]}
          onReset={() => { setLoc([]); setRev([]); setInd([]); setQuery(""); }}
        />
        {filtered.length === 0 ? <EmptyState /> : (
          <>
            <div className="mt-5 grid gap-x-5 gap-y-5 md:mt-10 bg-transparent md:grid-cols-2 lg:grid-cols-3">
              {visibleDeals.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => onSelect(d)}
                  className="group relative flex flex-col bg-background p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_hsl(var(--foreground)/0.18)] hover:ring-1 hover:ring-gold/60"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[10px] font-semibold tracking-widest text-gold">{formatIndustryPath(d.industry)}</p>
                    {d.isNew && <span className="bg-gold px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-primary-foreground">3일 NEW</span>}
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-foreground">{d.code}</h3>
                  <p className="mt-3 h-[40px] overflow-hidden text-xs leading-relaxed text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">{d.summary}</p>
                  <div className="mt-5 grid gap-3 bg-[#F6F7F9] p-4">
                    <SaleInfo label="위치" value={d.location} />
                    <SaleInfo label="매출 규모" value={d.revenueBand} />
                    <SaleInfo label="Asking" value={d.asking} />
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-5 mt-6">
                    <span className="text-[10px] text-muted-foreground">담당: {d.partner.name}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-foreground transition-colors group-hover:text-gold">자세히 보기 <ArrowRight size={10} /></span>
                  </div>
                </button>
              ))}
            </div>
            <LoadMore visible={visible} total={filtered.length} onMore={() => setVisible((v) => v + 12)} />
          </>
        )}
      </div>
    </section>
  );
};

/* === Acquisition Mandates panel === */
const CATEGORY_BADGE: Record<string, string> = {
  "한국 SI": "bg-primary/10 text-primary",
  "한국 FI": "bg-primary/85 text-primary-foreground",
  "글로벌 SI": "bg-foreground/10 text-foreground",
  "글로벌 FI": "bg-primary text-primary-foreground",
};

const AcquisitionPanel = ({ mandates }: { mandates: AcquisitionMandate[] }) => {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string[]>([]);
  const [sec, setSec] = useState<string[]>([]);
  const catOptions = useMemo(() => Array.from(new Set(mandates.map((m) => m.category))).sort(), [mandates]);
  const secOptions = useMemo(() => Array.from(new Set(mandates.map((m) => m.sector))).sort(), [mandates]);
  const filtered = mandates.filter((m) =>
    (cat.length === 0 || cat.includes(m.category)) &&
    (sec.length === 0 || sec.includes(m.sector)) &&
    (query === "" || `${m.headline} ${m.detail} ${m.sector} ${m.category} ${m.size}`.toLowerCase().includes(query.toLowerCase()))
  );
  const [visible, setVisible] = useState(12);
  useEffect(() => { setVisible(12); }, [cat, sec, query]);
  const visibleMandates = filtered.slice(0, visible);

  return (
    <section className="bg-section-alt pb-[64px] pt-12 md:pb-[120px] md:pt-20">
      <div className="container">
        <SectionHeading
          title="인수 희망"
        />
        <ResponsiveFilters
          query={query}
          onQuery={setQuery}
          filters={[
            { id: "cat", label: "카테고리", value: cat, onChange: setCat, options: catOptions },
            { id: "sec", label: "관심 섹터", value: sec, onChange: setSec, options: secOptions },
          ]}
          onReset={() => { setCat([]); setSec([]); setQuery(""); }}
        />
        <div className="mt-5 grid gap-x-5 gap-y-5 md:mt-10 bg-transparent md:grid-cols-2">
          {visibleMandates.map((m) => (
            <article key={m.id} className="flex flex-col bg-background p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex w-fit px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${CATEGORY_BADGE[m.category] ?? "bg-section-alt text-foreground"}`}>{m.category}</span>
              </div>
              <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-foreground md:text-2xl">{m.headline}</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">{m.detail}</p>
              <div className="mt-5 grid gap-3 bg-[#F6F7F9] p-4">
                <SaleInfo label="관심 섹터" value={m.sector} />
                <SaleInfo label="딜 규모" value={m.size} />
              </div>
              <div className="mt-auto flex items-center justify-between pt-5 mt-6">
                <span className="text-[11px] text-muted-foreground">담당: {m.partner.name}</span>
                <a href={`mailto:${m.partner.email}`} className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground transition-colors hover:text-gold">
                  <Mail size={10} /> 문의
                </a>
              </div>
            </article>
          ))}
        </div>
        <LoadMore visible={visible} total={filtered.length} onMore={() => setVisible((v) => v + 12)} />
      </div>
    </section>
  );
};

/* === Real Estate panel === */
const RealEstatePanel = ({ deals, onSelect }: { deals: RealEstateDeal[]; onSelect: (d: RealEstateDeal) => void }) => {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string[]>([]);
  const [cat, setCat] = useState<string[]>([]);
  const regionOptions = useMemo(() => Array.from(new Set(deals.map((d) => d.region))).sort(), [deals]);
  const catOptions = useMemo(() => Array.from(new Set(deals.map((d) => d.assetCategory))).sort(), [deals]);
  const filtered = deals.filter((d) =>
    (region.length === 0 || region.includes(d.region)) &&
    (cat.length === 0 || cat.includes(d.assetCategory)) &&
    (query === "" || `${d.name} ${d.summary} ${d.assetType} ${d.assetCategory} ${d.location} ${d.area} ${d.asking}`.toLowerCase().includes(query.toLowerCase()))
  );
  const [visible, setVisible] = useState(12);
  useEffect(() => { setVisible(12); }, [region, cat, query]);
  const visibleDeals = filtered.slice(0, visible);

  return (
    <section className="bg-section-alt pb-[64px] pt-12 md:pb-[120px] md:pt-20">
      <div className="container">
        <SectionHeading
          title="부동산 매물 리스트"
        />
        <ResponsiveFilters
          query={query}
          onQuery={setQuery}
          filters={[
            { id: "region", label: "자산 위치", value: region, onChange: setRegion, options: regionOptions },
            { id: "cat", label: "자산 종류", value: cat, onChange: setCat, options: catOptions },
          ]}
          onReset={() => { setRegion([]); setCat([]); setQuery(""); }}
        />
        <div className="mt-5 grid gap-x-5 gap-y-5 md:mt-10 bg-transparent md:grid-cols-2 lg:grid-cols-3">
          {visibleDeals.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => onSelect(d)}
              className="group relative flex flex-col bg-background p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_hsl(var(--foreground)/0.18)] hover:ring-1 hover:ring-gold/60"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">{d.assetType}</p>
                {d.isNew && <span className="bg-gold px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-primary-foreground">3일 NEW</span>}
              </div>
              <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-foreground">{d.name}</h3>
              <p className="mt-3 h-[40px] overflow-hidden text-xs leading-relaxed text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">{d.summary}</p>
              <div className="mt-5 grid gap-3 bg-[#F6F7F9] p-4">
                <SaleInfo label="위치" value={d.location} />
                <SaleInfo label="면적" value={d.area} />
                <SaleInfo label="Asking" value={d.asking} />
              </div>
              <div className="mt-auto flex items-center justify-between pt-5 mt-6">
                <span className="text-[10px] text-muted-foreground">담당: {d.partner.name}</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-foreground transition-colors group-hover:text-gold">자세히 보기 <ArrowRight size={10} /></span>
              </div>
            </button>
          ))}
        </div>
        <LoadMore visible={visible} total={filtered.length} onMore={() => setVisible((v) => v + 12)} />
      </div>
    </section>
  );
};


const SaleDetailContent = ({ deal, category }: { deal: SaleDeal; category: "sale" | "financing" }) => (
  <div className="px-6 py-7 md:px-8 md:py-8">
    <div className="flex flex-wrap items-center gap-2">
      <span className="bg-gold px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">{deal.industry}</span>
      {deal.isNew && <span className="bg-gold px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">NEW</span>}
      <span className="text-[11px] text-muted-foreground">{category === "sale" ? "공개 매물" : "투자·협업"}</span>
    </div>
    <h2 className="mt-3 font-serif text-xl font-extrabold leading-tight text-foreground md:text-2xl">{deal.code}</h2>
    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{deal.summary}</p>

    <div className="mt-5 overflow-hidden border border-border bg-background">
      <table className="w-full text-left text-[13px]">
        <tbody>
          {[
            ["위치", deal.location],
            ["산업", deal.industry],
            ["매출 규모", deal.revenueBand],
            ["Asking", deal.asking],
            ["거래 구조", deal.structure],
            ["Financials", deal.financials],
          ].map(([k, v]) => (
            <tr key={k} className="border-b border-border last:border-b-0">
              <th className="w-[28%] bg-section-alt/60 px-3 py-2.5 text-left font-bold text-foreground">{k}</th>
              <td className="px-3 py-2.5 leading-relaxed text-muted-foreground">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-5">
      <h3 className="font-serif text-base font-bold text-foreground md:text-lg">투자 포인트</h3>
      <ul className="mt-3 space-y-2">
        {deal.highlights.map((h, i) => (
          <li key={i} className="flex gap-2.5 text-[13px] leading-[1.15] text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
            {h}
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-6 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">담당 파트너</p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">{deal.partner.name}</p>
      </div>
      <a href={`mailto:${deal.partner.email}`} className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-[12px] font-semibold text-primary-foreground hover:bg-primary/90">
        <Mail size={12} /> {deal.partner.email}
      </a>
    </div>
  </div>
);

const RealEstateDetailContent = ({ deal }: { deal: RealEstateDeal }) => (
  <div className="px-6 py-7 md:px-8 md:py-8">
    <div className="flex flex-wrap items-center gap-2">
      <span className="bg-gold px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">{deal.assetType}</span>
      <span className="text-[11px] text-muted-foreground">부동산 매물</span>
    </div>
    <h2 className="mt-3 font-serif text-xl font-extrabold leading-tight text-foreground md:text-2xl">{deal.name}</h2>
    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{deal.summary}</p>

    <div className="mt-5 overflow-hidden border border-border bg-background">
      <table className="w-full text-left text-[13px]">
        <tbody>
          {[
            ["자산 종류", deal.assetType],
            ["위치", deal.location],
            ["면적", deal.area],
            ["Asking", deal.asking],
            ["타겟 인수자", deal.targetBuyer],
          ].map(([k, v]) => (
            <tr key={k} className="border-b border-border last:border-b-0">
              <th className="w-[28%] bg-section-alt/60 px-3 py-2.5 text-left font-bold text-foreground">{k}</th>
              <td className="px-3 py-2.5 leading-relaxed text-muted-foreground">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-5">
      <h3 className="font-serif text-base font-bold text-foreground md:text-lg">투자 포인트</h3>
      <ul className="mt-3 space-y-2">
        {deal.highlights.map((h, i) => (
          <li key={i} className="flex gap-2.5 text-[13px] leading-[1.15] text-muted-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
            {h}
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-6 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">담당 파트너</p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">{deal.partner.name}</p>
      </div>
      <a href={`mailto:${deal.partner.email}`} className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-[12px] font-semibold text-primary-foreground hover:bg-primary/90">
        <Mail size={12} /> {deal.partner.email}
      </a>
    </div>
  </div>
);

/* === Shared UI === */
const SectionHeading = ({ title, desc }: { eyebrow?: string; title: string; desc?: string }) => (
  <div className="max-w-3xl">
    <h2 className="font-serif text-2xl md:text-[32px] font-extrabold leading-tight text-foreground">{title}</h2>
    {desc && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{desc}</p>}
  </div>
);

const SaleInfo = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[80px_1fr] items-center gap-3">
    <p className="text-[12px] font-semibold leading-4 text-muted-foreground">{label}</p>
    <p className="truncate text-[13px] leading-4 text-foreground" title={value}>{value}</p>
  </div>
);

const EmptyState = () => (
  <div className="mt-10 border border-border bg-background p-8 text-sm leading-relaxed text-muted-foreground">
    선택한 조건에 해당하는 매물이 없습니다. 필터를 조정해 다시 확인해 주세요.
  </div>
);

const LoadMore = ({ visible, total, onMore }: { visible: number; total: number; onMore: () => void }) => {
  if (visible >= total) return null;
  const remaining = total - visible;
  const next = Math.min(12, remaining);
  return (
    <div className="mt-10 flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onMore}
        className="inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 md:px-7 md:py-3.5 text-[12px] md:text-[13px] font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        더보기 <span className="text-[11px] text-muted-foreground">+{next}</span>
        <ChevronDown size={14} />
      </button>
      <p className="text-[11px] text-muted-foreground">
        <span className="font-bold text-foreground">{visible}</span> / {total}
      </p>
    </div>
  );
};

export default Opportunities;
