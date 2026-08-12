import { advisoryCases, type AdvisoryCase } from "./casesData";
import { getCaseCategory } from "@/lib/caseCategory";
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

const CATEGORY_IMAGE = {
  office: imgOffice, hotel: imgHotel, logistics: imgLogistics, datacenter: imgDatacenter,
  factory: imgFactory, chemical: imgChemical, energy: imgEnergy, retail: imgRetail,
  fnb: imgFnb, healthcare: imgHealthcare, biotech: imgBiotech, tech: imgTech,
  finance: imgFinance, automotive: imgAutomotive, shipping: imgShipping,
  construction: imgConstruction, media: imgMedia, waste: imgWaste, education: imgEducation,
  default: imgDefault,
} as const;

export type BodySection = { heading?: string; text: string };
export type CaseHighlight = AdvisoryCase & {
  slug: string;
  image: string;
  body: BodySection[];
};

type HighlightSeed = { id: string; slug: string; body: BodySection[] };

const HIGHLIGHT_SEEDS: HighlightSeed[] = [
  {
    id: "case-001",
    slug: "miko-plantec-acquisition",
    body: [
      { text: "반도체 장비 전문기업 ㈜미코가 산업생산시설 종합건설업체 ㈜플랜텍을 인수하는 거래를 삼정KPMG가 자문했습니다. 반도체 공정 장비와 클린룸 시공 역량을 결합해 토털 솔루션 공급자로 도약하기 위한 전략적 인수입니다." },
      { heading: "거래 배경", text: "반도체·디스플레이 신규 팹 투자가 글로벌 전역에서 동시에 진행되면서, 장비와 공장 인프라 시공을 한 번에 제공할 수 있는 사업자에 대한 수요가 빠르게 늘고 있습니다. ㈜미코는 기존 장비 사업에 플랜텍의 시공·EPC 역량을 결합해 고객사 락인 효과를 강화하고자 했습니다." },
      { heading: "KPMG 자문 역할", text: "삼정KPMG는 가치평가와 재무실사를 수행해 인수가 협상의 객관적 근거를 제공했습니다. 시공업 특유의 매출인식·공사진행률·미청구공사 이슈를 정밀 분석해 잠재 리스크를 사전에 식별하고 거래 조건에 반영했습니다." },
      { heading: "거래 의의", text: "본 거래는 반도체 밸류체인 내 수직 통합형 M&A의 대표 사례로, 장비-시공-O&M을 아우르는 통합 사업자 모델의 등장을 알리는 거래로 평가받고 있습니다." },
    ],
  },
  {
    id: "case-004",
    slug: "dunamu-divestiture",
    body: [
      { text: "국내 대표 가상자산 거래소 운영사 두나무의 매각자문 거래를 삼정KPMG가 단독으로 수행했습니다. 가상자산 산업 규제 환경 변화 속에서 가치 재평가와 전략적 파트너 확보를 동시에 모색한 거래입니다." },
      { heading: "거래 배경", text: "글로벌 가상자산 시장의 제도화가 빠르게 진행되면서 거래소 운영사에 대한 기관 투자자 관심이 크게 확대됐습니다. 두나무는 향후 글로벌 확장과 신규 사업 진출을 위해 전략적 파트너 확보가 필요하다고 판단했습니다." },
      { heading: "KPMG 자문 역할", text: "가치평가, 세무실사, 재무실사를 통합 수행하며 가상자산 비즈니스 특유의 수익 구조와 규제 리스크를 종합적으로 평가했습니다. 국내외 잠재 투자자를 대상으로 한 마케팅 자료 작성과 협상 지원도 병행했습니다." },
      { heading: "거래 의의", text: "국내 가상자산 산업의 성숙도와 제도권 편입 가능성을 입증한 거래로, 향후 디지털 자산 분야 M&A 활성화의 분기점이 될 것으로 평가받고 있습니다." },
    ],
  },
  {
    id: "case-009",
    slug: "aekyung-evonik-acquisition",
    body: [
      { text: "애경케미칼㈜이 인도네시아 특수화학 제조사 PT Evonik Sumi Asih를 인수하는 크로스보더 거래를 삼정KPMG가 자문했습니다. 동남아 생산 거점 확보와 글로벌 고객사 확대를 목표로 한 전략적 인수입니다." },
      { heading: "거래 배경", text: "글로벌 특수화학 시장에서 동남아 지역의 생산·공급 거점은 점차 핵심 자산으로 부상하고 있습니다. 애경케미칼은 인도네시아 거점 확보를 통해 아세안 시장 공략과 글로벌 고객사 대상 공급 안정성을 동시에 확보하고자 했습니다." },
      { heading: "KPMG 자문 역할", text: "M&A 자문, 가치평가, 세무·재무실사를 통합 수행했습니다. 인도네시아 현지 법인의 회계기준 차이, 세무 이슈, 환경규제 리스크를 KPMG 글로벌 네트워크와 협업해 검증하고 거래 구조에 반영했습니다." },
      { heading: "거래 의의", text: "한국 화학 기업의 동남아 진출형 M&A 모범 사례로, KPMG의 크로스보더 네트워크와 산업 전문성이 결합된 대표 거래입니다." },
    ],
  },
  {
    id: "case-008",
    slug: "ktg-euljiro-divestiture",
    body: [
      { text: "주식회사 케이티앤지의 KT&G을지로빌딩 매각자문을 삼정KPMG가 수행했습니다. 서울 도심 핵심 입지의 프라임 오피스 자산을 시장에 성공적으로 공급한 거래입니다." },
      { heading: "거래 배경", text: "케이티앤지는 비핵심 부동산 자산의 효율적 운용과 자본 재배치를 위해 을지로 본사 빌딩의 매각을 결정했습니다. 도심 프라임 오피스에 대한 기관 투자자의 수요가 견조하게 유지되는 상황을 활용했습니다." },
      { heading: "KPMG 자문 역할", text: "삼정KPMG는 부동산 매각자문 전 과정을 수행하며 자산 가치 극대화 전략을 수립했습니다. 임차 구조 재설계와 잠재 매수자 대상 경쟁 입찰 운영을 통해 매각가를 끌어올렸습니다." },
      { heading: "거래 의의", text: "도심 프라임 오피스 시장의 거래 기준점을 제시한 거래로, 코어 자산 매각의 모범 사례로 평가됩니다." },
    ],
  },
  {
    id: "case-022",
    slug: "jkl-pluglink-acquisition",
    body: [
      { text: "JKL파트너스가 국내 전기차 충전솔루션 기업 플러그링크를 인수하는 거래를 삼정KPMG가 자문했습니다. 전기차 시장 성장에 따른 충전 인프라 산업의 구조적 성장 흐름을 포착한 투자입니다." },
      { heading: "거래 배경", text: "국내외 전기차 보급 확산으로 충전 인프라 수요는 빠르게 늘고 있으며, 충전사업자에 대한 PE 투자자의 관심도 함께 확대되고 있습니다. JKL파트너스는 시장 선도 사업자 확보를 통해 성장 기회를 선점하고자 했습니다." },
      { heading: "KPMG 자문 역할", text: "가치평가와 재무실사를 수행하며 충전 인프라 산업 특유의 CAPEX 회수 구조, 정부 보조금 정책 변동성, 신규 사업 모델의 수익성을 정밀 분석했습니다." },
      { heading: "거래 의의", text: "전기차 충전 인프라 분야 대표 PE 투자 사례로, 향후 모빌리티 인프라 M&A의 기준점이 될 거래입니다." },
    ],
  },
  {
    id: "case-030",
    slug: "kai-genaiai-acquisition",
    body: [
      { text: "한국항공우주산업(KAI)의 AI 스타트업 젠젠에이아이 인수자문을 삼정KPMG가 수행했습니다. 항공우주·방산 산업의 AI 역량 내재화를 위한 전략적 기술 인수입니다." },
      { heading: "거래 배경", text: "글로벌 방산 산업은 AI 기반 자율시스템과 데이터 분석 역량 확보가 핵심 경쟁력으로 부상하고 있습니다. KAI는 자체 AI 역량 확보를 가속화하기 위해 검증된 기술과 인력을 보유한 스타트업 인수를 결정했습니다." },
      { heading: "KPMG 자문 역할", text: "가치평가, 세무실사, 재무실사를 통합 수행하며 초기 스타트업 특유의 기술 가치, 인력 가치, 향후 사업 시너지를 종합적으로 평가했습니다." },
      { heading: "거래 의의", text: "전통 산업 대기업의 AI 스타트업 인수형 M&A 모범 사례로, 방산·항공우주 분야 디지털 전환의 신호탄이 될 거래로 평가됩니다." },
    ],
  },
];

const caseById = (id: string) => advisoryCases.find((c) => c.id === id)!;

export const caseHighlights: CaseHighlight[] = HIGHLIGHT_SEEDS.map((seed) => {
  const base = caseById(seed.id);
  const category = getCaseCategory(base.industry);
  return {
    ...base,
    slug: seed.slug,
    image: CATEGORY_IMAGE[category],
    body: seed.body,
  };
});
