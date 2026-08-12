// Maps category/tag strings to KPMG secondary palette tokens.
// Use as text color (e.g. style={{ color: getCategoryColor(tag) }}).
const PALETTE = {
  blue: "hsl(var(--kpmg-blue))",
  blueMedium: "hsl(var(--kpmg-blue-medium))",
  blueLight: "hsl(var(--kpmg-blue-light))",
  violet: "hsl(var(--kpmg-violet))",
  purple: "hsl(var(--kpmg-purple))",
  purpleLight: "hsl(var(--kpmg-purple-light))",
  green: "hsl(var(--kpmg-green))",
  gold: "hsl(var(--gold))",
} as const;

export function getCategoryColor(tag: string): string {
  const s = tag.toLowerCase();
  // 부동산·오피스
  if (/(부동산|오피스|빌딩|상업|호텔|리조트|리테일|유통)/.test(tag)) return PALETTE.blueMedium;
  // 제조·플랜트·산업
  if (/(제조|플랜트|기계|장비|소재|부품|반도체|배터리|화학|industry|industrial)/i.test(tag)) return PALETTE.violet;
  // 물류·인프라·환경
  if (/(물류|창고|운송|인프라|환경|폐기물|재활용)/.test(tag)) return PALETTE.green;
  // 에너지·발전
  if (/(에너지|발전|sustainability|climate|esg)/i.test(tag)) return PALETTE.green;
  // 금융·투자·M&A
  if (/(금융|투자|deal|m&a|trends?|finance)/i.test(tag)) return PALETTE.blue;
  // 기술·미디어·소비재
  if (/(테크|tech|ai|디지털|미디어|컨텐츠|소비|뷰티|패션|fnb|f&b)/i.test(tag)) return PALETTE.purple;
  // 비즈니스·산업 분석
  if (/(business|focus|insight|report|analysis)/i.test(tag)) return PALETTE.purpleLight;
  return PALETTE.gold;
}
