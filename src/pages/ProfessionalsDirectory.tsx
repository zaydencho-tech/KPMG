import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionIcon from "@/components/SectionIcon";
import ResponsiveFilters from "@/components/ResponsiveFilters";
import heroImage from "@/assets/professionals-directory-hero.png";
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
];

const PAGE_SIZE = 15;

const ProfessionalsDirectory = () => {
  const [query, setQuery] = useState("");
  const [memberTypes, setMemberTypes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const filteredProfiles = useMemo(
    () => profiles.filter((profile) => {
      const searchable = `${profile.name} ${profile.title} ${profile.category} DealAdvisory`.toLowerCase();
      return (query === "" || searchable.includes(query.toLowerCase()))
        && (memberTypes.length === 0 || memberTypes.some((type) => profile.title.startsWith(type)))
        && (tags.length === 0 || tags.some((tag) => tag === profile.category || tag === "DealAdvisory"));
    }),
    [memberTypes, query, tags],
  );
  const pageCount = Math.ceil(filteredProfiles.length / PAGE_SIZE);
  const visibleProfiles = filteredProfiles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [memberTypes, query, tags]);

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

        <section className="bg-[#F6F7F9] pb-14 pt-[60px] md:pb-20 md:pt-20 lg:pb-24">
          <div className="container">
            <div className="max-w-3xl">
              <h2 className="font-serif text-2xl font-extrabold leading-tight text-foreground md:text-[32px]">구성원 소개</h2>
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

            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:mt-10 lg:grid-cols-5">
              {visibleProfiles.map((profile, index) => (
                <Link key={`${profile.name}-${index}`} to={`/professionals/${profile.id}`} className="group flex min-w-0 flex-col">
                  <div className="relative aspect-[5/6] overflow-hidden bg-[#dce4e9]">
                    <img
                      src={profile.image}
                      alt={`${profile.name} ${profile.title} 프로필 사진`}
                      loading="lazy"
                      width={1086}
                      height={1448}
                      className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${profile.position}`}
                    />
                    <span className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-background text-foreground shadow-sm" aria-hidden="true">
                      <Mail size={13} />
                    </span>
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
                </Link>
              ))}
            </div>

            {pageCount > 1 && (
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProfessionalsDirectory;
