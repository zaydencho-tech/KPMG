import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionIcon from "@/components/SectionIcon";
import ResponsiveFilters from "@/components/ResponsiveFilters";
import heroImage from "@/assets/professionals-directory-hero.png";
import professionalImage1 from "@/assets/professional-kpmg-01.jpg";
import professionalExecutiveImage from "@/assets/professional-kpmg-01-upper-cutout-tight.png";
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
import kimJinwonImage from "@/assets/professional-org-kim-jinwon-card.jpg";
import kimKwangseokImage from "@/assets/professional-org-kim-kwangseok-card.jpg";
import jinHyungseokImage from "@/assets/professional-org-jin-hyungseok-card.jpg";
import leeJunseokImage from "@/assets/professional-lee-junseok-cutout.png";
import yooTaejungImage from "@/assets/professional-yoo-taejung-cutout.png";
import yooSeunghoImage from "@/assets/professional-yoo-seungho-cutout.png";

const memberTypeOptions = ["부대표", "전무", "상무", "이사"];
const tagOptions = ["매각자문", "인수자문", "기업가치평가", "투자유치", "DealAdvisory"];

const profiles = [
  { id: "kim-idong", name: "김이동", title: "대표", category: "매각자문", image: professionalImage1, position: "object-[14%_center]" },
  { id: "park-younggeol", name: "박영걸", title: "부대표", category: "매각자문", image: professionalImage5, position: "object-[14%_center]" },
  { id: "min-honggil", name: "민홍길", title: "전무", category: "기업가치평가", image: professionalImage2, position: "object-[8%_center]" },
  { id: "park-juhong", name: "박주홍", title: "전무", category: "인수자문", image: professionalImage3, position: "object-[14%_center]" },
  { id: "park-gyeongsang", name: "박경상", title: "상무", category: "투자유치", image: professionalImage4, position: "object-[14%_center]" },
  { id: "seo-museong", name: "서무성", title: "전무", category: "매각자문", image: seoMuseongImage, position: "object-[14%_center]" },
  { id: "sim-junbo", name: "심준보", title: "상무", category: "기업가치평가", image: simJunboImage, position: "object-[14%_center]" },
  { id: "yang-jinhyeok", name: "양진혁", title: "전무", category: "인수자문", image: yangJinhyeokImage, position: "object-[14%_center]" },
  { id: "wonjungjun", name: "원정준", title: "부대표", category: "매각자문", image: wonJungjunImage, position: "object-[14%_center]" },
  { id: "lee-dongcheol", name: "이동철", title: "상무", category: "기업가치평가", image: leeDongcheolImage, position: "object-[14%_center]" },
  { id: "lee-junsang", name: "이준상", title: "상무", category: "인수자문", image: leeJunsangImage, position: "object-[14%_center]" },
  { id: "lim-changhee", name: "임창희", title: "상무", category: "매각자문", image: limChangheeImage, position: "object-[14%_center]" },
  { id: "hong-seokrin", name: "홍석린", title: "부대표", category: "기업가치평가", image: hongSeokrinImage, position: "object-[14%_center]" },
  { id: "wonjungjun-center", name: "원정준", title: "센터장", category: "센터 운영", image: wonJungjunImage, position: "object-[14%_center]" },
  { id: "lee-junseok", name: "이준석", title: "담당 파트너", category: "센터 운영", image: leeJunseokImage, position: "object-center" },
  { id: "yoo-taejung", name: "유태정", title: "차장", category: "센터 운영", image: yooTaejungImage, position: "object-top" },
  { id: "yoo-seungho", name: "유승호", title: "과장", category: "센터 운영", image: yooSeunghoImage, position: "object-center" },
];

type OrganizationKey = "executives" | "all" | "deal-1" | "deal-2" | "deal-3" | "deal-4" | "deal-5" | "deal-6";

const organizations: Array<{
  id: Exclude<OrganizationKey, "executives" | "all">;
  name: string;
  head: string;
  description: string;
  memberIds: string[];
  totalMembers: number;
  image: string;
}> = [
  {
    id: "deal-1",
    name: "Deal Advisory 1",
    head: "박영걸 부대표",
    description: "대기업·다국적기업·Cross-border 자문 담당",
    memberIds: ["park-younggeol", "min-honggil", "park-juhong", "park-gyeongsang"],
    totalMembers: 7,
    image: professionalImage5,
  },
  {
    id: "deal-2",
    name: "Deal Advisory 2",
    head: "양진혁 전무",
    description: "사업개편·구조조정·회생\n지원·금융기관 자문 담당",
    memberIds: ["yang-jinhyeok", "seo-museong", "sim-junbo"],
    totalMembers: 11,
    image: yangJinhyeokImage,
  },
  {
    id: "deal-3",
    name: "Deal Advisory 3",
    head: "김진원 부대표",
    description: "PE Transaction Services 담당",
    memberIds: ["lee-junsang"],
    totalMembers: 9,
    image: kimJinwonImage,
  },
  {
    id: "deal-4",
    name: "Deal Advisory 4",
    head: "김광석 부대표",
    description: "에너지·인프라·환경 Sector 자문 담당",
    memberIds: ["lee-dongcheol", "lim-changhee"],
    totalMembers: 10,
    image: kimKwangseokImage,
  },
  {
    id: "deal-5",
    name: "Deal Advisory 5",
    head: "원정준 부대표",
    description: "개인 오너기업·PE 포트폴리오 자문 담당",
    memberIds: ["wonjungjun"],
    totalMembers: 9,
    image: wonJungjunImage,
  },
  {
    id: "deal-6",
    name: "Deal Advisory 6",
    head: "진형석 전무",
    description: "부동산·데이터센터 자문 담당",
    memberIds: [],
    totalMembers: 5,
    image: jinHyungseokImage,
  },
];

const organizationDetails: Record<OrganizationKey, { name: string; head: string; description: string; memberIds: string[] }> = {
  executives: {
    name: "임원실",
    head: "김이동 대표",
    description: "대표이사 · 고문",
    memberIds: ["kim-idong", "hong-seokrin"],
  },
  all: {
    name: "KPMG M&A Center",
    head: "원정준 센터장",
    description: "센터 운영 · 지원",
    memberIds: ["wonjungjun-center", "lee-junseok", "yoo-taejung", "yoo-seungho"],
  },
  ...Object.fromEntries(organizations.map((organization) => [organization.id, organization])),
} as Record<OrganizationKey, { name: string; head: string; description: string; memberIds: string[] }>;

const PAGE_SIZE = 15;

const ProfessionalsDirectory = () => {
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationKey | null>(null);
  const [query, setQuery] = useState("");
  const [memberTypes, setMemberTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const contentRef = useRef<HTMLElement>(null);
  const filteredProfiles = useMemo(
    () => {
      const selectedMemberIds = selectedOrganization
        ? organizationDetails[selectedOrganization].memberIds
        : [];
      return profiles.filter((profile) => {
        if (!selectedMemberIds.includes(profile.id)) return false;
        const searchable = `${profile.name} ${profile.title} ${profile.category} DealAdvisory`.toLowerCase();
        return (query === "" || searchable.includes(query.toLowerCase()))
          && (memberTypes.length === 0 || memberTypes.some((type) => profile.title.startsWith(type)))
          && (tags.length === 0 || tags.some((tag) => tag === profile.category || tag === "DealAdvisory"));
      });
    },
    [memberTypes, query, selectedOrganization, tags],
  );
  const pageCount = Math.ceil(filteredProfiles.length / PAGE_SIZE);
  const visibleProfiles = filteredProfiles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [memberTypes, query, tags]);

  const openOrganization = (organization: OrganizationKey) => {
    setSelectedOrganization(organization);
    setQuery("");
    setMemberTypes([]);
    setTags([]);
    window.requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const closeOrganization = () => {
    setSelectedOrganization(null);
    setQuery("");
    setMemberTypes([]);
    setTags([]);
    window.requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative min-h-[260px] overflow-hidden bg-primary pt-16 text-primary-foreground md:min-h-[480px] md:pt-28">
          <img
            src={heroImage}
            alt="전문가 소개"
            width={1920}
            height={640}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-primary/45" />
          <div className="container relative z-10 py-[64px] md:py-[120px]">
            <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold md:text-xs">
              <SectionIcon activeIndex={0} size={14} className="text-gold" /> Our Professionals
            </p>
            <h1 className="font-serif text-2xl font-bold leading-[1.3] md:text-5xl md:leading-[1.3]">전문가 소개</h1>
            <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-primary-foreground/80 md:mt-6 md:text-[16px]">
              국내 M&A시장을 선도하는 삼정KPMG M&A센터의 전문가들을 만나보세요.
            </p>
          </div>
        </section>

        <div className="sticky top-16 z-30 border-b border-border bg-background/95 backdrop-blur">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent md:hidden" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent md:hidden" />
            <div className="flex gap-x-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:container md:gap-x-8 md:gap-y-2 md:py-4">
              <button
                type="button"
                aria-current="page"
                onClick={closeOrganization}
                className="mb-0 inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-gold bg-gold px-3.5 py-2 text-[13px] font-semibold text-primary-foreground transition-colors md:mb-[-17px] md:rounded-none md:border-0 md:border-b-2 md:bg-transparent md:px-1 md:pb-4 md:pt-2 md:text-sm md:text-foreground"
              >
                M&A Center 조직도
              </button>
            </div>
          </div>
        </div>

        <section ref={contentRef} className="scroll-mt-32 bg-[#F6F7F9] pb-14 pt-[60px] md:scroll-mt-36 md:pb-20 md:pt-20 lg:pb-24">
          <div className="container">
            {selectedOrganization === null ? (
              <>
                <div className="max-w-3xl">
                  <h2 className="font-serif text-2xl font-extrabold leading-tight text-foreground md:text-[32px]">M&A Center 조직도</h2>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground md:text-[14px]">
                    각 조직을 선택하면 소속 전문가를 확인할 수 있습니다.
                  </p>
                </div>

                <div className="mt-8 md:mt-10">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => openOrganization("executives")}
                      className="group w-full max-w-[420px] overflow-hidden bg-background text-left text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_hsl(var(--foreground)/0.18)] hover:ring-1 hover:ring-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
                    >
                      <div className="relative h-[250px] overflow-hidden bg-[#EEF0F7] sm:h-[270px]">
                        <img
                          src={professionalExecutiveImage}
                          alt=""
                          className="absolute bottom-0 left-0 h-[96%] w-[64%] max-w-none object-contain object-bottom"
                        />
                        <div className="absolute right-5 top-7 w-[39%] sm:right-6 sm:top-8">
                          <p className="font-serif text-[25px] font-extrabold leading-tight text-foreground sm:text-[28px]">김이동</p>
                          <p className="mt-2 text-[15px] font-semibold text-foreground/75">대표</p>
                          <p className="mt-5 text-[14px] font-semibold leading-relaxed text-gold">Head of<br />Deal Advisory</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 px-5 py-4">
                        <p className="text-[14px] font-medium leading-relaxed text-muted-foreground">
                          삼정KPMG Deal Advisory 및 M&A센터 총괄
                        </p>
                        <ChevronRight size={18} className="ml-auto flex-none text-gold transition-transform group-hover:translate-x-1" />
                      </div>
                    </button>
                  </div>

                  <div aria-hidden="true" className="mx-auto hidden h-8 w-px bg-border lg:block xl:hidden" />
                  <div aria-hidden="true" className="relative hidden h-10 xl:block">
                    <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-border" />
                    <span className="absolute left-[calc((100%_-_60px)/12)] right-[calc((100%_-_60px)/12)] top-4 h-px bg-border" />
                    <span className="absolute inset-x-0 top-4 grid grid-cols-6 gap-3">
                      {organizations.map((organization) => (
                        <span key={`connector-${organization.id}`} className="mx-auto h-6 w-px bg-border" />
                      ))}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 md:gap-x-4 md:gap-y-5 lg:mt-0 lg:grid-cols-3 xl:grid-cols-6 xl:gap-3">
                    {organizations.map((organization) => (
                      <button
                        key={organization.id}
                        type="button"
                        onClick={() => openOrganization(organization.id)}
                        className="group flex h-full flex-col overflow-hidden bg-background p-0 text-left text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_hsl(var(--foreground)/0.18)] hover:ring-1 hover:ring-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
                      >
                        <span className="relative block h-[210px] w-full flex-none overflow-hidden bg-[#EEF0F7] sm:h-[230px] xl:h-[260px]">
                          <img
                            src={organization.image}
                            alt={`${organization.head} 프로필`}
                            className="h-full w-full object-cover object-[16%_center] transition-transform duration-500 group-hover:scale-[1.025]"
                          />
                        </span>
                        <span className="flex min-h-[190px] w-full flex-1 flex-col px-5 py-5 xl:min-h-[220px] xl:px-4">
                          <span className="font-serif text-[20px] font-extrabold leading-tight xl:text-[16px]">{organization.name}</span>
                          <span className="mt-2 block text-[15px] font-semibold text-foreground/80 xl:text-[14px]">{organization.head}</span>
                          <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-gold xl:gap-1">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="flex-none">
                              <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z" />
                            </svg>
                            전문가 {organization.totalMembers}명
                          </span>
                          <span aria-hidden="true" className="-mx-5 mt-5 border-t border-border xl:-mx-4" />
                          <span className="mt-4 flex items-start gap-3">
                            <span className="whitespace-pre-line text-[14px] font-medium leading-relaxed text-muted-foreground">{organization.description}</span>
                            <ChevronRight size={18} className="ml-auto mt-[2px] flex-none text-gold transition-transform group-hover:translate-x-1" />
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-12 border-t border-dashed border-border pt-9 md:mt-16 md:pt-11">
                    <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Center Operations</p>
                    <button
                      type="button"
                      onClick={() => openOrganization("all")}
                      className="group relative w-full overflow-hidden bg-background text-left text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_hsl(var(--foreground)/0.18)] hover:ring-1 hover:ring-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
                    >
                      <span className="relative flex w-full items-center justify-center gap-3 px-5 py-5">
                        <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-[#F6F7F9] text-foreground/70">
                          <Building2 size={20} />
                        </span>
                        <span className="font-serif text-[20px] font-bold md:text-[22px]">KPMG M&A Center</span>
                        <span aria-hidden="true" className="absolute bottom-0 left-0 right-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                          {organizationDetails.all.memberIds.map((memberId, index) => (
                            <span
                              key={`top-divider-${memberId}`}
                              className={`mx-5 h-px bg-border xl:mx-7 ${index === 1 ? "hidden md:block" : index > 1 ? "hidden lg:block" : ""}`}
                            />
                          ))}
                        </span>
                      </span>
                      <span className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {organizationDetails.all.memberIds.map((memberId) => {
                          const profile = profiles.find((item) => item.id === memberId);
                          if (!profile) return null;

                          return (
                            <span key={profile.id} className="flex min-h-[136px] items-stretch gap-5 px-5 md:min-h-[174px] md:gap-7 lg:gap-4 lg:px-5 xl:gap-5 xl:px-7">
                              <span className="h-[136px] w-[108px] flex-none overflow-hidden bg-[#EEF0F7] md:h-[174px] md:w-[140px]">
                                <img
                                  src={profile.image}
                                  alt={`${profile.name} ${profile.title} 프로필 사진`}
                                  loading="lazy"
                                  width={1086}
                                  height={1448}
                                  className={`h-full w-full ${profile.id === "wonjungjun-center" ? "object-cover object-[16%_center]" : profile.id === "yoo-taejung" ? "origin-bottom scale-[0.92] object-cover object-top" : profile.id === "yoo-seungho" ? "object-cover object-center" : "object-contain object-bottom"}`}
                                />
                              </span>
                              <span className="flex min-w-0 flex-1 items-center">
                                <span className="flex flex-col text-[14px] leading-snug">
                                  <span className="font-serif font-extrabold text-foreground">{profile.name}</span>
                                  <span className="mt-2 font-semibold text-muted-foreground">{profile.title}</span>
                                </span>
                              </span>
                            </span>
                          );
                        })}
                      </span>
                      <span className="relative flex w-full items-center justify-center gap-1.5 px-5 py-4 text-[14px] font-semibold text-gold md:py-5">
                        <span aria-hidden="true" className="absolute left-0 right-0 top-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                          {organizationDetails.all.memberIds.map((memberId, index) => (
                            <span
                              key={`bottom-divider-${memberId}`}
                              className={`mx-5 h-px bg-border xl:mx-7 ${index === 1 ? "hidden md:block" : index > 1 ? "hidden lg:block" : ""}`}
                            />
                          ))}
                        </span>
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="flex-none">
                          <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z" />
                        </svg>
                        전문가 {organizationDetails.all.memberIds.length}명
                        <ChevronRight size={16} className="flex-none transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="max-w-3xl">
                  <h2 className="font-serif text-2xl font-extrabold leading-tight text-foreground md:text-[32px]">
                    {organizationDetails[selectedOrganization].name}
                  </h2>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground md:text-[15px]">
                    <span className="font-semibold text-foreground">{organizationDetails[selectedOrganization].head}</span>
                    <span className="mx-2 text-border">|</span>
                    {organizationDetails[selectedOrganization].description}
                  </p>
                </div>

                <ResponsiveFilters
                  query={query}
                  onQuery={setQuery}
                  searchPlaceholder="전문가 검색"
                  filters={[
                    { id: "member-type", label: "구성원 분류", value: memberTypes, onChange: setMemberTypes, options: memberTypeOptions },
                    { id: "tag", label: "태그", value: tags, onChange: setTags, options: tagOptions },
                  ]}
                  onReset={() => { setQuery(""); setMemberTypes([]); setTags([]); }}
                />

                {visibleProfiles.length > 0 ? (
                  <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:mt-10 lg:grid-cols-5">
                    {visibleProfiles.map((profile, index) => {
                      const hasDetailPage = profile.id !== "yoo-taejung" && profile.id !== "yoo-seungho";
                      const cardContent = (
                        <>
                          <div className="relative aspect-[5/6] overflow-hidden bg-[#dce4e9]">
                            <img
                              src={profile.image}
                              alt={`${profile.name} ${profile.title} 프로필 사진`}
                              loading="lazy"
                              width={1086}
                              height={1448}
                              className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${profile.position}`}
                            />
                            {hasDetailPage && (
                              <span className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-background text-foreground shadow-sm" aria-hidden="true">
                                <Mail size={13} />
                              </span>
                            )}
                          </div>
                          <div className="h-[80px] min-h-[80px] bg-background px-3 py-3 md:px-4 md:py-2.5">
                            <p className="flex flex-wrap items-baseline gap-x-1.5 text-[16px] font-bold text-foreground md:text-[17px]">
                              {profile.name}
                              <span className="text-[13px] font-semibold text-gold md:text-[14px]">{profile.title}</span>
                            </p>
                            <p className="mt-1 flex flex-wrap gap-x-1.5 gap-y-0.5 text-[12px] leading-relaxed text-muted-foreground md:text-[13px]">
                              <span>#{profile.category}</span>
                              <span>#DealAdvisory</span>
                            </p>
                          </div>
                        </>
                      );

                      return hasDetailPage ? (
                        <Link key={`${profile.name}-${index}`} to={`/professionals/${profile.id}`} className="group flex min-w-0 flex-col">
                          {cardContent}
                        </Link>
                      ) : (
                        <div key={`${profile.name}-${index}`} className="flex min-w-0 flex-col">
                          {cardContent}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-8 border border-border bg-background px-6 py-16 text-center md:mt-10">
                    <p className="font-serif text-[17px] font-bold text-foreground">등록된 전문가가 없습니다.</p>
                    <p className="mt-2 text-[13px] text-muted-foreground">해당 조직의 전문가 정보를 준비 중입니다.</p>
                  </div>
                )}
              </>
            )}

            {selectedOrganization !== null && pageCount > 1 && (
              <nav aria-label="전문가 목록 페이지" className="mt-12 flex justify-center gap-1.5 md:mt-16">
                <button type="button" aria-label="이전 페이지" disabled={page === 1} onClick={() => setPage((current) => current - 1)} className="grid h-8 w-8 place-items-center text-muted-foreground disabled:opacity-30">
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                  <button
                    key={number}
                    type="button"
                    aria-label={`${number}페이지`}
                    onClick={() => setPage(number)}
                    className={`grid h-8 w-8 place-items-center text-[12px] font-semibold ${page === number ? "bg-foreground text-background" : "text-foreground hover:bg-section-alt"}`}
                  >
                    {number}
                  </button>
                ))}
                <button type="button" aria-label="다음 페이지" disabled={page === pageCount} onClick={() => setPage((current) => current + 1)} className="grid h-8 w-8 place-items-center text-muted-foreground disabled:opacity-30">
                  <ChevronRight size={16} />
                </button>
              </nav>
            )}

            {selectedOrganization !== null && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={closeOrganization}
                  className="inline-flex items-center gap-2 border border-foreground bg-background px-5 py-3 text-[12px] font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background md:px-7 md:py-3.5 md:text-[13px]"
                >
                  조직도로 돌아가기
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProfessionalsDirectory;
