// 2026년 종합소득세 계산기 (단순경비율 방식, 연수입 2,400만원 미만 대상)

export interface IncomeTaxInput {
  annualRevenue: number; // 연수입 (원)
  industryCode: string; // 업종 코드
}

export interface IncomeTaxResult {
  annualRevenue: number;
  expenseRate: number; // 단순경비율 (%)
  expenses: number; // 필요경비 = 연수입 × 단순경비율
  taxableIncome: number; // 소득금액 = 연수입 - 필요경비
  basicDeduction: number; // 기본공제 (본인 150만원)
  standardDeduction: number; // 표준공제 (100만원, 사업소득)
  deductedIncome: number; // 과세표준
  incomeTax: number; // 종합소득세
  localIncomeTax: number; // 지방소득세 (10%)
  totalTax: number; // 총 세금
  effectiveTaxRate: number; // 실효세율 (%)
  netIncome: number; // 실수령 소득
  isEligible: boolean; // 단순경비율 적용 가능 여부 (2,400만원 미만)
}

// 2026년 종합소득세 세율 (누진세율)
const TAX_BRACKETS = [
  { limit: 14_000_000, rate: 0.06, deduction: 0 },
  { limit: 50_000_000, rate: 0.15, deduction: 1_260_000 },
  { limit: 88_000_000, rate: 0.24, deduction: 5_760_000 },
  { limit: 150_000_000, rate: 0.35, deduction: 15_440_000 },
  { limit: 300_000_000, rate: 0.38, deduction: 19_940_000 },
  { limit: 500_000_000, rate: 0.40, deduction: 25_940_000 },
  { limit: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
  { limit: Infinity, rate: 0.45, deduction: 65_940_000 },
];

// 업종별 단순경비율 (2026년, 국세청 고시 기준)
export const INDUSTRIES = [
  { code: "940909", label: "프리랜서 강사 / IT 개발자", rate: 64.1 },
  { code: "940100", label: "작가 / 작곡가 / 예술가", rate: 70.3 },
  { code: "940906", label: "번역 / 통역", rate: 64.1 },
  { code: "749900", label: "디자이너 / 사진작가", rate: 64.1 },
  { code: "940907", label: "유튜버 / 1인 미디어", rate: 64.1 },
  { code: "525101", label: "온라인 쇼핑몰 / 통신판매", rate: 87.3 },
  { code: "552101", label: "음식점 / 식당", rate: 89.7 },
  { code: "451101", label: "소매업 (의류 등)", rate: 87.3 },
  { code: "411100", label: "건설 / 인테리어 공사", rate: 74.1 },
  { code: "850101", label: "학원 / 교습소", rate: 69.3 },
  { code: "869100", label: "병원 / 의원 (의사)", rate: 52.6 },
  { code: "862100", label: "약국", rate: 76.0 },
  { code: "960906", label: "미용실 / 네일샵", rate: 73.7 },
  { code: "731201", label: "세무사 / 회계사 / 변호사", rate: 52.6 },
  { code: "other", label: "기타 업종", rate: 64.1 },
];

function calcIncomeTax(taxableBase: number): number {
  if (taxableBase <= 0) return 0;
  for (const bracket of TAX_BRACKETS) {
    if (taxableBase <= bracket.limit) {
      return Math.floor(taxableBase * bracket.rate - bracket.deduction);
    }
  }
  return 0;
}

export function calculateIncomeTax(input: IncomeTaxInput): IncomeTaxResult {
  const { annualRevenue, industryCode } = input;

  const industry = INDUSTRIES.find((i) => i.code === industryCode) ?? INDUSTRIES[INDUSTRIES.length - 1];
  const expenseRate = industry.rate / 100;
  const isEligible = annualRevenue < 24_000_000;

  const expenses = Math.floor(annualRevenue * expenseRate);
  const taxableIncome = Math.max(0, annualRevenue - expenses);

  // 공제: 기본공제 150만원 (본인) + 표준공제 100만원 (사업소득자)
  const basicDeduction = 1_500_000;
  const standardDeduction = 1_000_000;
  const totalDeduction = basicDeduction + standardDeduction;

  const deductedIncome = Math.max(0, taxableIncome - totalDeduction);

  const incomeTax = calcIncomeTax(deductedIncome);
  const localIncomeTax = Math.floor(incomeTax * 0.1);
  const totalTax = incomeTax + localIncomeTax;

  const effectiveTaxRate = annualRevenue > 0 ? (totalTax / annualRevenue) * 100 : 0;
  const netIncome = annualRevenue - totalTax;

  return {
    annualRevenue,
    expenseRate: industry.rate,
    expenses,
    taxableIncome,
    basicDeduction,
    standardDeduction,
    deductedIncome,
    incomeTax,
    localIncomeTax,
    totalTax,
    effectiveTaxRate,
    netIncome,
    isEligible,
  };
}
