// 2026년 최저시급: 10,320원
export const MINIMUM_WAGE_2026 = 10_320;

export interface MinimumWageResult {
  hourlyWage: number;       // 시급
  dailyWage: number;        // 일급
  weeklyWage: number;       // 주급 (주휴수당 포함)
  monthlyWage: number;      // 월급 (209시간 기준)
  weeklyAllowance: number;  // 주휴수당
  totalHoursPerWeek: number; // 주 총 시간 (주휴 포함)
  isMinimumWage: boolean;   // 최저시급 미달 여부
  isEligible: boolean;      // 주휴수당 발생 여부 (주 15시간 이상)
}

export function calculateMinimumWage(
  hourlyWage: number,
  dailyHours: number,
  weeklyDays: number
): MinimumWageResult {
  const weeklyWorkHours = dailyHours * weeklyDays;

  // 주휴수당: 주 15시간 이상 근무 시 발생
  // 주휴시간 = (주 근무시간 / 40) × 8
  const weeklyAllowanceHours =
    weeklyWorkHours >= 15 ? (weeklyWorkHours / 40) * 8 : 0;
  const weeklyAllowance = Math.floor(weeklyAllowanceHours * hourlyWage);

  const dailyWage = Math.floor(hourlyWage * dailyHours);
  const weeklyWage = Math.floor(hourlyWage * weeklyWorkHours) + weeklyAllowance;

  // 월급: (주 근무시간 + 주휴시간) × (365/7/12) ≈ ×(209/40) 방식
  // 표준: 월 소정근로시간 = (주 근무시간 + 주휴시간) × 4.345주
  const weeksPerMonth = 365 / 7 / 12;
  const totalWeeklyHours = weeklyWorkHours + weeklyAllowanceHours;
  const monthlyWage = Math.floor(hourlyWage * totalWeeklyHours * weeksPerMonth);

  return {
    hourlyWage,
    dailyWage,
    weeklyWage,
    monthlyWage,
    weeklyAllowance,
    totalHoursPerWeek: totalWeeklyHours,
    isMinimumWage: hourlyWage < MINIMUM_WAGE_2026,
    isEligible: weeklyWorkHours >= 15,
  };
}
