// Maps a free-text industry string to one of a small set of visual categories.
// Each category corresponds to one shared photo-realistic exterior image.

export type CaseCategory =
  | "office"
  | "hotel"
  | "logistics"
  | "datacenter"
  | "factory"
  | "chemical"
  | "energy"
  | "retail"
  | "fnb"
  | "healthcare"
  | "biotech"
  | "tech"
  | "finance"
  | "automotive"
  | "shipping"
  | "construction"
  | "media"
  | "waste"
  | "education"
  | "default";

export function getCaseCategory(industry: string): CaseCategory {
  const s = industry.toLowerCase();

  if (/(오피스|빌딩|상업용 부동산|부동산 임대|ref|리츠|타워|스퀘어)/.test(s) || /office/.test(s)) return "office";
  if (/(호텔|리조트|숙박)/.test(s) || /hotel/.test(s)) return "hotel";
  if (/(물류|창고|택배|운송|3pl)/.test(s) || /logistic|warehouse/.test(s)) return "logistics";
  if (/(데이터센터|idc|클라우드 인프라)/.test(s) || /data ?center/.test(s)) return "datacenter";
  if (/(반도체|디스플레이|편광|2차전지|배터리|소재|부품 제조|정밀|공작|기계 제조|금속|철강|제철|제강|화스너|주조|단조|플라스틱|고무|섬유|광물)/.test(s)) return "factory";
  if (/(화학|케미칼|특수 화학|정밀화학|폴리머|코팅|페인트)/.test(s)) return "chemical";
  if (/(lng|에너지|발전|재생에너지|태양광|풍력|연료전지|전력|ess|충전)/.test(s)) return "energy";
  if (/(유통|소매|편의점|쇼핑|커머스|이커머스|패션|화장품|뷰티|개인 및 가정용품)/.test(s)) return "retail";
  if (/(식품|급식|외식|구내식당|f&b|음료|식자재|레스토랑|주류)/.test(s) || /fnb|f&b/.test(s)) return "fnb";
  if (/(병원|의료|치과|의료기기|보철|정형외과|건강|진단|헬스케어)/.test(s)) return "healthcare";
  if (/(제약|바이오|의약품|신약|연구개발|생명과학|진단키트)/.test(s)) return "biotech";
  if (/(소프트웨어|it|정보서비스|플랫폼|인터넷|sass|saas|클라우드 솔루션|ai|인공지능|게임|디지털|광고 대행|마케팅 솔루션|핀테크)/.test(s)) return "tech";
  if (/(금융|은행|증권|보험|캐피탈|리스|자산운용|투자|벤처)/.test(s)) return "finance";
  if (/(자동차|모빌리티|전기차|차량|타이어)/.test(s)) return "automotive";
  if (/(해운|항공|공항|항만|선박|조선)/.test(s)) return "shipping";
  if (/(건설|건축|시공|토목|인프라|플랜트|엔지니어링)/.test(s)) return "construction";
  if (/(미디어|방송|콘텐츠|엔터테인먼트|영화|음반|스튜디오|광고)/.test(s)) return "media";
  if (/(폐기물|재활용|환경|수처리|상하수)/.test(s)) return "waste";
  if (/(교육|학원|학교|이러닝)/.test(s)) return "education";

  return "default";
}
