import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Info, Mail } from "lucide-react";
import ResponsiveFilters from "@/components/ResponsiveFilters";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionIcon from "@/components/SectionIcon";
import heroImage from "@/assets/subpage-insights.jpg";
import insightImage1 from "@/assets/insight-1.jpg";
import insightImage2 from "@/assets/insight-2.jpg";
import insightImage3 from "@/assets/insight-3.jpg";
import exitStory1 from "@/assets/exit-story-1.jpg";
import exitStory2 from "@/assets/exit-story-2.jpg";
import exitStory3 from "@/assets/exit-story-3.jpg";
import exitStory4 from "@/assets/exit-story-4.jpg";

type InsightCategory = "reports" | "trends" | "exit-story" | "download";
type BodySection = { heading?: string; text: string };
type Insight = { slug: string; category: InsightCategory; label: string; title: string; fileName: string; image: string; description: string; summary: string[]; tags: string[]; email?: string; body?: BodySection[] };
type TabKey = InsightCategory;

const reports: Insight[] = [
  { slug: "k-beauty-rising-player", category: "reports", label: "KPMG 리포트", title: "글로벌 뷰티 트렌드를 견인하는 라이징 플레이어, K-뷰티", fileName: "Samjong_Insight_93_K_Beauty.pdf", image: insightImage1, description: "삼정KPMG 경제연구원이 발간한 K-뷰티 산업 트렌드 및 글로벌 확장성 분석 리포트입니다.", summary: ["K-뷰티 브랜드가 글로벌 뷰티 트렌드를 주도하는 배경과 소비자 변화 흐름을 요약합니다.", "브랜드 포트폴리오, 유통 채널, 해외 확장 전략 관점에서 M&A 및 투자 기회를 함께 검토합니다."], tags: ["K-뷰티", "M&A", "소비재"], body: [
    { text: "AI 에이전트가 상품 탐색부터 결제까지 알아서 끝내는 '에이전틱 결제'가 현실이 되고 있습니다." },
    { text: "빠르고 편하고 안전한 결제는 이제 차별화 요소가 아니라 기본값입니다. KPMG International이 글로벌 금융사와 유통·소비재 기업 각 500개사를 대상으로 진행한 조사에 따르면, 두 산업은 '결제 현대화'라는 같은 목적지를 향하면서도 서로 다른 지점을 바라보고 있었습니다." },
    { heading: "과제 인식의 어긋남", text: "유통•소비재 기업이 꼽은 최대 과제는 분산된 레거시 인프라(48%)와 소비자 데이터 접근성 부족(54%)입니다. 반면 금융사 응답은 각각 27%, 35%에 그쳐 20%p 안팎의 인식 차가 벌어졌습니다. 반대 방향의 미스매치도 있습니다. 금융사가 공들이는 국경 간 결제(40%)나 비용·수수료 투명성(56%)이 정작 유통사에게는 후순위 과제(각 4%, 22%)로 밀려 있습니다." },
    { heading: "결제 방식의 미스매치", text: "온도차가 가장 극명하게 드러나는 건 앞으로 도입할 결제 방식입니다. 유통사가 아직 부족하다고 보는 방식은 토큰화 결제(+38%p), BNPL(+25%p), 저장형 지갑(+24%p)입니다. 반대로 금융사가 공들여온 생체인식(-64%p), 인앱 결제(-48%p), 실시간 국경 간 결제(-39%p)는 유통사 우선순위에서 한참 밀려 있습니다. 금융의 공급과 유통의 수요가 서로 어긋난 방향을 가리키고 있는 셈입니다." },
    { heading: "생태계 구축이 승부처", text: "금융사 51%는 결제 산업의 미래 승자는 생태계를 구축하는 쪽이라고 답했습니다. 유통•소비재 기업 47%도 향후 5년 안에 여러 결제 서비스 기업과 손을 잡을 것으로 전망했습니다. 양자 협력을 넘어 핀테크•기술 제공사 규제 당국까지 아우르는 파트너십 자체가 곧 경쟁력이라는 얘기입니다." },
    { heading: "KPMG Take", text: "이런 구도는 결제 분야 M&A의 방향을 세 갈래로 시사합니다. 먼저 금융사는 수요-공급 미스매치를 메우기 위해 토큰화•BNPL 월렛 역량을 갖춘 타깃 인수에 나설 가능성이 높습니다. 둘째, 유통·소비재 기업은 자체 결제 인프라 현대화와 임베디드 파이낸스 구현을 위해 핀테크 볼트온(bolt-on)이나 결제 데이터 분석 솔루션에 대한 전략적 투자를 늘려갈 것으로 보입니다. 셋째, 생태계 경쟁 구조에서는 '단독 역량'보다 '역량 조합'이 밸류에이션을 가릅니다. 금융-유통 교차 영역의 딜 소싱과 포지셔닝 자문 수요도 이 흐름을 따라 확대될 것입니다." },
  ] },
  { slug: "electric-era-power-infra", category: "reports", label: "KPMG 리포트", title: "전력 인프라로 완성될 전기의 시대", fileName: "Samjong_Insight_92_Power_Infrastructure.pdf", image: insightImage2, description: "전력 인프라 수요 확대와 산업 전환이 기업 전략에 미치는 영향을 다룹니다.", summary: ["전기화 흐름 속 전력 인프라 투자의 중요성과 밸류체인 변화를 정리합니다.", "인프라, 에너지, 제조 섹터의 전략적 투자 및 파트너십 가능성을 제시합니다."], tags: ["전력", "인프라", "에너지"], body: [
    { text: "데이터센터, 전기차, 재생에너지가 동시에 폭발적으로 성장하면서 전력 수요는 과거 수십 년간 보지 못한 속도로 늘어나고 있습니다. 전력 인프라는 더 이상 후방 산업이 아니라 모든 산업의 핵심 변수로 떠올랐습니다." },
    { heading: "수요 폭증의 세 가지 축", text: "AI 데이터센터 전력 수요는 2030년까지 현재의 2~3배로 확대될 전망이며, 전기차 보급 확산과 산업 전기화가 더해지면서 전력망 부담은 임계점을 향해 가고 있습니다. 미국과 유럽의 주요 유틸리티 기업들은 이미 신규 송배전 투자 계획을 잇따라 상향 조정하고 있습니다." },
    { heading: "공급망 재편의 기회", text: "송배전 기자재, ESS, 변압기, 케이블, 전력 반도체 등 핵심 부품군에서 만성적 공급 부족이 나타나고 있습니다. 국내 중견 제조사들은 글로벌 수주 잔고가 사상 최고치를 경신하며, 전략적 투자자와 PE의 관심이 빠르게 집중되고 있습니다." },
    { heading: "KPMG Take", text: "전력 인프라는 향후 10년간 가장 구조적이고 가시성 높은 성장 테마 중 하나입니다. 기자재·EPC·O&M·재생에너지 자산 운용까지 밸류체인 전반에 걸쳐 M&A와 합작 기회가 이어질 것이며, 기술력과 레퍼런스를 확보한 기업의 가치 재평가가 본격화될 전망입니다." },
  ] },
  { slug: "liquid-consumption-trend", category: "reports", label: "KPMG 리포트", title: "소비 패러다임의 대전환기, 유통·소비재산업의 리퀴드 소비 트렌드", fileName: "Samjong_Insight_91_Liquid_Consumption.pdf", image: insightImage3, description: "유통·소비재 산업의 소비 패러다임 변화와 기업 대응 전략을 분석합니다.", summary: ["소비자 취향과 구매 방식이 빠르게 유동화되는 환경을 설명합니다.", "유통 채널 재편과 브랜드 경쟁력 강화를 위한 투자 방향을 정리합니다."], tags: ["유통", "소비재", "트렌드"], body: [
    { text: "소비자는 더 이상 한 브랜드, 한 채널, 한 카테고리에 머무르지 않습니다. 취향과 구매 행동이 액체처럼 흘러다니는 '리퀴드 소비(Liquid Consumption)' 시대가 본격화되고 있습니다." },
    { heading: "경계가 사라진 소비 행동", text: "동일한 소비자가 명품과 SPA, 프리미엄 식품과 할인 식품을 동시에 구매하는 양극화·다극화 행동이 일반화됐습니다. 가격·품질·가치 중 어느 하나로 설명되지 않는 복합 의사결정이 모든 카테고리에서 관찰됩니다." },
    { heading: "채널 재편과 D2C의 한계", text: "이커머스 침투율 정체와 함께 옴니채널 운영 역량이 다시 경쟁 우위로 부상하고 있습니다. D2C 단독 모델은 한계를 보이는 반면, 오프라인 거점·구독·라이브커머스를 결합한 하이브리드 모델이 성공 공식으로 자리 잡고 있습니다." },
    { heading: "KPMG Take", text: "유통·소비재 기업의 M&A는 카테고리 확장보다 '소비자 접점 확대'와 '데이터 자산 확보'를 축으로 재편되고 있습니다. 브랜드 포트폴리오 재구성, 유통 채널 통합, 데이터·AI 역량 인수가 향후 3년간 가장 활발한 거래 테마가 될 것으로 보입니다." },
  ] },
  { slug: "demographic-transformation", category: "reports", label: "KPMG 리포트", title: "저출생·고령화 인구 대변혁 시대, 기업은 무엇을 준비해야 하는가", fileName: "Samjong_Insight_90_Demographic_Change.pdf", image: insightImage1, description: "인구 구조 변화가 산업과 기업 경영 전략에 미치는 영향을 다룬 리포트입니다.", summary: ["저출생과 고령화가 수요 구조, 인력 운영, 산업 재편에 미치는 영향을 요약합니다.", "헬스케어, 소비재, 서비스 산업의 신규 기회와 리스크를 분석합니다."], tags: ["인구구조", "고령화", "전략"], body: [
    { text: "한국은 세계에서 가장 빠른 속도로 초고령사회에 진입하고 있습니다. 인구 구조 변화는 단순한 수요 감소가 아니라 산업 지형 전체의 재편을 의미합니다." },
    { heading: "수요 구조의 근본적 변화", text: "교육·육아·주거 등 청년·가족 중심 시장은 장기적 축소가 불가피한 반면, 헬스케어·시니어 케어·자산관리·반려동물·여가 시장은 구조적 성장 국면에 진입했습니다. 같은 산업 내에서도 타깃 세그먼트에 따라 성장률 격차가 극명하게 벌어지고 있습니다." },
    { heading: "노동력 부족과 자동화 가속", text: "생산가능인구 감소는 제조·서비스 전반의 인건비 상승과 자동화 투자 확대로 이어지고 있습니다. 로봇, AI, 자동화 솔루션 기업의 밸류에이션이 빠르게 재평가되고 있으며, 외국인 인력 운영 역량도 새로운 경쟁 변수로 떠올랐습니다." },
    { heading: "KPMG Take", text: "인구 변화는 향후 20년간 모든 산업의 가장 큰 상수입니다. 시니어 헬스케어, 자산관리, 자동화, 외국인 대상 서비스 등 구조적 성장 섹터에서 M&A·신사업 진출이 가속화될 것이며, 사양 시장에서는 통합·구조조정형 거래가 늘어날 전망입니다." },
  ] },
  { slug: "ai-healthcare-transformation", category: "reports", label: "KPMG 리포트", title: "AI로 촉발된 헬스케어 산업의 대전환", fileName: "Samjong_Insight_89_AI_Healthcare.pdf", image: insightImage2, description: "AI 도입으로 변화하는 헬스케어 산업과 투자 기회를 조망합니다.", summary: ["AI가 진단, 치료, 운영 효율화에 미치는 변화를 산업 관점에서 정리합니다.", "디지털 헬스케어와 의료 데이터 기반 기업의 성장 가능성을 분석합니다."], tags: ["AI", "헬스케어", "디지털"], body: [
    { text: "AI는 헬스케어 산업의 모든 영역을 동시에 흔들고 있습니다. 신약 개발, 영상 진단, 병원 운영, 보험 심사까지 변화의 범위와 속도 모두 과거 어떤 기술 도입과도 비교할 수 없습니다." },
    { heading: "신약 개발 사이클의 단축", text: "AI 기반 단백질 구조 예측과 후보 물질 탐색은 신약 개발 초기 단계의 비용과 시간을 획기적으로 줄이고 있습니다. 글로벌 빅파마는 AI 신약 개발 기업과의 라이선스·합작·인수 거래를 빠르게 확대하고 있습니다." },
    { heading: "디지털 헬스케어와 데이터 자산", text: "전자의무기록(EMR), 웨어러블, 유전체 데이터가 결합되면서 의료 데이터 자체가 핵심 자산으로 부상했습니다. 데이터 보유와 분석 역량을 갖춘 기업은 보험·제약·병원 산업의 전략적 인수 타깃이 되고 있습니다." },
    { heading: "KPMG Take", text: "AI 헬스케어 분야는 향후 5년간 가장 활발한 글로벌 M&A 테마가 될 것입니다. AI 신약, 영상 진단, 디지털 치료기기, 의료 데이터 플랫폼에서 전략적·재무적 투자자의 관심이 동시에 집중될 전망입니다." },
  ] },
  { slug: "software-defined-vehicle", category: "reports", label: "KPMG 리포트", title: "소프트웨어로 달리는 자동차, 완성차 업계가 꿈꾸는 미래", fileName: "Samjong_Insight_88_Software_Defined_Vehicle.pdf", image: insightImage3, description: "SDV 전환에 따른 자동차 산업의 기술·사업모델 변화를 분석합니다.", summary: ["완성차 업계가 하드웨어 중심에서 소프트웨어 중심으로 전환하는 흐름을 설명합니다.", "전장, 플랫폼, 데이터 기반 서비스 기업의 전략적 제휴 및 M&A 가능성을 살펴봅니다."], tags: ["자동차", "소프트웨어", "SDV"], body: [
    { text: "자동차는 이제 '바퀴 달린 컴퓨터'로 진화하고 있습니다. SDV(Software Defined Vehicle) 전환은 완성차 업계의 가치 사슬과 수익 모델을 근본부터 재구성하고 있습니다." },
    { heading: "차량 가치의 무게중심 이동", text: "차량의 핵심 가치가 엔진·플랫폼 같은 하드웨어에서 OS·앱·OTA 업데이트 같은 소프트웨어로 이동하고 있습니다. 완성차 OEM은 자체 OS 개발과 소프트웨어 인재 확보에 사상 최대 규모의 투자를 집행하고 있습니다." },
    { heading: "수익 구조의 다변화", text: "차량 판매 이후 구독·기능 활성화·데이터 기반 서비스로 이어지는 평생 수익(Lifetime Revenue) 모델이 본격화되고 있습니다. 일회성 판매에서 반복적 수익 구조로의 전환은 OEM 밸류에이션의 재평가로 이어지고 있습니다." },
    { heading: "KPMG Take", text: "SDV 전환은 OEM·전장·반도체·소프트웨어·통신을 가로지르는 대규모 합종연횡을 촉발할 것입니다. 차량용 OS, 자율주행 소프트웨어, 차량용 반도체, 인포테인먼트 플랫폼 기업이 향후 5년간 가장 매력적인 M&A 타깃 군으로 부상할 전망입니다." },
  ] },
];

const trends: Insight[] = [{ slug: "ma-trend-card-news", category: "trends", label: "M&A 트렌드", title: "글로벌 PE 투자 분석과 2026년 전망", fileName: "KPMG_Global_PE_Outlook_2026.pdf", image: insightImage3, description: "2025년 글로벌 PE 시장, 돈은 더 많이 풀렸는데 거래 건수는 오히려 줄었습니다. 이유는 하나 — PE 투자자들이 '많이'보다 '제대로'를 선택하기 시작했기 때문입니다. 역대 최대 수준인 1.7조 달러의 실탄을 쌓아둔 PE 운용사들이 2026년엔 본격적으로 집행에 나설 것으로 예상되는 만큼, AI·헬스케어·에너지 분야를 중심으로 시장이 다시 달아오를 것으로 보입니다.", summary: [], tags: ["PE", "글로벌", "2026 전망"], body: [
  { text: "2025년 글로벌 PE 시장은 돈은 더 많이 풀렸는데 거래 건수는 오히려 줄어든 한 해였습니다. PE 투자자들이 '많이'보다 '제대로'를 선택하기 시작했기 때문입니다." },
  { heading: "돈은 더 쏟아졌는데, 왜 거래는 줄었나", text: "2025년 PE 투자 규모는 2조 1,000억 달러로 4년 만의 최고치를 기록했지만 거래 건수는 2만 836건에서 1만 9,093건으로 감소했습니다. 빠른 다수의 딜 대신 확신이 서는 자산에 자본을 집중하는 '선별과 집중' 모드로의 전환이 본격화된 결과입니다." },
  { heading: "섹터별 지형도", text: "2025년 가장 뜨거웠던 섹터는 기술·미디어·통신(TMT)과 인프라입니다. TMT는 6,540억 달러로 투자 금액 1위를 기록했고, 인프라·운송 부문은 AI 인프라 수요 급증에 힘입어 거래 규모와 건수 모두 사상 최고치를 경신했습니다." },
  { heading: "펀드레이징과 엑시트의 엇갈림", text: "미국 PE 펀드레이징은 2,785억 달러로 10년 만의 최저치까지 급감한 반면, 글로벌 PE 엑시트 가치는 7,251억 달러로 10년 내 두 번째로 높은 수준을 기록했습니다. 검증된 대형 자산 위주의 선별적 회수만 이뤄지고 있음을 보여줍니다." },
  { heading: "2026년 전망", text: "2025년 말 기준 PE 업계의 드라이파우더는 1.7조 달러로 사상 최대치를 기록했습니다. 2026년에는 AI 관련 인프라, 에너지, 헬스케어, 금융서비스 분야에서 투자 활동이 특히 활발할 것으로 전망됩니다." },
  { heading: "KPMG Insight", text: "2025년 글로벌 PE 시장은 '선별과 집중'의 시대로 공식 진입했습니다. 역대 최대 드라이파우더와 함께 2026년은 준비된 자산에 자본이 몰리는 환경이 형성될 것이며, 이는 전략적 매각을 고민하는 오너에게 가장 유리한 시장 조건 중 하나입니다." },
] }];

const exitStories: Insight[] = [
  { slug: "exit-story-vol-01", category: "exit-story", label: "오너·승계·엑시트 인사이트", title: "Exit Story Vol.01 — 2세 승계 대신 매각을 선택한 제조 오너", fileName: "KPMG_Exit_Story_Vol01.pdf", image: exitStory1, description: "30년간 일군 정밀부품 기업을 글로벌 PE에 매각한 창업주의 의사결정 과정을 다룹니다.", summary: ["승계 후보자 부재와 산업 재편 흐름이 매각 검토의 출발점이 된 배경을 정리합니다.", "기업 가치 극대화를 위한 사전 준비와 KPMG 자문 과정의 핵심 포인트를 공유합니다."], tags: ["오너", "승계", "제조업"] },
  { slug: "exit-story-vol-02", category: "exit-story", label: "오너·승계·엑시트 인사이트", title: "Exit Story Vol.02 — 글로벌 전략적 투자자에게 매각한 K-뷰티 브랜드", fileName: "KPMG_Exit_Story_Vol02.pdf", image: exitStory2, description: "해외 진출 가속화를 위해 글로벌 SI를 파트너로 선택한 뷰티 브랜드 창업주의 이야기입니다.", summary: ["성장 단계별 자본 조달과 파트너 선정 전략을 사례 중심으로 정리합니다.", "딜 구조 설계와 협상 과정에서 오너가 지켜야 할 우선순위를 제시합니다."], tags: ["K-뷰티", "Exit Story", "글로벌"] },
  { slug: "exit-story-vol-03", category: "exit-story", label: "오너·승계·엑시트 인사이트", title: "Exit Story Vol.03 — PE와 손잡고 2차 성장에 나선 IT 서비스 기업", fileName: "KPMG_Exit_Story_Vol03.pdf", image: exitStory3, description: "지분 일부 매각을 통해 성장 자본을 확보한 IT 서비스 오너의 사례를 소개합니다.", summary: ["전량 매각이 아닌 부분 매각 구조를 선택한 이유와 거버넌스 설계 방안을 다룹니다.", "PE 파트너십을 통한 M&A 추가 확장 전략을 사례 기반으로 정리합니다."], tags: ["PE", "성장자본", "IT서비스"] },
  { slug: "exit-story-vol-04", category: "exit-story", label: "오너·승계·엑시트 인사이트", title: "Exit Story Vol.04 — 가족기업의 세대 교체와 신탁형 승계 설계", fileName: "KPMG_Exit_Story_Vol04.pdf", image: exitStory4, description: "가족기업의 안정적 승계와 자산 보호를 위한 신탁·지주회사 구조를 설계한 사례입니다.", summary: ["가족 간 갈등 최소화를 위한 거버넌스와 의사결정 구조를 정리합니다.", "세무·법률 자문을 통합한 KPMG의 승계 설계 프레임워크를 소개합니다."], tags: ["가족기업", "승계", "신탁"] },
];

const downloadReports: Insight[] = [
  { slug: "download-ma-outlook-2026", category: "download", label: "리포트 다운로드", title: "2026 글로벌 M&A 시장 전망 리포트", fileName: "KPMG_Global_MA_Outlook_2026.pdf", image: insightImage1, description: "산업별 거래 규모, 섹터별 핫이슈, 지역별 거래 동향을 종합한 연간 전망 리포트입니다.", summary: ["글로벌 M&A 거래량과 거래 가치 변화를 데이터 기반으로 정리합니다.", "AI, 헬스케어, 에너지 등 주요 섹터의 거래 트렌드와 전망을 제공합니다."], tags: ["M&A 전망", "글로벌", "리포트"], email: "ma_outlook@kr.kpmg.com" },
  { slug: "download-pe-trend-report", category: "download", label: "리포트 다운로드", title: "Private Equity 시장 동향 분기 리포트", fileName: "KPMG_PE_Quarterly_Report.pdf", image: insightImage3, description: "국내외 PE 펀드 결성, 투자, 회수 동향을 분기별로 정리한 정기 리포트입니다.", summary: ["분기별 PE 자금 흐름과 주요 거래 사례를 정리합니다.", "섹터별 투자 테마와 향후 회수 전략 시사점을 제공합니다."], tags: ["PE", "분기 리포트", "투자"], email: "pe_report@kr.kpmg.com" },
  { slug: "download-cross-border-ma", category: "download", label: "리포트 다운로드", title: "Cross-border M&A 실무 가이드", fileName: "KPMG_Cross_Border_MA_Guide.pdf", image: insightImage2, description: "국경 간 M&A 추진 시 반드시 점검해야 할 규제, 세무, 통합 이슈를 정리한 실무 가이드입니다.", summary: ["주요 국가별 외국인 투자 심사 및 규제 환경을 비교 정리합니다.", "딜 구조, 세무, PMI까지 단계별 체크리스트를 제공합니다."], tags: ["Cross-border", "규제", "PMI"], email: "crossborder@kr.kpmg.com" },
  { slug: "download-valuation-handbook", category: "download", label: "리포트 다운로드", title: "기업가치평가 실무 핸드북", fileName: "KPMG_Valuation_Handbook.pdf", image: insightImage1, description: "DCF, 멀티플, 옵션 모형 등 주요 기업가치평가 방법론을 사례와 함께 정리한 핸드북입니다.", summary: ["산업별 가치평가 시 자주 쓰이는 핵심 가정과 변수들을 정리합니다.", "실제 거래 사례에 기반한 평가 모델 적용 사례를 소개합니다."], tags: ["Valuation", "DCF", "핸드북"], email: "valuation@kr.kpmg.com" },
];

const allInsights = [...reports, ...trends, ...exitStories, ...downloadReports];

const TABS: { key: TabKey; label: string; items: Insight[] }[] = [
  { key: "reports", label: "KPMG 리포트", items: reports },
  { key: "trends", label: "M&A 트렌드", items: trends },
];

const Insights = () => {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState<TabKey>(() => {
    const stateTab = (location.state as { tab?: TabKey } | null)?.tab;
    if (stateTab && TABS.some((t) => t.key === stateTab)) return stateTab;
    const fromRoute = TABS.find((t) => t.key === category);
    return fromRoute?.key ?? "reports";
  });
  useEffect(() => {
    const stateTab = (location.state as { tab?: TabKey } | null)?.tab;
    if (stateTab && TABS.some((t) => t.key === stateTab)) setTab(stateTab);
  }, [location.state]);
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [privacyInfoOpen, setPrivacyInfoOpen] = useState(false);
  const [privacyInfoModalOpen, setPrivacyInfoModalOpen] = useState(false);
  const tagOptions = useMemo(() => Array.from(new Set(allInsights.flatMap((item) => item.tags))).sort(), []);
  const filterInsights = (items: Insight[]) => items.filter((item) =>
    `${item.title} ${item.description} ${item.fileName} ${item.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())
    && (selectedTags.length === 0 || item.tags.some((t) => selectedTags.includes(t)))
  );

  const detail = useMemo(() => {
    if (!category || !slug) return null;
    return allInsights.find((i) => i.category === category && i.slug === slug) ?? null;
  }, [category, slug]);

  useEffect(() => {
    if (detail) window.scrollTo({ top: 0, behavior: "auto" });
  }, [detail]);

  const activeTab = TABS.find((t) => t.key === tab) ?? TABS[0];
  const filteredItems = filterInsights(activeTab.items);

  if (detail) {
    const detailTab: TabKey = TABS.find((t) => t.key === detail.category)?.key ?? "reports";
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="relative min-h-[260px] bg-primary pt-16 text-primary-foreground md:min-h-[480px] md:pt-28">
            <img src={heroImage} alt="KPMG M&A insights and reports" className="absolute inset-0 h-full w-full object-cover opacity-50" width={1920} height={1080} />
            <div className="absolute inset-0 bg-primary/45" />
            <div className="container relative z-10 py-[64px] md:py-[120px]">
              <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold md:text-xs">
                <SectionIcon activeIndex={2} size={14} className="text-gold" />
                Insights
              </p>
              <h1 className="font-serif text-[26px] font-bold leading-[1.3] md:text-5xl md:leading-[1.3]">인사이트</h1>
              <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-primary-foreground/80 md:mt-6 md:text-[16px]">KPMG의 리포트와 M&A 트렌드, 오너 엑시트 스토리로 시장을 읽는 전문성을 제공합니다.</p>
            </div>
          </section>

          <TabNav tab={detailTab} onChange={(t) => navigate(`/insights`, { state: { tab: t } })} />

          <section className="bg-section-alt pb-[64px] pt-12 md:pb-[120px] md:pt-20">
            <div className="container">
              <div className="bg-background">
                <InsightDetailContent item={detail} />
              </div>
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => navigate(`/insights`, { state: { tab: detailTab } })}
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
          <img src={heroImage} alt="KPMG M&A insights and reports" className="absolute inset-0 h-full w-full object-cover opacity-50" width={1920} height={1080} />
          <div className="absolute inset-0 bg-primary/45" />
          <div className="container relative z-10 py-[64px] md:py-[120px]">
            <p className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold md:text-xs">
              <SectionIcon activeIndex={2} size={14} className="text-gold" />
              Insights
            </p>
            <h1 className="font-serif text-[26px] font-bold leading-[1.3] md:text-5xl md:leading-[1.3]">인사이트</h1>
            <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-primary-foreground/80 md:mt-6 md:text-[16px]">KPMG의 리포트와 M&A 트렌드, 오너 엑시트 스토리로 시장을 읽는 전문성을 제공합니다.</p>
          </div>
        </section>

        <TabNav tab={tab} onChange={(t) => { setTab(t); window.scrollTo({ top: 0, behavior: "auto" }); }} />

        <section className="bg-section-alt pb-[64px] pt-12 md:pb-[120px] md:pt-20">
          <div className="container">
            <div className="mb-5 md:mb-10">
              <h2 className="font-serif text-2xl md:text-[32px] font-extrabold leading-tight text-foreground">{activeTab.label}</h2>
              <ResponsiveFilters
                query={query}
                onQuery={setQuery}
                searchPlaceholder="검색"
                filters={[
                  { id: "tag", label: "태그", value: selectedTags, onChange: setSelectedTags, options: tagOptions },
                ]}
                onReset={() => { setSelectedTags([]); setQuery(""); }}
              />
            </div>
            <InsightGrid items={filteredItems} onSelect={(it) => navigate(`/insights/${it.category}/${it.slug}`)} />
          </div>
        </section>

        <section
          className="relative overflow-hidden bg-section-cta py-[64px] md:py-[120px] text-foreground"
          style={{
            backgroundImage:
              'linear-gradient(to right, hsl(var(--foreground) / 0.04) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.04) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        >
          <div className="container grid gap-8 md:grid-cols-[1fr_420px] md:items-center">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white">
                <Mail size={14} className="text-white" /> Report Download
              </p>
              <h2 className="font-serif text-2xl font-extrabold text-foreground md:text-4xl">
                KPMG의 최신 리포트를 받아보고 싶으신가요?<br />아래 이메일을 남겨주세요.
              </h2>
            </div>
            <form className="grid gap-3">
              <input type="email" placeholder="이메일 주소" className="h-12 border border-border bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground" />
              <button type="button" className="inline-flex h-12 items-center justify-center gap-2 bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-foreground/90">
                리포트 다운로드 신청<Download size={16} className="text-gold" />
              </button>
              <div className="flex items-center gap-1.5 pt-1 text-[12px] text-foreground">
                <label className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap">
                  <input type="checkbox" checked={privacyAgreed} onChange={(event) => setPrivacyAgreed(event.target.checked)} className="peer sr-only" />
                  <span className="grid h-3.5 w-3.5 place-items-center rounded-none border border-foreground/60 bg-background peer-checked:border-cta peer-checked:bg-cta">
                    <svg viewBox="0 0 12 12" className={`h-3 w-3 text-cta-foreground ${privacyAgreed ? "block" : "hidden"}`} aria-hidden="true">
                      <path d="M2 6.2 4.7 9 10 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  </span>
                  <span>개인정보 수집·이용에 동의합니다.</span>
                </label>
                <div className="relative" onMouseEnter={() => { if (window.innerWidth >= 768) setPrivacyInfoOpen(true); }} onMouseLeave={() => setPrivacyInfoOpen(false)}>
                  <button
                    type="button"
                    aria-label="개인정보 수집·이용 안내 보기"
                    aria-expanded={privacyInfoOpen || privacyInfoModalOpen}
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
                  {privacyInfoOpen && <PrivacyCollectionInfo className="absolute bottom-full left-0 z-30 mb-3 hidden w-[min(88vw,430px)] min-[768px]:block" />}
                </div>
              </div>
              {privacyInfoModalOpen && (
                <div role="dialog" aria-modal="true" aria-labelledby="insights-privacy-modal-title" className="fixed inset-0 z-50 grid place-items-center bg-[#0E1828]/55 p-5 min-[768px]:hidden" onClick={() => setPrivacyInfoModalOpen(false)}>
                  <div className="w-full max-w-[420px] bg-white p-5 shadow-[0_18px_50px_rgba(14,24,40,0.3)]" onClick={(event) => event.stopPropagation()}>
                    <div className="flex items-start justify-between gap-4">
                      <p id="insights-privacy-modal-title" className="font-serif text-[16px] font-bold text-[#1A3189]">개인정보 수집·이용 (필수)</p>
                      <button type="button" onClick={() => setPrivacyInfoModalOpen(false)} className="-mt-1 text-[20px] leading-none text-[#1A3189]" aria-label="개인정보 안내 닫기">×</button>
                    </div>
                    <PrivacyCollectionInfo className="mt-4" />
                    <button type="button" onClick={() => setPrivacyInfoModalOpen(false)} className="mt-5 w-full bg-[#1A3189] px-4 py-3 text-[13px] font-medium text-white">확인</button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const PrivacyCollectionInfo = ({ className = "" }: { className?: string }) => (
  <div className={`border border-[#1A3189]/20 bg-white p-4 text-left text-[#222] shadow-[0_12px_30px_rgba(14,24,40,0.16)] sm:p-5 ${className}`}>
    <p className="font-serif text-[14px] font-bold text-[#1A3189]">개인정보 수집·이용 (필수)</p>
    <div className="mt-3 overflow-hidden border border-[#1A3189]/25">
      <div className="grid grid-cols-[1.4fr_1fr_0.9fr] bg-[#F2F4F7] text-[10px] font-bold text-[#1A3189] sm:text-[11px]">
        <p className="border-r border-[#1A3189]/25 p-2.5">수집·이용 목적</p>
        <p className="border-r border-[#1A3189]/25 p-2.5">항목</p>
        <p className="p-2.5">보유기간</p>
      </div>
      <div className="grid grid-cols-[1.4fr_1fr_0.9fr] text-[10px] leading-relaxed text-[#3B4252] sm:text-[11px]">
        <p className="border-r border-t border-[#1A3189]/25 p-2.5">리포트 다운로드 신청 및 관련 안내</p>
        <p className="border-r border-t border-[#1A3189]/25 p-2.5">이메일</p>
        <p className="border-t border-[#1A3189]/25 p-2.5 font-semibold text-[#8C6B36]">확인 필요</p>
      </div>
    </div>
    <p className="mt-3 text-[10px] leading-relaxed text-[#5C6470]">동의를 거부할 권리가 있으나, 동의하지 않을 경우 리포트 다운로드 신청이 제한될 수 있습니다.</p>
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

const InsightGrid = ({ items, onSelect }: { items: Insight[]; onSelect: (item: Insight) => void }) => (
  <div className="grid gap-x-5 gap-y-5 bg-transparent md:grid-cols-2 lg:grid-cols-3">
    {items.map((item) => (
      <button
        key={item.slug}
        type="button"
        onClick={() => onSelect(item)}
        className="group relative flex flex-col bg-background p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_hsl(var(--foreground)/0.18)] hover:ring-1 hover:ring-gold/60"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">{item.label}</span>
        </div>
        <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-foreground line-clamp-2 min-h-[3.5rem]">{item.title}</h3>
        <div className="mt-4 aspect-[16/9] w-full overflow-hidden bg-section-alt">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            width={1280}
            height={720}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground line-clamp-3">{item.description}</p>
        <div className="mt-5 grid gap-3 bg-[#F6F7F9] p-4">
          <InsightInfo label="파일명" value={item.fileName} />
          <InsightInfo label="태그" value={item.tags.map((tag) => `#${tag}`).join("  ")} />
          {item.email && <InsightInfo label="문의" value={item.email} />}
        </div>
      </button>
    ))}
  </div>
);

const InsightDetailContent = ({ item }: { item: Insight }) => {
  const contactEmail = item.email ?? "ma_center@kr.kpmg.com";
  return (
    <div className="px-6 py-8 md:px-10 md:py-10">
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-gold px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">{item.label}</span>
        <span className="bg-gold px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">NEW</span>
        <span className="text-[11px] text-muted-foreground">인사이트</span>
      </div>
      <h2 className="mt-3 font-serif text-2xl font-extrabold leading-tight text-foreground md:text-[32px]">{item.title}</h2>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground md:text-[14px]">{item.description}</p>

      <div className="mt-8 aspect-[16/9] w-full overflow-hidden bg-section-alt">
        <img src={item.image} alt={item.title} loading="lazy" width={1280} height={720} className="h-full w-full object-cover" />
      </div>

      {item.body && item.body.length > 0 && (
        <div className="mt-10 space-y-5">
          {item.body.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h4 className="font-serif text-[15px] font-bold text-foreground md:text-base mb-2">{section.heading}</h4>
              )}
              <p className="text-[13px] leading-[1.8] text-muted-foreground md:text-[14px]">{section.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 border-t border-border pt-6 space-y-3 text-[13px]">
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <p className="font-semibold text-foreground">파일명</p>
          <p className="text-muted-foreground">{item.fileName}</p>
        </div>
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <p className="font-semibold text-foreground">태그</p>
          <p className="text-muted-foreground">{item.tags.map((tag) => `#${tag}`).join("  ")}</p>
        </div>
      </div>

    </div>
  );
};

const InsightInfo = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-[80px_1fr] items-center gap-3">
    <p className="text-[12px] font-semibold leading-4 text-muted-foreground">{label}</p>
    <p className="truncate text-[13px] leading-4 text-foreground" title={value}>{value}</p>
  </div>
);

export default Insights;
