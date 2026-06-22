// 2026년 실업급여(구직급여) 계산기

export type AgeGroup = "under50" | "50to64" | "65plus";
export type InsurancePeriod =
  | "1to3"    // 1년 미만 ~ 3년 미만
  | "3to5"    // 3년 이상 ~ 5년 미만
  | "5to10"   // 5년 이상 ~ 10년 미만
  | "over10"; // 10년 이상

export interface UnemploymentInput {
  dailyWage: number;      // 일평균 임금 (원)
  ageGroup: AgeGroup;
  insurancePeriod: InsurancePeriod;
  employedMonths: number; // 고용보험 가입 기간 (개월 수, 내부 검증용)
}

export interface UnemploymentResult {
  dailyWage: number;
  dailyBenefit: number;  // 1일 구직급여액
  benefitDays: number;   // 수급 기간 (일)
  totalBenefit: number;  // 총 수급액
  dailyUpper: number;    // 상한액
  dailyLower: number;    // 하한액
  isEligible: boolean;   // 수급 요건 충족 여부 (180일 이상)
  monthlyBenefit: number; // 월 환산 금액 (30일 기준)
}

// 2026년 기준
const DAILY_UPPER = 68_100; // 1일 상한액
const DAILY_LOWER = 66_048; // 1일 하한액 (2026년 최저임금 10,320원 × 8시간 × 80%)

// 수급 기간 테이블 (일) - 나이 × 고용보험 가입 기간
// 출처: 고용보험법 시행령 별표1
const BENEFIT_DAYS: Record<AgeGroup, Record<InsurancePeriod, number>> = {
  under50: {
    "1to3":  120,
    "3to5":  150,
    "5to10": 180,
    over10:  210,
  },
  "50to64": {
    "1to3":  120,
    "3to5":  180,
    "5to10": 210,
    over10:  240,
  },
  "65plus": {
    "1to3":  120,
    "3to5":  180,
    "5to10": 210,
    over10:  240,
  },
};

export function calculateUnemployment(input: UnemploymentInput): UnemploymentResult {
  const { dailyWage, ageGroup, insurancePeriod, employedMonths } = input;

  // 수급 자격: 고용보험 가입 180일 이상
  const isEligible = employedMonths >= 6; // 6개월 ≈ 180일

  const benefitDays = BENEFIT_DAYS[ageGroup][insurancePeriod];

  // 1일 구직급여 = 일평균 임금 × 60%
  const rawDaily = Math.floor(dailyWage * 0.6);

  // 상·하한 적용
  const dailyBenefit = Math.min(DAILY_UPPER, Math.max(DAILY_LOWER, rawDaily));

  const totalBenefit = dailyBenefit * benefitDays;
  const monthlyBenefit = dailyBenefit * 30;

  return {
    dailyWage,
    dailyBenefit,
    benefitDays,
    totalBenefit,
    dailyUpper: DAILY_UPPER,
    dailyLower: DAILY_LOWER,
    isEligible,
    monthlyBenefit,
  };
}

// 월급 → 일평균 임금 환산 (30일 기준)
export function monthlyToDaily(monthly: number): number {
  return Math.floor(monthly / 30);
}
