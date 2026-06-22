// 주휴수당 계산기 (2026년 기준)

export interface WeeklyAllowanceResult {
  hourlyWage: number;          // 시급
  weeklyWorkHours: number;     // 주 근무시간
  isEligible: boolean;         // 주휴수당 발생 여부 (주 15시간 이상)
  weeklyAllowanceHours: number; // 주휴시간
  weeklyAllowance: number;     // 주휴수당
  effectiveHourlyWage: number; // 실질 시급 (주휴 포함)
  weeklyTotal: number;         // 주급 합계 (근로수당 + 주휴수당)
  monthlyTotal: number;        // 월 합계
}

export function calculateWeeklyAllowance(
  hourlyWage: number,
  weeklyWorkHours: number
): WeeklyAllowanceResult {
  const isEligible = weeklyWorkHours >= 15;

  // 주휴시간 = (주 근무시간 / 40) × 8
  const weeklyAllowanceHours = isEligible ? (weeklyWorkHours / 40) * 8 : 0;
  const weeklyAllowance = Math.floor(weeklyAllowanceHours * hourlyWage);

  const weeklyWorkPay = Math.floor(hourlyWage * weeklyWorkHours);
  const weeklyTotal = weeklyWorkPay + weeklyAllowance;

  const weeksPerMonth = 365 / 7 / 12;
  const monthlyTotal = Math.floor(weeklyTotal * weeksPerMonth);

  // 실질 시급 = 주급 합계 / 주 근무시간
  const effectiveHourlyWage =
    weeklyWorkHours > 0
      ? Math.floor(weeklyTotal / weeklyWorkHours)
      : hourlyWage;

  return {
    hourlyWage,
    weeklyWorkHours,
    isEligible,
    weeklyAllowanceHours,
    weeklyAllowance,
    effectiveHourlyWage,
    weeklyTotal,
    monthlyTotal,
  };
}
