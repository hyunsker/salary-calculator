// 퇴직금 계산기 (근로자퇴직급여보장법 기준)

export interface SeveranceResult {
  workDays: number;         // 총 근속일수
  workYears: number;        // 근속연수 (년)
  workMonths: number;       // 나머지 개월
  averageDailyWage: number; // 평균임금 (일)
  severancePay: number;     // 퇴직금
  isEligible: boolean;      // 수급 자격 (1년 이상)
}

export function calculateSeverance(
  monthlyWage: number,
  startDate: Date,
  endDate: Date
): SeveranceResult {
  const workDays = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const isEligible = workDays >= 365;

  const workYears = Math.floor(workDays / 365);
  const workMonths = Math.floor((workDays % 365) / 30);

  // 평균임금: 최근 3개월 임금 총액 / 3개월 총 일수 (92일 기준)
  const threeMonthTotal = monthlyWage * 3;
  const averageDailyWage = Math.floor(threeMonthTotal / 92);

  // 퇴직금 = 평균임금 × 30일 × (근속일수 / 365)
  const severancePay = isEligible
    ? Math.floor(averageDailyWage * 30 * (workDays / 365))
    : 0;

  return {
    workDays,
    workYears,
    workMonths,
    averageDailyWage,
    severancePay,
    isEligible,
  };
}

export function formatPeriod(years: number, months: number): string {
  if (years === 0) return `${months}개월`;
  if (months === 0) return `${years}년`;
  return `${years}년 ${months}개월`;
}
