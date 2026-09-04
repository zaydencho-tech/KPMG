import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionIcon from "@/components/SectionIcon";
import MobileContentsNav from "@/components/MobileContentsNav";
import KpmgLogo from "@/components/KpmgMnaLogo";
import heroImage from "@/assets/subpage-mna-guide.jpg";
import pmiImage from "@/assets/mna-pmi.jpg";
import taxImage from "@/assets/mna-tax.jpg";
import realestateImage from "@/assets/mna-realestate.jpg";
import golfImage from "@/assets/mna-golf.jpg";
import startupImage from "@/assets/mna-startup.jpg";
import infraImage from "@/assets/mna-infra.jpg";

const tableOfContents = [
  "M&A란 무엇인가",
  "회사 매각 준비",
  "거래 과정과 실사",
  "승계·오너 엑시트",
  "투자유치 이해",
  "부동산 거래의 특징",
  "FAQ",
];

type InfographicType =
  | "definition"
  | "evolution"
  | "mna-types"
  | "process-timeline"
  | "terms-glossary"
  | "sale-method"
  | "valuation-approach"
  | "multiples"
  | "value-up"
  | "deal-structure"
  | "dd-types"
  | "dd-actors"
  | "implications"
  | "price-tier"
  | "exit-timing"
  | "earnout"
  | "rollover"
  | "day1-day100"
  | "tax-table"
  | "keyman"
  | "startup-lifecycle"
  | "investment-stage"
  | "startup-valuation"
  | "tam-sam-som"
  | "term-sheet"
  | "real-estate-diff"
  | "noi-caprate"
  | "real-tax"
  | "golf"
  | "infra-pf"
  | "esg-green";

type Item = { heading: string; body: string; note: string; noteTag?: string; infographic: InfographicType };
type Section = { title: string; copy: string; kpmgTip: string[]; kpmgWith: string[]; items: Item[] };

const sections: Section[] = [
  // ───────────────────── 1. M&A란 무엇인가 ─────────────────────
  {
    title: "M&A란 무엇인가",
    copy: "M&A는 ‘경영권에 변화를 가져오는 모든 거래’입니다.",
    kpmgTip: [
      "M&A는 ‘경영권에 변화를 가져오는 모든 거래’를 포괄하는 넓은 개념으로, 주식양수도부터 전략적 제휴, 구조조정까지 아우릅니다.",
      "국내 중견·중소기업 M&A 시장은 가업승계의 구조적 어려움과 융합(Convergence) 경제의 부상으로 성장세가 가속되고 있습니다.",
      "일반적인 프로세스는 준비 → 마케팅 → 본실사·SPA → Closing의 4단계로, 6~10개월이 소요됩니다.",
      "성공의 제1원칙은 ‘아무도 모르게 진행하는 것’입니다. 소문 한 줄이 기업 가치를 흔듭니다.",
    ],
    kpmgWith: [
      "KPMG M&A Center는 국내 최대 규모의 M&A 자문 조직으로, Sell-side와 Buy-side 자문, Cross-border 거래, Valuation, 실사, PMI까지 M&A 라이프사이클 전 영역을 단일 창구로 제공합니다.",
      "산업·재무·세무·법률 전문가가 한 팀으로 결합되어, ‘무엇을 어떻게, 누구에게’ 매각·인수할지의 가장 근본적인 질문부터 함께 설계합니다.",
      "M&A를 검토 중이시거나, 언젠가의 Exit·승계를 준비하고 계신다면 초기 단계의 비공식 상담부터 시작해 보시기를 권해 드립니다.",
    ],
    items: [
      {
        heading: "1.1 M&A의 정의와 범위",
        body: "M&A는 Merger(합병)와 Acquisition(인수)의 합성어로, 학문적 용어가 아닌 실무 표현입니다. 좁게는 주식양수도·자산양수도·합병이, 넓게는 전략적 제휴·합작투자·구조조정·우회상장까지 포괄됩니다. 결국 ‘경영권에 변화를 가져오는 모든 거래’로 이해하시면 됩니다. 적절한 시기의 매각은 기업에 새로운 자금과 네트워크를 수혈하여 제2의 도약기를 만들어 주고, 오너에게는 평생의 노력을 시장 가치로 보상받는 가장 지적인 선택이 될 수 있습니다.",
        note: "매각은 ‘포기’가 아니라 기업과 오너 모두에게 가장 지적인 선택이 될 수 있습니다.",
        noteTag: "관점 영역",
        infographic: "definition",
      },
      {
        heading: "1.2 왜 지금이 M&A의 시대인가",
        body: "인류 경제는 원자재 → 대량생산 → 서비스 → 경험을 거쳐, 지금은 자신과 타인의 역량을 융합(Convergence)하여 시너지를 만드는 시대입니다. 융합을 가장 빠르고 확실하게 실현하는 방법이 M&A입니다. 기업 성장은 유기적 성장(Organic)과 비유기적 성장(Inorganic, M&A·제휴)의 결합으로 이루어지며, 두 전략의 유연한 결합력이 2020년대 후반 기업 경쟁력의 핵심입니다.",
        note: "중소기업 오너 3명 중 1명이 자녀가 아닌 제3자에게의 승계를 고민 중입니다(중소벤처기업연구원).",
        noteTag: "시장 영역",
        infographic: "evolution",
      },
      {
        heading: "1.3 M&A의 유형",
        body: "결합 형태에 따라 ① 수평적(경쟁사 인수, 시장 지배력 확대), ② 수직적(공급망 전후방 인수), ③ 다각적(신규 영역 진출·리스크 분산)으로 구분됩니다. Cross-border M&A도 활발하며, 추진 이유는 ① 해외 영업망·생산거점 확보, ② 원천기술 획득, ③ 신사업 진출, ④ 더 높은 매각 배수(Multiple) 확보입니다. 다만 환율·규제·문화 통합 이슈로 정교한 설계가 필요합니다.",
        note: "2026년에는 복잡해진 조세·규제 환경으로 ‘선별적 검토’ 기조가 강해지는 추세입니다.",
        noteTag: "시장 영역",
        infographic: "mna-types",
      },
      {
        heading: "1.4 M&A의 일반적인 프로세스",
        body: "법으로 정해진 절차는 없지만 통상 4단계 흐름을 따릅니다. ① 준비(약 1.5개월, 자문사 선정·딜 구조·IM·NDA), ② 투자자 마케팅 및 예비실사(1~2개월, Tapping List·Teaser·Shortlist), ③ 본실사 및 SPA 협상(2~3개월, MP·Break Out·SPA 체결), ④ 거래 종료(약 3개월, 선행조건 이행·잔금 납입). 전체 6~10개월이 소요되며, 시장 상황과 매수자 의사결정 속도에 따라 늘어날 수 있습니다.",
        note: "KPMG 실제 프로젝트 중 예상보다 35주가 더 소요된 사례도 있었습니다. M&A는 살아있는 거래입니다.",
        noteTag: "사례 영역",
        infographic: "process-timeline",
      },
      {
        heading: "1.5 M&A에서 자주 사용되는 용어",
        body: "M&A 실무에서 반복적으로 등장하는 핵심 약어를 정리합니다. NDA(비밀유지), Teaser/IM(회사 소개·상세 자료), LOI(인수의향서), MOU(양해각서), SPA(주식매매계약서), SHA(주주간계약서), BTA(영업양수도계약서), VDR(가상데이터룸), Exclusivity(독점적 협상권), MP/BO(경영진 설명회·소그룹 심층 질의). 각 문서는 거래 단계별 정보 공개 수준과 법적 구속력이 다릅니다.",
        note: "Teaser는 회사를 유추할 수 있는 정보가 모두 지워진 채 배포되며, 관심자 등장 시 NDA 후 IM이 제공됩니다.",
        noteTag: "역량 영역",
        infographic: "terms-glossary",
      },
      {
        heading: "1.6 매각 방식의 선택",
        body: "매각 방식은 ① 공개경쟁입찰(가격 극대화, 노출 위험), ② 제한적 경쟁입찰(비밀 유지·효율성 균형), ③ 개별 협상(Private Deal, 비밀 최우선·협상력 약화)의 세 가지로 나뉩니다. 성공의 제1원칙은 ‘아무도 모르게 진행하는 것’입니다. 매각 소문은 핵심 인력 이탈과 거래처 불안으로 이어져 기업 가치를 훼손합니다.",
        note: "프로젝트 코드네임, 엄격한 NDA, VDR 운영을 통한 정보 노출 최소화가 필수입니다.",
        noteTag: "역량 영역",
        infographic: "sale-method",
      },
    ],
  },

  // ───────────────────── 2. 회사 매각 준비 ─────────────────────
  {
    title: "회사 매각 준비",
    copy: "최고의 가격은 ‘사전 체질 개선’에서 만들어집니다.",
    kpmgTip: [
      "기업가치 평가의 세 가지 접근법(수익·시장·원가)은 각각 강점과 한계가 다릅니다. 교차 검증이 정답입니다.",
      "실무에서 가장 많이 쓰이는 지표는 EV/EBITDA 배수이며, 동일 업종 상장사와 최근 거래 사례를 비교해 가격 범위를 잡습니다.",
      "매각 직전의 ‘체질 개선’(비핵심 자산 정리, 수익의 지속가능성 증명, 고객 집중도 완화)이 거래가를 좌우합니다.",
      "매각 구조(주식양수도 / 자산양수도 / 영업양수도 / 분할)에 따라 세금과 법적 책임이 완전히 달라지므로 초기 설계가 핵심입니다.",
    ],
    kpmgWith: [
      "KPMG는 가치평가(Valuation), 딜 구조 설계(Deal Structuring), 세무 최적화를 유기적으로 결합한 ‘통합 매각 준비 서비스’를 제공합니다.",
      "매각 자문팀과 Tax팀, 그리고 필요시 매도실사단(VDD)까지 초기 단계부터 함께 투입되어, 오너가 가장 높은 가치로 가장 유리한 구조로 매각할 수 있도록 설계합니다.",
      "본격적인 매각 검토가 필요하시면 언제든 비공식 상담을 요청해 주세요.",
    ],
    items: [
      {
        heading: "2.1 기업가치 평가의 기초",
        body: "기업가치는 세 가지 접근법으로 산정합니다. ① 수익접근법(DCF, 미래 현금흐름을 WACC로 할인), ② 시장접근법(GPCM·GTM, 유사 상장사·거래사례 비교), ③ 원가접근법(보유 자산·부채의 시장가치 환산). 완벽하게 객관적인 가치는 존재하지 않으며, Valuation은 예언이 아닌 의사결정을 위한 도구입니다. 시나리오를 설계하고 매수·매도자가 이를 기반으로 대화하는 것이 본질입니다.",
        note: "세 접근법은 각각 강점·한계가 다릅니다. 교차 검증이 정답입니다.",
        noteTag: "역량 영역",
        infographic: "valuation-approach",
      },
      {
        heading: "2.2 매각 가격을 결정하는 멀티플",
        body: "실무에서 가장 많이 쓰이는 지표는 EV/EBITDA 배수입니다. 동일 업종 상장사가 평균 EV/EBITDA 8배를 적용받고 자사 EBITDA가 50억이라면 기업가치는 약 400억으로 추정됩니다. 그 외 PER, EV/Sales, PBR도 함께 사용되며 각 지표의 강점·한계가 다릅니다. Forward(향후 12개월) vs Trailing(최근 12개월) 멀티플의 선택도 핵심으로, 성장기 기업은 Forward가 유리하나 사업계획 신빙성을 설득해야 합니다.",
        note: "하나의 배수에 의존하지 않고 여러 방법을 교차 검증해 합리적 가격 범위를 설정하는 것이 중요합니다.",
        noteTag: "역량 영역",
        infographic: "multiples",
      },
      {
        heading: "2.3 기업가치 극대화 전략",
        body: "매출이 높다고 비싸게 팔리는 것은 아닙니다. ① 비핵심 자산 정리로 본업 집중도 제고, ② 구독·장기계약 비중 확대로 수익 지속가능성 증명, ③ 상위 5개 고객 비중 30% 이하로 고객 집중도 완화, ④ 스톡옵션·리텐션 보너스로 Key Man 잔류 장치 마련. 매각 직전의 작은 체질 개선이 최종 거래가에서 수십억 원의 차이를 만듭니다.",
        note: "본격 프로세스 개시 6~12개월 전부터 사전 정비를 시작하시는 것이 좋습니다.",
        noteTag: "사례 영역",
        infographic: "value-up",
      },
      {
        heading: "2.4 거래 구조의 설계",
        body: "어떻게 파느냐에 따라 세금·법적 책임·실수령액이 크게 달라집니다. ① 주식양수도(가장 일반적, 우발부채 포함 모든 권리의무 승계), ② 자산양수도(개별 자산만, 고용 승계 의무 없음), ③ 영업양수도/BTA(사업 통째 이전, 우발부채 회피 가능), ④ 물적/인적분할(사업부 분리 후 매각, 적격분할 시 비과세 혜택). 오너의 은퇴 계획·세무·임직원 처우를 종합 고려해야 합니다.",
        note: "물적분할은 매각 대금이 모회사로, 인적분할은 주주에게 직접 돌아갑니다.",
        noteTag: "역량 영역",
        infographic: "deal-structure",
      },
    ],
  },

  // ───────────────────── 3. 거래 과정과 실사 ─────────────────────
  {
    title: "거래 과정과 실사",
    copy: "철저한 실사 대응이 곧 협상력의 원천입니다.",
    kpmgTip: [
      "실사(Due Diligence)는 ‘이 회사를 사도 괜찮을까?’를 검증하는 과정으로, 재무·세무·법률·사업 등 여러 영역으로 나뉩니다.",
      "Buy-side / Vendor(VDD) / Pre-Sale DD는 수행 주체와 목적이 다릅니다. 매도인은 Pre-Sale DD부터 시작하시는 것이 유리합니다.",
      "실사에서 도출되는 시사점은 Deal Breaker, Valuation Input, SPA, PMI 네 가지 카테고리로 분류됩니다.",
      "매수자의 실사가 시작되기 전 Pre-Audit으로 잠재 리스크를 정비해 두는 것이 협상력의 원천이 됩니다.",
    ],
    kpmgWith: [
      "KPMG의 Transaction Services 팀은 인수실사·매도실사 전 영역에서 국내 최상위 실적을 보유하고 있습니다. 업종별 DD Point 프레임워크와 수십 건의 실제 Case Library를 기반으로, 예비실사부터 정산실사까지 Deal의 전 구간을 지원합니다.",
      "매각자문 팀 또한 DD 경험이 풍부한 인력으로 구성되어, 실사단의 시각으로 잠재 Deal Breaker를 선제적으로 선별·치유하고 최적의 기업가치를 인정받을 수 있도록 함께합니다.",
      "매수자이시든 매도자이시든, ‘무엇을 준비해야 하는가’가 궁금하시다면 KPMG가 함께 체크리스트를 만들어 드립니다.",
    ],
    items: [
      {
        heading: "3.1 실사(Due Diligence)의 이해",
        body: "실사는 매수자가 ‘이 회사를 사도 괜찮을까’를 확인하는 과정으로, 재무·세무·법률·사업 전 영역을 정밀하게 검증합니다. 회계감사가 ISA·외감법에 근거해 ‘과거 재무제표의 공정성’에 대한 의견을 표명하는 것이라면, 실사는 합의된 절차(AUP)에 따라 ‘이 투자가 안전한가, 어떤 변수가 있는가’를 판단하기 위한 절차로 의견 표명이 없으며 보고서 이용자가 계약 당사자로 제한됩니다.",
        note: "실사와 회계감사는 목적·근거·이용자가 모두 다릅니다.",
        noteTag: "역량 영역",
        infographic: "dd-types",
      },
      {
        heading: "3.2 실사의 종류",
        body: "기능별로는 ① FDD(재무, 수익구조·운전자본·숨은 부채), ② TDD(세무, 법인세·부가세·이전가격), ③ LDD(법률, 계약·소송·CoC 조항), ④ CDD(사업, 시장·경쟁·고객 구조)로 나뉩니다. 수행 주체별로는 Buy-side DD(매수자 측), Vendor DD/VDD(매도인이 잠재 투자자에게 제공), Pre-Sale DD(매도인 자체 점검)로 구분되며, 매도인은 본격 프로세스 전 Pre-Sale DD부터 수행하는 것이 유리합니다.",
        note: "업종별 핵심: 제조업은 ASP-APP 스프레드, 건설·조선업은 총공사예정원가, 프랜차이즈는 Same Store 성장, 플랫폼은 신규 가입자 질·재방문율.",
        noteTag: "사례 영역",
        infographic: "dd-actors",
      },
      {
        heading: "3.3 Buy-side FDD의 핵심: 4가지 시사점(Implication)",
        body: "KPMG는 실사 시사점을 4개 카테고리로 분류합니다. ① Deal Breaker(딜을 중단시킬 중대 이슈: 저조한 실적, Valuation 이견, Key-man 불확실성, 규제 이슈), ② Valuation Input(가격에 직접 영향: NWC, 순차입금, 가동률, Pricing Scheme), ③ SPA 관점(본계약 반영: 선행조건, 진술·보장, Disclosure Schedule), ④ PMI 관점(사후관리: 수익성 개선, 시너지). 하나의 이슈가 여러 카테고리에 동시 해당되는 경우가 많습니다.",
        note: "예: 수율이 Max Capacity 근접 시 → 증설 CapEx(Valuation), 환경 인허가(SPA), 효율화 목표(PMI)가 동시 발생.",
        noteTag: "역량 영역",
        infographic: "implications",
      },
      {
        heading: "3.4 실사 대응 전략: 매각자문사의 중요성",
        body: "실사에서 예상치 못한 문제가 튀어나오면 가격 할인 또는 딜 무산으로 이어집니다. 자주 발생하는 문제는 ① 회계·세법 내용연수 차이로 인한 과세 위험, ② 부가세 사업장 등록 오류, ③ 과거 세무조사 지적사항 미반영, ④ 내부 횡령, ⑤ 관계사 공통비 배부·특수관계자 거래의 정상가액 이탈 등입니다. 매도인이 선제적으로 ‘이렇게 정비했습니다’를 제시하면 가격 할인 여지가 크게 줄어듭니다.",
        note: "철저한 실사 대응 자체가 협상력의 원천입니다. Pre-Audit로 잠재 리스크를 미리 정비하십시오.",
        noteTag: "역량 영역",
        infographic: "dd-types",
      },
      {
        heading: "3.5 가격조정(Price Adjustment)과 정산실사",
        body: "본계약(SPA) 체결 후에도 확인실사·정산실사 단계가 존재합니다. 본실사 시점과 Closing 시점 사이의 운전자본 변동 등을 반영해 최종 인수 대금을 정산합니다. 잠재적 가격조정항목은 4단계 Tier로 분류합니다: Tier 1(반영 명확), Tier 2(불확실성 존재, 이견 가능), Tier 3(SPA상 제외), Tier 4(매수자에 불리). 이 체계적 분류로 정산 협상을 구조화된 대화로 만듭니다.",
        note: "Tier 분류는 단순한 흥정이 아닌 구조화된 정산 협상의 출발점입니다.",
        noteTag: "역량 영역",
        infographic: "price-tier",
      },
    ],
  },

  // ───────────────────── 4. 승계·오너 엑시트 ─────────────────────
  {
    title: "승계·오너 엑시트",
    copy: "Exit은 ‘기업 가치가 높을 때’ 주도적으로 결정해야 합니다.",
    kpmgTip: [
      "Exit은 기업 가치가 높을 때, 오너의 판단력이 온전할 때 주도적으로 결정하는 것이 최선입니다.",
      "가격 눈높이 차이는 Earn-out으로, 미래 성장 참여 의지는 Rollover로 해소할 수 있습니다.",
      "PMI는 Day 1(운영 준비)과 Day 100(전략 실현)의 두 단계로 구분되며, 사전 준비 부족이 딜 Closing 지연의 최대 원인입니다.",
      "부동산과다보유법인 판정과 같은 세무 이슈는 수억~수십억 원의 차이를 만들 수 있어, 초기 구조 설계가 결정적입니다.",
    ],
    kpmgWith: [
      "KPMG는 셀사이드 자문에서 Carve-out·PMI까지 M&A 라이프사이클을 모두 책임지는 자문 서비스를 제공합니다. 단순히 딜을 끝내는 데 그치지 않고 Day 1과 Day 100 이후의 운영까지 함께 설계합니다.",
      "특히 세무 최적화는 Tax팀이 초기 구조 설계 단계부터 결합하여, 부동산과다보유법인 판정이나 특정 업종 과세 이슈를 사전에 차단합니다.",
      "오너의 삶 전체 설계(Exit 후 자금 운용, 재단 설립, 가족 자산 분산 등)까지 함께 고민하고 싶으시다면 Family Office 서비스도 함께 안내드립니다.",
    ],
    items: [
      {
        heading: "4.1 오너가 엑시트를 결심하는 순간",
        body: "회사 매각은 단순한 재무적 판단이 아닌 감정적으로 무거운 선택이며, 많은 오너가 고민만 하다가 최적 시점을 놓칩니다. 매각 결심 계기는 ① 자녀의 승계 의향·역량 부족, ② 오너의 건강·은퇴, ③ 상속·증여세 부담으로 가업승계 불가, ④ 업황 호조 시 적정 가격 Exit, ⑤ 성장을 위한 대기업·전문 투자자 자원 필요 등 다양합니다. 어떤 이유든 Exit은 부끄러운 선택이 아닙니다.",
        note: "기업 가치가 높고 오너의 판단력이 온전할 때 주도적으로 결정하는 것이 최선의 엑시트입니다.",
        noteTag: "관점 영역",
        infographic: "exit-timing",
      },
      {
        heading: "4.2 Earn-out: 가격 눈높이 차이를 해소하는 방법",
        body: "매도자는 ‘더 성장할 것’이라 믿고 매수자는 ‘증명되지 않은 미래에 프리미엄 어렵다’고 봅니다. Earn-out은 거래 시점 확정 대금 + 합의 기간(통상 1~3년) 동안 KPI 달성 시 추가 대금 지급 구조로 이 차이를 해소합니다. 핵심은 KPI 정의(매출/EBITDA, 회계처리 통일, 매수자 경영 개입 시 처리 방식 등)이며, Earn-out 기간 오너의 경영 참여도 사전 계획에 포함해야 합니다.",
        note: "KPI가 명확하지 않으면 분쟁의 소지가 됩니다. 사전에 꼼꼼히 정의해야 합니다.",
        noteTag: "역량 영역",
        infographic: "earnout",
      },
      {
        heading: "4.3 Rollover: 지분 일부를 남기는 전략",
        body: "Rollover는 매각 시 지분 일부(통상 10~30%)를 남기는 구조로, 인수 후 가치 상승분을 ‘세컨드 바이트(Second Bite of the Apple)’로 누릴 수 있습니다. PE가 인수 후 3~5년 후 재매각하면서 잔여 지분이 2~3배로 불어난 사례가 많습니다. 매수자에게도 ‘이 회사 미래에 본인 돈을 걸겠다’는 신뢰의 시그널입니다. 단, Tag-Along·Drag-Along, 경영 참여 범위, 배당, Exit 시점·방법은 SHA에 명확히 규정해야 합니다.",
        note: "오너의 업계 네트워크와 경영 노하우를 인수 후에도 활용할 수 있어 매수자에게도 매력적입니다.",
        noteTag: "사례 영역",
        infographic: "rollover",
      },
      {
        heading: "4.4 고용 승계와 조직 통합(PMI): Day 1 vs Day 100",
        body: "오너에게 가격만큼 중요한 것이 임직원 처우입니다. KPMG는 PMI를 Day 1(운영 단계)과 Day 100(전략 단계)으로 구조화합니다. Day 1은 SPA부터 거래 종결까지 영업·재무·인사·IT·총무·물류·법무 전 기능을 정상 운영 가능 상태로 준비하는 과정이고, Day 100은 Function별 워크샵, 중장기 운영·성장 모델 수립, 시너지 계획 구체화, Steering Committee 정기 보고 체계를 만드는 과정입니다.",
        note: "사전 PMI 준비 부족이 딜 Closing 지연의 최대 원인입니다.",
        noteTag: "역량 영역",
        infographic: "day1-day100",
      },
      {
        heading: "4.5 매각 대금의 세무 최적화",
        body: "오너 실수령액은 매각가에서 세금을 뺀 금액입니다. 개인이 비상장 주식 양도 시 3억 이하 약 22%, 초과분 약 27.5%이지만, 부동산과다보유법인 해당 시 기본세율 적용되어 10억 초과 구간에서 최대 49.5%까지 올라갑니다. 회피 방법: ① 부동산 선매각으로 비율 50% 미만, ② 영업양수도 전환, ③ 물적/인적분할로 부동산·사업 분리, ④ 50% 미만 우선 매각 후 신주 발행. 단 양도일 1년 이내 차입·증자로 늘린 현금은 자산총액 제외.",
        note: "단기간 인위적 비율 조작은 통하지 않습니다. 거래 초기 단계 세무 전문가와의 구조 설계가 필수입니다.",
        noteTag: "역량 영역",
        infographic: "tax-table",
      },
      {
        heading: "4.6 Key Man 이슈와 경영 지속",
        body: "중견·중소 M&A에서 가장 민감한 이슈가 오너의 경영 지속 여부입니다. 오너가 곧 핵심 인물(Key Man)인 경우가 많아 매수자는 통상 1~3년 경영 참여를 요청합니다. 이 기간 고객 관계 인수인계, 핵심 직원 안정화, 매수 경영진과의 업무 이관이 이루어집니다. 오너는 ‘바로 쉬고 싶다’와 ‘좋은 조건엔 경영 참여 약속이 필요하다’ 사이 균형을 잡아야 하며, 경영 기간·역할·보수·비경쟁(Non-compete) 조항을 SPA에 명확히 규정해야 합니다.",
        note: "오너의 라이프 플랜과 조화를 이루는 경영 참여 구조 설계가 거래 성공의 마지막 퍼즐입니다.",
        noteTag: "사례 영역",
        infographic: "keyman",
      },
    ],
  },

  // ───────────────────── 5. 투자유치 이해 ─────────────────────
  {
    title: "투자유치 이해",
    copy: "스타트업 금융은 ‘미래 시장 지배력’에 베팅합니다.",
    kpmgTip: [
      "스타트업 생애주기는 창업(Seed) → 죽음의 계곡(Death Valley) → 성장(Scale-up) → 엑시트(Growth-up)의 네 단계로 구분됩니다.",
      "투자 단계(Seed → Series A, B, C, D+)마다 기업가치·투자 규모·주요 투자자가 구조적으로 달라집니다.",
      "스타트업 Valuation은 DCF가 아닌 투자 규모와 지분율의 역산, Berkus, Scorecard, VC Method 등 정성적 기법을 병용합니다.",
      "투자 계약의 핵심 조항은 RCPS(상환전환우선주), Put/Call Option, Drag/Tag Along, 리픽싱, 진술·보증이며, 각 조항의 균형이 딜의 성패를 가릅니다.",
    ],
    kpmgWith: [
      "KPMG는 Seed부터 Pre-IPO까지 전 단계에서 스타트업 파이낸싱 자문을 수행하며, VC·PE·CVC 네트워크를 폭넓게 보유하고 있습니다.",
      "IR 자료 작성, Valuation 지원, Tapping List 선정, Term Sheet 협상, 투자 계약 체결까지 전 과정을 함께합니다.",
      "FI와 SI 양쪽에 걸친 네트워크와 ‘딜이 성사되는 IR’ 노하우를 결합해, 스타트업 파이낸싱의 성공 확률을 한 단계 끌어올립니다.",
    ],
    items: [
      {
        heading: "5.1 스타트업과 투자유치의 기초",
        body: "스타트업은 혁신적 기술·아이디어로 초고속 성장을 지향하는 신생 벤처입니다. 생애주기는 ① 창업기(Start-up, 팀 구성·법인 설립), ② 죽음의 계곡(Death Valley, BM 부재로 자금난, 약 60% 이상이 통과 실패), ③ 성장기(Scale-up), ④ 성장 완성기(Growth-up, IPO/M&A Exit 준비)의 4단계입니다. 리스크가 높은 만큼 성공 시 보상도 큽니다.",
        note: "통계적으로 스타트업의 약 60% 이상이 죽음의 계곡을 넘지 못합니다.",
        noteTag: "시장 영역",
        infographic: "startup-lifecycle",
      },
      {
        heading: "5.2 투자 단계별 특징",
        body: "Seed/Pre-A(가치 50억 이하·투자 5~20억, 엔젤·정부지원·TIPS) → Series A·B(100억~1,000억·20~150억, VC 주도, 매출·시장 확대 집중) → Series C(1,000억~5,000억·200~1,000억, 대형 VC·PE·CVC, 수익성 확보) → Series D/유니콘(1조 원 이상, Pre-IPO·전략 M&A) 순으로 단계별 기업가치·투자 규모·투자자가 구조적으로 달라집니다.",
        note: "TIPS 프로그램: 엑셀러레이터 1억 + 정부 R&D 5억 + 연계지원 4억 = 최대 10억 매칭 지원.",
        noteTag: "사례 영역",
        infographic: "investment-stage",
      },
      {
        heading: "5.3 M&A와 투자유치는 어떻게 다른가",
        body: "전통 M&A가 현재 가치를 확정하고 오너가 떠나는 과정이라면, 투자유치는 더 큰 미래를 위해 지분 일부를 투자자와 나누는 행위입니다. 전통 M&A가 과거 EBITDA에 기반한다면 스타트업 투자는 ‘미래 시장 지배력’에 베팅합니다. 초기 기업은 DCF 적용이 어려워 ① 투자 규모 역산(목표금·지분율로 Pre/Post Value 산정), ② VC Method, ③ Berkus Method(5개 성공 지표 × 최대 5억), ④ Scorecard Method를 병용합니다.",
        note: "예: 목표 투자금 10억, 지분율 10% → Post Value 100억, Pre Value 90억으로 역산.",
        noteTag: "역량 영역",
        infographic: "startup-valuation",
      },
      {
        heading: "5.4 시장 규모 분석과 IR 자료",
        body: "스타트업 IR의 핵심은 시장 규모 측정입니다. ① TAM(Total Addressable Market, 비즈니스 도메인 전체), ② SAM(Service Available Market, 실제 타깃하는 시장), ③ SOM(Service Obtainable Market, 초기 단계 확보 가능 시장)의 3단계로 구분되며, SOM은 매출 추정의 근거가 되므로 가장 중요합니다. IR 자료는 미괄식이 아닌 두괄식으로 작성해야 하며, Investment Highlight가 첫 페이지에 명확히 드러나야 합니다.",
        note: "투자자는 회의실에서 수십 개 피치를 듣습니다. 첫 페이지가 운명을 결정합니다.",
        noteTag: "역량 영역",
        infographic: "tam-sam-som",
      },
      {
        heading: "5.5 투자 계약 주요 조항",
        body: "스타트업은 일반적으로 RCPS(상환전환우선주)로 투자 유치합니다. 핵심 조항: ① Put Option(투자자의 지분 재매입 요구, 의무 주체가 대표 개인일 경우 연대보증 효과), ② Call Option(회사·대주주의 지분 매입권), ③ Drag Along(투자자 매각 시 다른 주주 동반 매각), ④ Tag Along(대주주 매각 시 투자자 동반 매도), ⑤ 리픽싱(영업손익·공모가 미달 시 전환가 변동), ⑥ 우선매수권, ⑦ Qualified IPO. 각 조항의 균형이 딜의 성패를 가릅니다.",
        note: "Put Option의 의무 주체가 대표이사 개인이면 연대보증 효과가 발생합니다. 각별한 주의가 필요합니다.",
        noteTag: "역량 영역",
        infographic: "term-sheet",
      },
      {
        heading: "5.6 파이낸싱 성공률을 높이는 원칙",
        body: "성공 사례의 공통점: ① 자문사와 열린 커뮤니케이션, ② 시장 상황에 따른 유연한 Pivot 능력, ③ 기술·시장을 동시에 이해하는 SI(전략적 투자자)로 타겟 선회 능력. 어느 리테일 기술 스타트업은 시장 미성숙 판단 후 스마트 캐비넷으로 전환하여 성공적으로 투자를 유치했습니다. 실패 사례 공통점: BM을 하나로 정리 못함, 시장 한계에도 기존 BM 고수, 팀원 간 미스커뮤니케이션.",
        note: "성공의 열쇠는 ① 사전 커뮤니케이션, ② Investment Highlight 선별, ③ FI·SI 네트워크 활용입니다.",
        noteTag: "사례 영역",
        infographic: "startup-lifecycle",
      },
    ],
  },

  // ───────────────────── 6. 부동산 거래의 특징 ─────────────────────
  {
    title: "부동산 거래의 특징",
    copy: "자산 가치가 곧 기업 가치, 세무·인허가가 핵심 변수입니다.",
    kpmgTip: [
      "부동산 관련 M&A는 자산 가치가 곧 기업 가치인 경우가 많고, 세무 구조와 인허가 이슈가 일반 M&A보다 훨씬 복잡합니다.",
      "상업용 부동산은 Value-Add 전략(리모델링·임차인 재구성)으로 NOI를 개선하면 자산 가치가 수십 배로 증폭됩니다.",
      "부동산과다보유법인 판정은 세율을 두 배 가까이 차이나게 만드는 결정적 변수입니다.",
      "인프라와 PF 사업은 장기적·안정적 현금흐름을 제공하며, ESG·그린뉴딜 정책으로 투자 기회가 구조적으로 확대되고 있습니다.",
    ],
    kpmgWith: [
      "KPMG는 부동산·인프라 분야의 M&A 자문 경험을 바탕으로, 거래 구조 설계부터 세무 최적화, PF 자문, ESG 인증까지 End-to-End 서비스를 제공합니다.",
      "부동산부터 인프라까지 커버하는 여러 전문팀이 상호 협력하여, 단순 매각 자문을 넘어 장기적 자산 운용 관점의 자문이 가능합니다.",
      "호텔·오피스·물류센터·골프장 등 다양한 부동산 유형의 자문 실적을 바탕으로, 귀사 자산에 가장 적합한 거래 구조와 Exit 전략을 제안해 드립니다.",
    ],
    items: [
      {
        heading: "6.1 부동산 M&A, 무엇이 다른가",
        body: "부동산 관련 M&A는 일반 기업 매각과 세 가지 면에서 다릅니다. ① 자산 가치가 곧 기업 가치(부동산 시가가 가치 대부분 차지), ② 세무 구조 복잡(부동산 직접 매매 vs 보유 법인 주식 매매의 세금 완전 상이), ③ 인허가·규제 영향이 큼(용도 변경·건축·환경 규제가 자산 가치에 직접 영향). 일반 M&A 자문 능력에 더해 부동산 시장에 대한 전문적 이해가 필수입니다.",
        note: "부동산 M&A는 일반 M&A 자문 역량 + 부동산 전문성의 결합이 필요합니다.",
        noteTag: "역량 영역",
        infographic: "real-estate-diff",
      },
      {
        heading: "6.2 상업용 부동산 Value-Add 전략",
        body: "Value-Add는 매각 전 자산 수익성을 개선해 더 높은 가격을 받는 접근법입니다. 물리적 개선(리모델링·로비 업그레이드·에너지 효율)과 운영적 개선(공실 충원·임대료 정상화·앵커 테넌트 유치를 통한 MD 개편)을 병행합니다. 부동산 가치는 NOI ÷ Cap Rate로 산정되므로 NOI 10% 개선이 자산 가치 수십억 원 차이로 이어집니다. 예: NOI 10억·Cap Rate 5% → 가치 200억. NOI를 11억으로 올리면 → 220억(1억 개선이 20억 가치 상승).",
        note: "Acquire → Reposition → Stabilize → Exit의 4단계 사이클로 자산 라이프사이클을 설계합니다.",
        noteTag: "사례 영역",
        infographic: "noi-caprate",
      },
      {
        heading: "6.3 부동산과다보유법인의 세무 이슈",
        body: "판정 기준은 두 가지: ① 일반 요건(자산총액 중 부동산 비율 50% 이상 + 과점주주가 발행주식 50% 이상 양도), ② 특정 업종 요건(골프장·스키장·휴양콘도 등은 부동산 80% 이상이면 1주만 양도해도 해당). 자회사 보유 부동산도 간접 산입되며, 장부가액·기준시가 중 큰 금액 적용. 양도일 1년 이내 차입·증자로 늘린 현금은 자산총액에서 제외됩니다(인위적 비율 조작 방지).",
        note: "예: 자산 300억(토지 100·건물 34·종속기업 20)의 부동산 비율 53.8% → 차입금 30억이 1년 이전이면 48.4%로 비해당. 차입 시점 하나로 수십억 원 세금 차이.",
        noteTag: "사례 영역",
        infographic: "real-tax",
      },
      {
        heading: "6.4 골프장·리조트 매각의 특수성",
        body: "골프장·리조트는 일반 상업용 부동산과 차원이 다른 복잡성을 가집니다. ① 세무: 특정 업종 요건(80%) 적용 → 1주만 양도해도 기본세율, ② 가치평가: 회원권 가치(시장 수급·입지 변동), 운영권(서비스 사업이므로 노하우·브랜드), 입지(수도권 접근성·주변 개발·교통), ③ 환경 규제: 농약·수질·생태계 규제와 인허가 유지 조건. 거래 구조는 부동산 선매각, 법인 분할 후 골프장 법인만 매각, 자산양수도 등을 비교 검토합니다.",
        note: "각 거래 방식은 세금·인허가 승계·회원권 처리에서 차이가 크므로 종합적 검토가 필수입니다.",
        noteTag: "사례 영역",
        infographic: "golf",
      },
      {
        heading: "6.5 인프라와 PF 사업의 이해",
        body: "인프라는 발전소·도로·항만·공항·철도 등 사회 자본 시설로, 최근 태양광·풍력·폐기물·상하수도·데이터센터까지 확장 중입니다. 자금 조달은 PF(Project Finance, 기업 신용이 아닌 프로젝트 미래 현금흐름 담보)가 활용됩니다. 인프라는 경기 변동에 둔감하고 장기·안정적 현금흐름을 제공해 연기금·장기 투자자에게 매력적입니다. 글로벌 상장 인프라 시장은 약 1조 2,000억 달러, 평균 배당수익률 3.7% 수준입니다.",
        note: "인프라 투자는 직접투자(특정 프로젝트 출자)와 간접투자(인프라 펀드·상장 인프라 기업)로 나뉩니다.",
        noteTag: "시장 영역",
        infographic: "infra-pf",
      },
      {
        heading: "6.6 ESG와 그린 인프라의 투자 기회",
        body: "ESG는 이제 선택이 아닌 필수입니다. 유럽은 2021년부터 ESG 공시를 의무화했고, 국내 국민연금도 ESG 투자를 전체 기금 자산의 절반 수준으로 확대 선언. RE100에는 Apple·BMW·Google·월마트 등 280여 글로벌 기업과 LG화학·SK하이닉스·한화큐셀 등이 참여하여 협력업체에까지 동참을 요구합니다. 한국의 그린뉴딜은 탄소중립을 목표로 도시·공간·생활 인프라의 녹색 전환, 저탄소 에너지 확산, 녹색산업 혁신 8대 과제를 추진 중입니다.",
        note: "노후 건물 그린 리모델링, 신재생 발전 프로젝트, ESG 친환경 건축물 개발은 모두 M&A로 빠르게 추진 가능한 영역입니다.",
        noteTag: "시장 영역",
        infographic: "esg-green",
      },
    ],
  },
];

const faqs = [
  ["M&A 전체 프로세스는 얼마나 걸리나요?", "준비(1.5개월) → 마케팅·예비실사(1~2개월) → 본실사·SPA(2~3개월) → 거래 종료(약 3개월)로 통상 6~10개월이 소요되며, 시장 상황과 매수자 의사결정 속도에 따라 늘어날 수 있습니다."],
  ["매각 사실을 어떻게 비밀로 유지하나요?", "성공의 제1원칙은 ‘아무도 모르게 진행하는 것’입니다. 프로젝트 코드네임, 엄격한 NDA, VDR 운영, Teaser의 익명 처리를 통해 정보 노출을 최소화합니다."],
  ["기업가치는 어떤 기준으로 산정되나요?", "수익(DCF)·시장(EV/EBITDA, PER 등)·원가 접근법을 교차 검증해 가격 범위를 설정합니다. 동일 업종 상장사·최근 거래 사례 비교가 실무의 출발점입니다."],
  ["일부 지분만 남기고 매각해도 되나요?", "가능합니다. Rollover 구조로 10~30%를 남겨두면 인수 후 가치 상승분을 ‘세컨드 바이트’로 누릴 수 있고, 매수자에게도 신뢰의 시그널이 됩니다."],
  ["부동산을 많이 보유한 회사는 세금이 어떻게 달라지나요?", "부동산과다보유법인(자산 중 부동산 50% 이상)에 해당하면 기본세율이 적용되어 10억 원 초과 구간에서 최대 49.5%까지 양도세율이 올라갑니다. 거래 초기부터 구조 설계가 필수입니다."],
  ["스타트업 투자유치는 일반 M&A와 무엇이 다른가요?", "전통 M&A가 과거 EBITDA에 기반해 경영권을 이전한다면, 스타트업 투자유치는 미래 시장 지배력에 베팅하며 RCPS·Put Option·Drag/Tag Along 등 정교한 조항 설계가 필요합니다."],
];

// ─────────────────────────────────────────────────────────────────
// Shared building blocks
// ─────────────────────────────────────────────────────────────────

const Circle = ({
  label,
  caption,
  filled = false,
  size = 160,
}: {
  label: string;
  caption?: string;
  filled?: boolean;
  size?: number;
}) => (
  <div
    className={`flex shrink-0 flex-col items-center justify-center rounded-full text-center ${
      filled ? "bg-foreground text-background" : "border border-foreground bg-background text-foreground"
    }`}
    style={{ width: size, height: size }}
  >
    <span className="px-3 text-sm font-semibold">{label}</span>
    {caption && (
      <span className={`mt-2 px-4 text-[11px] leading-snug ${filled ? "text-background/70" : "text-muted-foreground"}`}>
        {caption}
      </span>
    )}
  </div>
);

const InfographicFrame = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const BASE = 920;
    const update = () => {
      const w = outer.clientWidth;
      const s = Math.min(1, w / BASE);
      setScale(s);
      setHeight(inner.scrollHeight * s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="min-w-0 overflow-hidden border border-border bg-section-alt p-5 md:p-10">
      <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:mb-10 md:text-[12px]">
        {title}
      </p>
      <div ref={outerRef} className="relative w-full" style={{ height }}>
        <div
          ref={innerRef}
          style={{
            width: 920,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const PhotoCaption = ({
  image,
  alt,
  tag,
  title,
  points,
}: {
  image: string;
  alt: string;
  tag: string;
  title: string;
  points: { k: string; d: string }[];
}) => (
  <div className="grid overflow-hidden border border-border bg-background md:grid-cols-2">
    <div className="relative aspect-[16/10] md:aspect-auto">
      <img
        src={image}
        alt={alt}
        loading="lazy"
        width={1280}
        height={800}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "saturate(0.9)" }}
      />
    </div>
    <div className="flex flex-col justify-center gap-4 bg-section-alt p-5 md:gap-6 md:p-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:text-[12px]">{tag}</p>
      <h4 className="font-serif text-[17px] font-bold leading-snug text-foreground md:text-2xl">{title}</h4>
      <ul className="space-y-2.5 border-t border-border pt-4 md:space-y-3 md:pt-5">
        {points.map((p) => (
          <li key={p.k} className="flex items-baseline gap-3 md:gap-4">
            <span className="w-20 shrink-0 text-[12px] font-semibold text-foreground md:w-24 md:text-sm">{p.k}</span>
            <span className="text-[12px] leading-relaxed text-muted-foreground md:text-[13px]">{p.d}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Reusable typographic blocks
const StepRow = ({ items }: { items: { k: string; sub?: string; d: string; filled?: boolean }[] }) => (
  <div className="grid gap-px bg-border grid-cols-4">
    {items.map((it) => (
      <div
        key={it.k}
        className={`p-6 ${it.filled ? "bg-foreground text-background" : "bg-background"}`}
      >
        <p className={`text-[11px] font-semibold uppercase tracking-widest ${it.filled ? "text-background/60" : "text-muted-foreground"}`}>
          {it.sub ?? "Step"}
        </p>
        <p className={`mt-2 font-serif text-lg font-bold ${it.filled ? "" : "text-foreground"}`}>{it.k}</p>
        <p className={`mt-2 text-[13px] leading-relaxed ${it.filled ? "text-background/70" : "text-muted-foreground"}`}>{it.d}</p>
      </div>
    ))}
  </div>
);

const StackedTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto border border-foreground">
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className="bg-foreground text-background">
          {headers.map((h) => (
            <th key={h} className="border-r border-background/20 px-4 py-3 text-[12px] font-semibold uppercase tracking-widest last:border-r-0">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, idx) => (
          <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-section-alt"}>
            {r.map((cell, ci) => (
              <td key={ci} className="border-t border-border px-4 py-3 text-[13px] leading-relaxed text-foreground">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─────────────────────────────────────────────────────────────────
// Infographic switch
// ─────────────────────────────────────────────────────────────────

const Infographic = ({ type }: { type: InfographicType }) => {
  switch (type) {
    case "definition":
      return (
        <InfographicFrame title="M&A의 전략적 목적">
          <div className="flex flex-wrap items-center justify-center gap-y-6 flex-nowrap">
            <Circle label="Growth" caption="신규 시장·기술 확장" size={170} />
            <div className="-mx-4 hidden text-2xl font-light text-muted-foreground md:block">+</div>
            <Circle label="Succession" caption="가업 승계의 대안" size={170} />
            <div className="hidden text-muted-foreground md:flex items-center md:px-2">
              <span className="h-px w-8 bg-foreground" />
              <span className="mx-1 text-[13px]">→</span>
            </div>
            <Circle label="Owner Exit" caption="시장가치로 환산된 보상" size={170} filled />
          </div>
        </InfographicFrame>
      );

    case "evolution":
      return (
        <InfographicFrame title="경제 발전 단계와 M&A 시대의 도래">
          <StepRow
            items={[
              { sub: "1단계", k: "Commodity", d: "원자재 확보의 시대" },
              { sub: "2단계", k: "Production", d: "산업혁명·대량생산" },
              { sub: "3단계", k: "Service / Experience", d: "서비스·경험 경제" },
              { sub: "4단계", k: "Convergence", d: "역량 융합 = M&A 시대", filled: true },
            ]}
          />
          <p className="mt-6 text-center text-[13px] text-muted-foreground">
            기업 성장 = Organic Growth + <span className="text-foreground font-semibold">Inorganic Growth(M&A·제휴)</span>
          </p>
        </InfographicFrame>
      );

    case "mna-types":
      return (
        <InfographicFrame title="결합 형태별 M&A 분류">
          <div className="grid gap-px bg-border grid-cols-3">
            {[
              { k: "수평적 M&A", d: "경쟁사 인수, 시장 지배력 확대", ex: "동일 업종 합병" },
              { k: "수직적 M&A", d: "공급망 전후방 기업 인수", ex: "원재료·유통 통합" },
              { k: "다각적 M&A", d: "신규 영역 진출·리스크 분산", ex: "이종 산업 확장" },
            ].map((t) => (
              <div key={t.k} className="bg-background p-6">
                <p className="font-serif text-lg font-bold text-foreground">{t.k}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{t.d}</p>
                <p className="mt-4 border-t border-border pt-3 text-[12px] uppercase tracking-widest text-gold">{t.ex}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border border-border bg-background p-5 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-gold">Cross-border M&A</p>
            <p className="mt-2 text-[13px] text-muted-foreground">해외 영업망·원천기술·신사업·매각 배수(Multiple) — 4대 추진 동인</p>
          </div>
        </InfographicFrame>
      );

    case "process-timeline":
      return (
        <InfographicFrame title="M&A 4단계 프로세스 (총 6~10개월)">
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-foreground/30 md:block" />
            <div className="relative grid gap-6 grid-cols-4">
              {[
                { k: "준비", d: "자문사 선정·딜 구조·IM·NDA", t: "1.5개월" },
                { k: "마케팅·예비실사", d: "Tapping List·Teaser·Shortlist", t: "1~2개월" },
                { k: "본실사·SPA", d: "MP·BO·세부 조건·SPA 체결", t: "2~3개월" },
                { k: "Closing", d: "선행조건·잔금·종결", t: "약 3개월", filled: true },
              ].map((s, idx) => (
                <div key={s.k} className={`relative border border-foreground p-5 ${s.filled ? "bg-foreground text-background" : "bg-background"}`}>
                  <p className={`text-[11px] font-semibold uppercase tracking-widest ${s.filled ? "text-background/60" : "text-muted-foreground"}`}>Step {idx + 1}</p>
                  <p className={`mt-2 font-serif text-lg font-bold ${s.filled ? "" : "text-foreground"}`}>{s.k}</p>
                  <p className={`mt-2 text-[13px] leading-relaxed ${s.filled ? "text-background/70" : "text-muted-foreground"}`}>{s.d}</p>
                  <p className={`mt-4 border-t pt-3 text-[13px] font-semibold ${s.filled ? "border-background/30" : "border-border text-gold"}`}>{s.t}</p>
                </div>
              ))}
            </div>
          </div>
        </InfographicFrame>
      );

    case "terms-glossary":
      return (
        <InfographicFrame title="M&A 핵심 용어집">
          <div className="grid gap-px bg-border grid-cols-2">
            {[
              { k: "NDA", d: "비밀유지협약 — 논의 비공개 약속" },
              { k: "Teaser / IM", d: "회사 익명 소개서 / 상세 정보 메모랜덤" },
              { k: "LOI", d: "인수의향서 — 인수 의향·조건 공식 표명" },
              { k: "MOU", d: "양해각서 — 본 계약 전 잠정 합의" },
              { k: "SPA", d: "주식매매계약서 — 지분 거래 본 계약" },
              { k: "SHA", d: "주주간계약서 — 주주 권리·의무 규정" },
              { k: "BTA", d: "영업양수도계약서 — 사업부 단위 양수도" },
              { k: "VDR", d: "가상데이터룸 — 검증된 후보자에 자료 공개" },
              { k: "Exclusivity", d: "독점적 협상권" },
              { k: "MP / BO", d: "경영진 설명회 / 소그룹 심층 질의" },
            ].map((t) => (
              <div key={t.k} className="flex items-baseline gap-4 bg-background px-5 py-4">
                <span className="w-28 shrink-0 font-serif text-sm font-bold text-foreground">{t.k}</span>
                <span className="text-[13px] leading-relaxed text-muted-foreground">{t.d}</span>
              </div>
            ))}
          </div>
        </InfographicFrame>
      );

    case "sale-method":
      return (
        <InfographicFrame title="3가지 매각 방식의 트레이드오프">
          <StackedTable
            headers={["매각 방식", "경쟁 강도", "비밀 유지", "특징"]}
            rows={[
              ["공개경쟁입찰", "★★★", "★", "가격 극대화, 노출 위험 큼"],
              ["제한적 경쟁입찰", "★★", "★★", "비밀·효율성 균형 (실무 권장)"],
              ["개별 협상 (Private)", "★", "★★★", "비밀 최우선, 협상력 약화"],
            ]}
          />
          <p className="mt-6 text-center text-[12px] font-semibold uppercase tracking-widest text-gold">
            제1원칙 — 아무도 모르게 진행하는 것
          </p>
        </InfographicFrame>
      );

    case "valuation-approach":
      return (
        <InfographicFrame title="기업가치 평가의 3대 접근법">
          <div className="grid gap-6 grid-cols-3">
            {[
              { k: "수익접근법", e: "Income Approach", m: "DCF (현금흐름 ÷ WACC)", d: "회사 고유 수익 구조 반영, 장기 추정 오차" },
              { k: "시장접근법", e: "Market Approach", m: "GPCM · GTM (배수 비교)", d: "직관적·현실적, 시장 분위기 영향", filled: true },
              { k: "원가접근법", e: "Cost Approach", m: "자산·부채 시장가 환산", d: "자산형·구조조정 기업에 적합" },
            ].map((v) => (
              <div key={v.k} className={`border border-foreground p-6 ${v.filled ? "bg-foreground text-background" : "bg-background"}`}>
                <p className={`text-[11px] font-semibold uppercase tracking-widest ${v.filled ? "text-background/60" : "text-muted-foreground"}`}>{v.e}</p>
                <p className={`mt-2 font-serif text-lg font-bold ${v.filled ? "" : "text-foreground"}`}>{v.k}</p>
                <p className={`mt-3 text-sm font-semibold ${v.filled ? "text-background" : "text-gold"}`}>{v.m}</p>
                <p className={`mt-3 text-[13px] leading-relaxed ${v.filled ? "text-background/70" : "text-muted-foreground"}`}>{v.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[13px] text-muted-foreground">교차 검증으로 합리적 가격 범위 설정 → Valuation은 의사결정 도구</p>
        </InfographicFrame>
      );

    case "multiples":
      return (
        <InfographicFrame title="실무에서 자주 쓰이는 멀티플">
          <StackedTable
            headers={["지표", "정의", "강점", "한계"]}
            rows={[
              ["EV/EBITDA", "기업가치 ÷ EBITDA", "재무구조 영향 배제, 글로벌 비교 가능", "감가상각 차이 반영 한계"],
              ["PER", "시가총액 ÷ 당기순이익", "주주 귀속 직관적", "재무구조 영향 그대로 반영"],
              ["EV/Sales", "기업가치 ÷ 매출", "적자 기업 적용 가능", "업종 마진 차이 반영 못함"],
              ["PBR", "시가총액 ÷ 순자산", "자산 중심 기업에 유효", "수익성 반영 약함"],
            ]}
          />
          <p className="mt-6 text-center text-[13px] text-muted-foreground">
            예: 업종 평균 EV/EBITDA 8배 × 자사 EBITDA 50억 = <span className="font-semibold text-foreground">기업가치 약 400억 원</span>
          </p>
        </InfographicFrame>
      );

    case "value-up":
      return (
        <InfographicFrame title="기업가치 극대화 4대 체질 개선">
          <div className="grid gap-px bg-border grid-cols-4">
            {[
              { n: "01", k: "비핵심 자산 정리", d: "본업 외 부동산·투자자산 분리" },
              { n: "02", k: "수익 지속성 증명", d: "구독·장기계약 비중 확대" },
              { n: "03", k: "고객 집중도 완화", d: "상위 5개 고객 비중 30% 이하" },
              { n: "04", k: "Key Man 잔류 장치", d: "스톡옵션·리텐션 보너스" },
            ].map((s) => (
              <div key={s.n} className="bg-background p-6">
                <p className="font-serif text-2xl text-gold">{s.n}</p>
                <p className="mt-2 font-serif text-base font-bold text-foreground">{s.k}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[12px] font-semibold uppercase tracking-widest text-gold">
            본격 프로세스 6~12개월 전 사전 정비 권장
          </p>
        </InfographicFrame>
      );

    case "deal-structure":
      return (
        <InfographicFrame title="거래 구조 4가지 옵션">
          <StackedTable
            headers={["구조", "이전 대상", "특징", "주요 이슈"]}
            rows={[
              ["주식양수도", "회사 지분", "가장 일반적, 회사 존속", "우발부채 포함 권리의무 승계"],
              ["자산양수도", "개별 자산", "고용 승계 의무 없음", "자산별 이전 절차·취득세"],
              ["영업양수도(BTA)", "사업 통째", "우발부채 회피 가능", "계약 동의 이전·인허가 재취득"],
              ["물적·인적분할", "사업부 분리", "분할 후 매각, 적격분할 시 비과세", "물적=모회사 / 인적=주주 직접 수령"],
            ]}
          />
        </InfographicFrame>
      );

    case "dd-types":
      return (
        <InfographicFrame title="실사 4대 영역 — Hub & Spoke">
          <div className="relative mx-auto h-[420px] w-full max-w-[520px]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Circle label="Due Diligence" caption="협상력의 원천" size={160} filled />
            </div>
            {[
              { k: "FDD", d: "재무·운전자본·부채", pos: "left-1/2 top-0 -translate-x-1/2" },
              { k: "TDD", d: "법인세·이전가격", pos: "right-0 top-1/2 -translate-y-1/2" },
              { k: "LDD", d: "계약·소송·CoC", pos: "left-1/2 bottom-0 -translate-x-1/2" },
              { k: "CDD", d: "시장·경쟁·고객", pos: "left-0 top-1/2 -translate-y-1/2" },
            ].map((s) => (
              <div key={s.k} className={`absolute ${s.pos}`}>
                <Circle label={s.k} caption={s.d} size={110} />
              </div>
            ))}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 520 420">
              <line x1="260" y1="110" x2="260" y2="155" stroke="currentColor" strokeWidth="1" className="text-foreground" />
              <line x1="410" y1="210" x2="345" y2="210" stroke="currentColor" strokeWidth="1" className="text-foreground" />
              <line x1="260" y1="310" x2="260" y2="265" stroke="currentColor" strokeWidth="1" className="text-foreground" />
              <line x1="110" y1="210" x2="175" y2="210" stroke="currentColor" strokeWidth="1" className="text-foreground" />
            </svg>
          </div>
        </InfographicFrame>
      );

    case "dd-actors":
      return (
        <InfographicFrame title="수행 주체별 실사 유형">
          <div className="grid gap-px bg-border grid-cols-3">
            {[
              { k: "Buy-side DD", who: "매수자 측", d: "잠재 기회·위험을 선제적으로 파악. 정보 제약 하에 효율적 분석 필요." },
              { k: "Vendor DD (VDD)", who: "매도인 → 잠재 투자자 제공", d: "객관성 확보 위해 외부 전문가 활용. 보고서 이용자 = 잠재 투자자." },
              { k: "Pre-Sale DD", who: "매도인 자체 점검", d: "외부 공개 X. Seller 친화적 관점에서 약점 파악·보완 전략 수립.", filled: true },
            ].map((a) => (
              <div key={a.k} className={`p-6 ${a.filled ? "bg-foreground text-background" : "bg-background"}`}>
                <p className="font-serif text-lg font-bold">{a.k}</p>
                <p className={`mt-2 text-[12px] uppercase tracking-widest ${a.filled ? "text-background/60" : "text-gold"}`}>{a.who}</p>
                <p className={`mt-3 text-[13px] leading-relaxed ${a.filled ? "text-background/70" : "text-muted-foreground"}`}>{a.d}</p>
              </div>
            ))}
          </div>
        </InfographicFrame>
      );

    case "implications":
      return (
        <InfographicFrame title="Buy-side FDD 4대 시사점 매트릭스">
          <div className="grid gap-px bg-border grid-cols-2">
            {[
              { k: "Deal Breaker", d: "딜 자체를 중단시킬 중대 이슈 — 저조 실적, Valuation 이견, Key-man 불확실성, 규제 이슈" },
              { k: "Valuation Input", d: "가격에 직접 영향 — Value Chain, Margin Structure, NWC, 순차입금, 가동률, Pricing Scheme", filled: true },
              { k: "SPA 관점", d: "본계약 반영 — 선행조건, 진술·보장, Key-man Plan, Disclosure Schedule, 가격조정 정의" },
              { k: "PMI 관점", d: "사후관리 — 수익성 개선, 업무 효율화, 시너지, 물리적·화학적 통합 방안" },
            ].map((c) => (
              <div key={c.k} className={`p-6 ${c.filled ? "bg-foreground text-background" : "bg-background"}`}>
                <p className={`font-serif text-lg font-bold ${c.filled ? "" : "text-foreground"}`}>{c.k}</p>
                <p className={`mt-3 text-[13px] leading-relaxed ${c.filled ? "text-background/70" : "text-muted-foreground"}`}>{c.d}</p>
              </div>
            ))}
          </div>
        </InfographicFrame>
      );

    case "price-tier":
      return (
        <InfographicFrame title="가격조정항목 4단계 Tier 분류">
          <StackedTable
            headers={["Tier", "정의", "비고"]}
            rows={[
              ["Tier 1", "조정 사유 충족 + 기준재무제표 반영 명확", "협상 시 양측 합의 가능성 높음"],
              ["Tier 2", "자료 제약으로 금액적 불확실성 존재", "매수·매도 간 이견 발생 가능"],
              ["Tier 3", "SPA상 조정 대상에서 제외", "협상 외 항목"],
              ["Tier 4", "조정 사유 충족, 단 매수자에 불리", "순자산 증가 → 매수자 측 거부 가능"],
            ]}
          />
        </InfographicFrame>
      );

    case "exit-timing":
      return (
        <InfographicFrame title="오너가 엑시트를 결심하는 5가지 계기">
          <div className="grid gap-px bg-border grid-cols-5">
            {[
              { k: "승계 부재", d: "자녀 의향·역량 부족" },
              { k: "건강·은퇴", d: "오너 본인 라이프 사이클" },
              { k: "세무 부담", d: "상속·증여세 가업승계 불가" },
              { k: "업황 호조", d: "적정 가격 Exit 기회" },
              { k: "성장 자원", d: "대기업·전문 투자자 필요" },
            ].map((c) => (
              <div key={c.k} className="bg-background p-5 text-center">
                <p className="font-serif text-base font-bold text-foreground">{c.k}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[12px] font-semibold uppercase tracking-widest text-gold">
            기업 가치가 높을 때 · 오너 판단력이 온전할 때 = 최선의 엑시트
          </p>
        </InfographicFrame>
      );

    case "earnout":
      return (
        <InfographicFrame title="Earn-out 구조 — 가격 눈높이의 다리">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-stretch gap-px bg-border">
              <div className="flex-[5] bg-background p-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">거래 시점</p>
                <p className="mt-2 font-serif text-lg font-bold text-foreground">확정 대금</p>
                <p className="mt-2 text-[13px] text-muted-foreground">Closing 시 일시 지급되는 기본 매각 대금</p>
              </div>
              <div className="flex flex-[3] flex-col bg-foreground p-6 text-background">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-background/60">1~3년 후</p>
                <p className="mt-2 font-serif text-lg font-bold">추가 대금</p>
                <p className="mt-2 text-[13px] text-background/70">KPI 달성 시 지급 — 성과 연동 보너스</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 grid-cols-3">
              {["KPI 정의 (매출 vs EBITDA)", "회계처리 통일 방식", "매수자 경영 개입 시 처리"].map((k) => (
                <div key={k} className="border border-border bg-background px-4 py-3 text-[13px] text-muted-foreground">
                  <span className="text-gold">설계 포인트 — </span>{k}
                </div>
              ))}
            </div>
          </div>
        </InfographicFrame>
      );

    case "rollover":
      return (
        <InfographicFrame title="Rollover — 잔여 지분으로 누리는 ‘세컨드 바이트’">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-6 grid-cols-2">
              <div className="border border-foreground bg-background p-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">1차 거래 (Day 0)</p>
                <p className="mt-2 font-serif text-lg font-bold text-foreground">매각 70~90% / 잔여 10~30%</p>
                <p className="mt-3 text-[13px] text-muted-foreground">대부분 현금화하되 일정 지분 보유. 매수자에게 신뢰 시그널.</p>
              </div>
              <div className="border border-foreground bg-foreground p-6 text-background">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-background/60">3~5년 후 (Second Bite)</p>
                <p className="mt-2 font-serif text-lg font-bold">잔여 지분 가치 2~3배 ↑</p>
                <p className="mt-3 text-[13px] text-background/70">PE 재매각·IPO 시 잔여 지분으로 두 번째 수익 실현.</p>
              </div>
            </div>
            <p className="mt-6 text-center text-[12px] font-semibold uppercase tracking-widest text-gold">
              SHA 필수 조항 — Tag-Along · Drag-Along · 경영 참여 · 배당 · Exit 방법
            </p>
          </div>
        </InfographicFrame>
      );

    case "day1-day100":
      return (
        <PhotoCaption
          image={pmiImage}
          alt="PMI 통합을 위한 임원 회의"
          tag="PMI Roadmap"
          title="Day 1(운영 단계) → Day 100(전략 단계)"
          points={[
            { k: "Day 1", d: "영업·재무·인사·IT·총무·물류·법무 전 기능 정상 운영 준비" },
            { k: "Day 100", d: "Function별 워크샵, 중장기 운영·성장 모델 수립" },
            { k: "이후", d: "Steering Committee 정기 보고, 시너지·R&D 협업 가속" },
          ]}
        />
      );

    case "tax-table":
      return (
        <PhotoCaption
          image={taxImage}
          alt="세무 자문 서류와 계산기"
          tag="Tax Optimization"
          title="개인 주주 비상장 주식 양도세율 비교"
          points={[
            { k: "일반 법인", d: "3억 이하 약 22% / 초과분 약 27.5%" },
            { k: "부동산과다보유법인", d: "기본세율 적용 → 10억 초과 최대 49.5%" },
            { k: "회피 구조", d: "선매각 · 영업양수도 · 분할 · 단계적 매각" },
          ]}
        />
      );

    case "keyman":
      return (
        <InfographicFrame title="Key Man 경영 지속의 균형점">
          <div className="mx-auto max-w-3xl">
            <div className="grid items-stretch gap-6 grid-cols-3">
              <div className="border border-foreground bg-background p-6 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">매도자 욕구</p>
                <p className="mt-3 font-serif text-base font-bold text-foreground">팔고 나면 즉시 휴식</p>
              </div>
              <div className="flex items-center justify-center bg-foreground p-6 text-background">
                <div className="text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-background/60">합의점</p>
                  <p className="mt-3 font-serif text-base font-bold">통상 1~3년 경영 참여</p>
                  <p className="mt-2 text-[13px] text-background/70">고객·직원·시스템 인수인계</p>
                </div>
              </div>
              <div className="border border-foreground bg-background p-6 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">매수자 욕구</p>
                <p className="mt-3 font-serif text-base font-bold text-foreground">사업 연속성 보장</p>
              </div>
            </div>
            <p className="mt-6 text-center text-[13px] text-muted-foreground">
              SPA 명문화 항목 — 경영 참여 기간 · 역할 범위 · 보수 · <span className="font-semibold text-foreground">비경쟁(Non-compete)</span>
            </p>
          </div>
        </InfographicFrame>
      );

    case "startup-lifecycle":
      return (
        <InfographicFrame title="스타트업 생애주기 4단계">
          <div className="relative">
            <div className="grid gap-px bg-border grid-cols-4">
              {[
                { k: "Start-up", d: "팀 구성·법인 설립·아이디어 검증" },
                { k: "Death Valley", d: "BM 부재로 자금난 — 60%+가 통과 실패", filled: true },
                { k: "Scale-up", d: "본격 성장·매출 궤도" },
                { k: "Growth-up", d: "IPO/M&A를 통한 Exit 준비" },
              ].map((s, idx) => (
                <div key={s.k} className={`p-6 ${s.filled ? "bg-foreground text-background" : "bg-background"}`}>
                  <p className={`text-[11px] font-semibold uppercase tracking-widest ${s.filled ? "text-background/60" : "text-muted-foreground"}`}>Stage {idx + 1}</p>
                  <p className={`mt-2 font-serif text-base font-bold ${s.filled ? "" : "text-foreground"}`}>{s.k}</p>
                  <p className={`mt-2 text-[13px] leading-relaxed ${s.filled ? "text-background/70" : "text-muted-foreground"}`}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </InfographicFrame>
      );

    case "investment-stage":
      return (
        <InfographicFrame title="투자 단계별 기업가치·투자 규모·투자자">
          <StackedTable
            headers={["단계", "기업가치", "투자 규모", "주요 투자자"]}
            rows={[
              ["Seed / Pre-A", "≤ 50억", "5~20억", "엔젤 · 정부 · TIPS · 액셀러레이터"],
              ["Series A / B", "100억~1,000억", "20~150억", "VC (매출·시장 확대 집중)"],
              ["Series C", "1,000억~5,000억", "200~1,000억", "대형 VC · PE · CVC"],
              ["Series D / 유니콘", "≥ 1조 원", "Pre-IPO 라운드", "글로벌 PE · SI · IPO 준비"],
            ]}
          />
          <p className="mt-6 text-center text-[12px] font-semibold uppercase tracking-widest text-gold">
            TIPS — 엑셀러레이터 1억 + 정부 R&D 5억 + 연계지원 4억 = 최대 10억
          </p>
        </InfographicFrame>
      );

    case "startup-valuation":
      return (
        <PhotoCaption
          image={startupImage}
          alt="스타트업 IR 미팅"
          tag="Startup Valuation"
          title="DCF가 어려운 초기 기업의 4가지 평가 기법"
          points={[
            { k: "투자 규모 역산", d: "목표 투자금·지분율로 Pre/Post Value 산정" },
            { k: "VC Method", d: "Exit 시점 손익·Multiple 예측 후 할인" },
            { k: "Berkus Method", d: "5개 성공 지표 × 최대 5억" },
            { k: "Scorecard", d: "비교 기업 대비 항목별 가중치 적용" },
          ]}
        />
      );

    case "tam-sam-som":
      return (
        <InfographicFrame title="시장 규모 분석 — TAM · SAM · SOM">
          <div className="grid items-center gap-8 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
            {/* Left: nested concentric circles with inline tier labels */}
            <div className="relative mx-auto aspect-square w-full max-w-[336px]">
              {/* TAM (outermost) */}
              <div className="absolute inset-0 rounded-full border border-foreground/30 bg-background" />
              {/* SAM */}
              <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/50 bg-section-alt/60" />
              {/* SOM (solid) */}
              <div className="absolute left-1/2 top-1/2 flex h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-foreground text-center text-background">
                <p className="font-serif text-xl font-bold tracking-wide">SOM</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-background/70">초기 확보 가능</p>
              </div>
              {/* Inline ring labels */}
              <p className="absolute left-1/2 top-[6%] -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                TAM
              </p>
              <p className="absolute left-1/2 top-[17%] -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                SAM
              </p>
            </div>

            {/* Right: tiered explanations, top→bottom = outer→inner */}
            <div className="flex flex-col gap-5">
              {[
                {
                  tag: "TAM",
                  ko: "비즈니스 도메인 전체",
                  d: "Total Addressable Market — 사업이 속한 전체 시장 규모. 이론적 최대치.",
                },
                {
                  tag: "SAM",
                  ko: "실제 타깃 시장",
                  d: "Service Available Market — 제품·서비스가 실제로 도달 가능한 유효 시장.",
                },
                {
                  tag: "SOM",
                  ko: "초기 확보 가능 시장",
                  d: "Service Obtainable Market — 초기 단계 점유 가능 시장. 매출 추정의 근거.",
                },
              ].map((row) => (
                <div key={row.tag} className="border-l-2 border-primary/70 pl-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-sm font-bold tracking-widest text-primary">{row.tag}</span>
                    <span className="text-sm font-bold text-foreground">{row.ko}</span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{row.d}</p>
                </div>
              ))}
            </div>
          </div>
        </InfographicFrame>
      );

    case "term-sheet":
      return (
        <InfographicFrame title="RCPS 기반 투자 계약 7대 핵심 조항">
          <div className="grid gap-px bg-border grid-cols-2">
            {[
              { k: "Put Option", d: "투자자의 지분 재매입 요구권 (대표 개인 의무 시 연대보증 효과 ⚠)", filled: true },
              { k: "Call Option", d: "회사·대주주의 지분 매입권 (스타트업에서 드물게 사용)" },
              { k: "Drag Along", d: "투자자 매각 시 다른 주주 동반 매각 권리" },
              { k: "Tag Along", d: "대주주 매각 시 투자자 동반 매도권" },
              { k: "리픽싱(Refixing)", d: "영업손익·공모가 미달 시 전환가 변동 — 안전장치" },
              { k: "우선매수권", d: "기존 주주의 우선 매입권 (First Refusal/Offer)" },
              { k: "Qualified IPO", d: "특정 시가총액 충족 IPO 의무 — 위반 시 Put Option 발동" },
            ].map((c) => (
              <div key={c.k} className={`p-5 ${c.filled ? "bg-foreground text-background" : "bg-background"}`}>
                <p className={`font-serif text-base font-bold ${c.filled ? "" : "text-foreground"}`}>{c.k}</p>
                <p className={`mt-2 text-[13px] leading-relaxed ${c.filled ? "text-background/70" : "text-muted-foreground"}`}>{c.d}</p>
              </div>
            ))}
          </div>
        </InfographicFrame>
      );

    case "real-estate-diff":
      return (
        <InfographicFrame title="부동산 M&A vs 일반 M&A의 3가지 차이">
          <div className="grid gap-px bg-border grid-cols-3">
            {[
              { k: "자산 = 가치", d: "부동산 시가가 기업 가치 대부분을 차지" },
              { k: "복잡한 세무", d: "직접 매매 vs 법인 주식 매매의 세금 완전 상이" },
              { k: "인허가·규제", d: "용도 변경·건축·환경 규제가 가치에 직접 영향" },
            ].map((c) => (
              <div key={c.k} className="bg-background p-6">
                <p className="font-serif text-lg font-bold text-foreground">{c.k}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </InfographicFrame>
      );

    case "noi-caprate":
      return (
        <InfographicFrame title="NOI 1억 개선 = 자산가치 20억 상승">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-px bg-border grid-cols-2">
              <div className="bg-background p-6 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">개선 전</p>
                <p className="mt-3 font-serif text-2xl font-bold text-foreground">200억 원</p>
                <p className="mt-2 text-[13px] text-muted-foreground">NOI 10억 ÷ Cap Rate 5%</p>
              </div>
              <div className="bg-foreground p-6 text-center text-background">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-background/60">개선 후</p>
                <p className="mt-3 font-serif text-2xl font-bold">220억 원</p>
                <p className="mt-2 text-[13px] text-background/70">NOI 11억 ÷ Cap Rate 5%</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 grid-cols-2">
              <div className="border border-border bg-background px-5 py-4">
                <p className="text-[12px] font-semibold uppercase tracking-widest text-gold">물리적 개선</p>
                <p className="mt-2 text-[13px] text-muted-foreground">리모델링 · 로비 · 에너지 효율</p>
              </div>
              <div className="border border-border bg-background px-5 py-4">
                <p className="text-[12px] font-semibold uppercase tracking-widest text-gold">운영적 개선</p>
                <p className="mt-2 text-[13px] text-muted-foreground">공실 충원 · 임대료 정상화 · MD 개편</p>
              </div>
            </div>
          </div>
        </InfographicFrame>
      );

    case "real-tax":
      return (
        <InfographicFrame title="부동산과다보유법인 판정 기준">
          <StackedTable
            headers={["요건", "부동산 비율", "양도 조건", "결과"]}
            rows={[
              ["일반 요건", "자산 중 50% 이상", "과점주주 50% 이상 양도", "기본세율 적용 (최대 49.5%)"],
              ["특정 업종 (골프장·스키장·휴양콘도)", "80% 이상", "1주만 양도해도 적용", "기본세율 적용"],
            ]}
          />
          <p className="mt-6 text-center text-[13px] text-muted-foreground">
            ⚠ 양도일 1년 이내 차입·증자로 늘린 현금은 자산총액에서 <span className="font-semibold text-foreground">제외</span> (인위적 비율 조작 방지)
          </p>
        </InfographicFrame>
      );

    case "golf":
      return (
        <PhotoCaption
          image={golfImage}
          alt="항공에서 본 골프장 전경"
          tag="Golf · Resort M&A"
          title="입지 · 회원권 · 운영 · 환경 인허가 종합 설계"
          points={[
            { k: "세무", d: "특정 업종 80% 요건 — 1주만 양도해도 기본세율" },
            { k: "회원권", d: "시장 수급·입지에 따라 가치 변동" },
            { k: "운영권", d: "서비스 사업 — 노하우·브랜드 가치" },
            { k: "환경", d: "농약·수질·생태계 규제 + 인허가 유지 조건" },
          ]}
        />
      );

    case "infra-pf":
      return (
        <PhotoCaption
          image={infraImage}
          alt="신재생에너지 인프라 단지"
          tag="Infrastructure & PF"
          title="장기·안정적 현금흐름 — 연기금 선호 자산군"
          points={[
            { k: "전통 인프라", d: "발전소·도로·항만·공항·철도" },
            { k: "신규 인프라", d: "태양광·풍력·폐기물·상하수도·데이터센터" },
            { k: "PF 구조", d: "기업 신용 X, 프로젝트 미래 현금흐름 담보" },
            { k: "글로벌 시장", d: "약 1조 2,000억 달러 · 평균 배당 3.7%" },
          ]}
        />
      );

    case "esg-green":
      return (
        <InfographicFrame title="ESG · 그린뉴딜이 만드는 M&A 기회">
          <div className="grid gap-px bg-border grid-cols-3">
            {[
              { k: "RE100", d: "Apple·BMW·Google·LG화학·SK하이닉스 등 280여 글로벌 기업 참여 → 협력업체 동참 요구" },
              { k: "국민연금 ESG", d: "ESG 투자를 전체 기금 자산의 절반 수준으로 확대 선언", filled: true },
              { k: "그린뉴딜 8대 과제", d: "공공시설 제로에너지화 · 스마트 그리드 · 전기·수소차 · 녹색 선도기업 육성" },
            ].map((c) => (
              <div key={c.k} className={`p-6 ${c.filled ? "bg-foreground text-background" : "bg-background"}`}>
                <p className={`font-serif text-lg font-bold ${c.filled ? "" : "text-foreground"}`}>{c.k}</p>
                <p className={`mt-3 text-[13px] leading-relaxed ${c.filled ? "text-background/70" : "text-muted-foreground"}`}>{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[12px] font-semibold uppercase tracking-widest text-gold">
            노후 건물 그린 리모델링 · 신재생 발전 프로젝트 · 친환경 건축물 개발
          </p>
        </InfographicFrame>
      );
  }
};

const MnaGuide = () => {
  const [activeSection, setActiveSection] = useState<string>(tableOfContents[0]);
  const { hash } = useLocation();

  const scrollToSection = (item: string) => {
    document.getElementById(item)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const sectionId = decodeURIComponent(hash.slice(1));
    if (!tableOfContents.includes(sectionId)) return;
    const t = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(t);
  }, [hash]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    tableOfContents.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative min-h-[260px] bg-primary pt-16 text-primary-foreground md:min-h-[480px] md:pt-28">
          <img
            src={heroImage}
            alt="M&A 자문 미팅 장면"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-primary/40" />
          <div className="container relative z-10 py-[64px] md:py-[120px]">
            <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold md:text-xs">
              <SectionIcon activeIndex={0} size={14} className="text-gold" />M&A Guide
            </p>
            <h1 className="font-serif text-[26px] font-bold leading-[1.3] md:text-5xl md:leading-[1.3]">M&A 이해하기</h1>
            <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-primary-foreground/80 md:mt-6 md:text-[16px]">
              KPMG M&A Center가 안내하는 기업 오너를 위한 M&A 종합 가이드입니다.
            </p>
          </div>
        </section>

        <section className="border-b border-border bg-section-alt">
          <div className="container grid gap-8 py-[56px] md:py-[80px] lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
            <aside className="hidden min-w-0 lg:sticky lg:top-24 lg:block lg:self-start">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gold md:mb-4 md:text-xs">Contents</p>
              <nav className="grid gap-2">
                {tableOfContents.map((item) => {
                  const isActive = activeSection === item;
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => scrollToSection(item)}
                      aria-current={isActive ? "location" : undefined}
                      className={`w-full border-l-2 px-4 py-[7px] text-left text-[13px] transition-colors ${
                        isActive
                          ? "border-gold font-semibold text-foreground"
                          : "border-border font-medium text-muted-foreground hover:border-gold hover:text-foreground"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </nav>
            </aside>

            <div className="min-w-0 space-y-16 md:space-y-24">
              {sections.map((section) => (
                <article key={section.title} id={section.title} className="min-w-0 scroll-mt-20 md:scroll-mt-24">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gold">{section.title}</p>
                  <h2 className="font-serif text-[24px] font-extrabold leading-tight text-foreground break-keep md:text-[32px]">
                    {section.copy}
                  </h2>

                  <div className="mt-6 border border-gold/30 bg-gold/5 p-5 md:mt-8 md:p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="inline-flex items-center justify-center bg-gold text-primary-foreground" style={{ width: 32, height: 32 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z" />
                        </svg>
                      </span>
                      <p className="font-serif text-base font-extrabold tracking-wide text-foreground">
                        KPMG Tip
                      </p>
                    </div>
                    <ul className="space-y-2.5 md:space-y-3">
                      {section.kpmgTip.map((tip, i) => (
                        <li key={i} className="flex gap-3 text-[13px] leading-[1.45] text-muted-foreground md:text-[14px] md:leading-[1.0]">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 bg-gold md:mt-2" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 min-w-0 space-y-10 md:mt-10 md:space-y-12">
                    {section.items.map((item, idx) => (
                      <div key={item.heading} className={`min-w-0 ${idx === 0 ? "pt-2" : "border-t border-border pt-6 md:pt-8"}`}>
                        <h3 className="font-serif text-[16px] font-bold leading-snug text-foreground md:text-[19px]">{item.heading}</h3>
                        <p className="mt-3 text-[14px] leading-[1.65] text-muted-foreground md:mt-4 md:text-[16px] md:leading-relaxed md:text-justify">{item.body}</p>
                        <div className="mt-5 min-w-0 md:mt-8">
                          <Infographic type={item.infographic} />
                        </div>
                        <div className="mt-5 flex flex-col gap-1.5 border-l-2 border-gold pl-3 text-[13px] leading-[1.5] text-muted-foreground md:mt-6 md:flex-row md:items-center md:gap-3 md:pl-4 md:leading-relaxed">
                          <span className="text-[11px] font-semibold uppercase tracking-widest text-gold md:text-[13px]">{item.noteTag ?? "KPMG"}</span>
                          <span>{item.note}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 border-y-2 border-primary py-7 md:mt-12 md:py-8">
                    <p className="mb-4 font-serif text-[17px] font-extrabold text-foreground md:mb-5 md:text-[19px]">
                      KPMG가 함께합니다
                    </p>
                    <div className="space-y-[10px]">
                      {section.kpmgWith.map((line, i) => (
                        <p key={i} className="font-serif text-[13px] leading-relaxed text-muted-foreground">
                          {line}
                        </p>
                      ))}
                    </div>
                    <a
                      href="/#contact"
                      className="mt-6 inline-flex items-center gap-2 bg-gold px-6 py-3 font-serif text-[13px] font-bold text-primary-foreground transition-colors hover:bg-gold/90"
                    >
                      KPMG에 문의하기
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}

              <article id="FAQ" className="scroll-mt-20 md:scroll-mt-24">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">FAQ</p>
                <h2 className="font-serif text-2xl font-extrabold text-foreground md:text-3xl">자주 묻는 질문</h2>
                <div className="mt-6 divide-y divide-border border-y border-border md:mt-8">
                  {faqs.map(([question, answer]) => (
                    <div key={question} className="grid gap-y-2 gap-x-10 py-5 md:grid-cols-[320px_1fr] md:gap-y-3 md:py-6">
                      <h3 className="font-serif text-[15px] font-bold text-foreground md:text-base">{question}</h3>
                      <p className="text-[13px] leading-relaxed text-muted-foreground md:text-sm">{answer}</p>
                    </div>
                  ))}
                </div>
              </article>

              <div className="bg-primary p-6 text-primary-foreground md:p-10">
                <h2 className="font-serif text-xl font-extrabold md:text-2xl">M&A 검토를 시작하고 싶으신가요?</h2>
                <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-primary-foreground/70 md:text-sm">
                  기업의 상황과 오너의 목표에 맞춰 매각, 투자유치, 승계, 부동산 거래까지 가장 적합한 전략을 함께 설계합니다.
                </p>
                <a
                  href="/#contact"
                  className="mt-6 inline-flex items-center gap-2 bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-gold/90"
                >
                  상담 요청하기
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile sticky bottom Contents nav */}
      <MobileContentsNav items={tableOfContents} activeSection={activeSection} />

      <Footer />
    </div>
  );
};

export default MnaGuide;
