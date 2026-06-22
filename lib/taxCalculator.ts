// 2026년 기준 한국 근로소득 실수령액 계산기

export interface TaxResult {
  monthlyGross: number;       // 월 세전급여
  nationalPension: number;    // 국민연금
  healthInsurance: number;    // 건강보험
  longTermCare: number;       // 장기요양보험
  employmentInsurance: number; // 고용보험
  incomeTax: number;          // 소득세
  localIncomeTax: number;     // 지방소득세
  totalDeduction: number;     // 총 공제액
  netMonthly: number;         // 월 실수령액
}

// 근로소득공제 계산
function calcEarnedIncomeDeduction(annualSalary: number): number {
  if (annualSalary <= 5_000_000) {
    return annualSalary * 0.7;
  } else if (annualSalary <= 15_000_000) {
    return 3_500_000 + (annualSalary - 5_000_000) * 0.4;
  } else if (annualSalary <= 45_000_000) {
    return 7_500_000 + (annualSalary - 15_000_000) * 0.15;
  } else if (annualSalary <= 100_000_000) {
    return 12_000_000 + (annualSalary - 45_000_000) * 0.05;
  } else {
    return 14_750_000; // 한도
  }
}

// 누진세율 적용 산출세액 계산 (2026년 세율)
function calcProgressiveTax(taxBase: number): number {
  if (taxBase <= 0) return 0;

  const brackets = [
    { limit: 14_000_000, rate: 0.06, deduction: 0 },
    { limit: 50_000_000, rate: 0.15, deduction: 1_260_000 },
    { limit: 88_000_000, rate: 0.24, deduction: 5_760_000 },
    { limit: 150_000_000, rate: 0.35, deduction: 15_440_000 },
    { limit: 300_000_000, rate: 0.38, deduction: 19_940_000 },
    { limit: 500_000_000, rate: 0.40, deduction: 25_940_000 },
    { limit: 1_000_000_000, rate: 0.42, deduction: 35_940_000 },
    { limit: Infinity, rate: 0.45, deduction: 65_940_000 },
  ];

  for (const bracket of brackets) {
    if (taxBase <= bracket.limit) {
      return Math.floor(taxBase * bracket.rate - bracket.deduction);
    }
  }
  return 0;
}

// 근로소득 세액공제 계산
function calcEarnedIncomeTaxCredit(calculatedTax: number, annualSalary: number): number {
  let credit: number;
  if (calculatedTax <= 1_300_000) {
    credit = Math.floor(calculatedTax * 0.55);
  } else {
    credit = Math.floor(715_000 + (calculatedTax - 1_300_000) * 0.3);
  }

  // 한도 적용
  let limit: number;
  if (annualSalary <= 33_000_000) {
    limit = 740_000;
  } else if (annualSalary <= 70_000_000) {
    limit = Math.max(660_000, 740_000 - Math.floor((annualSalary - 33_000_000) * 0.008));
  } else {
    limit = 660_000;
  }

  return Math.min(credit, limit);
}

export function calculateSalary(annualSalary: number, dependents: number): TaxResult {
  const monthlyGross = Math.floor(annualSalary / 12);

  // 4대보험 계산 (월 기준)
  // 국민연금: 4.5%, 상한 590만원
  const pensionBase = Math.min(monthlyGross, 5_900_000);
  const nationalPension = Math.floor(pensionBase * 0.045);

  // 건강보험: 3.545% (2026년)
  const healthInsurance = Math.floor(monthlyGross * 0.03545);

  // 장기요양보험: 건강보험료 × 12.95% (2026년)
  const longTermCare = Math.floor(healthInsurance * 0.1295);

  // 고용보험: 0.9%
  const employmentInsurance = Math.floor(monthlyGross * 0.009);

  // 소득세 계산 (연간 기준)
  const earnedIncomeDeduction = calcEarnedIncomeDeduction(annualSalary);
  const earnedIncome = annualSalary - earnedIncomeDeduction;

  // 기본공제: 본인 150만원 + 부양가족 1인당 150만원
  const basicDeduction = (1 + dependents) * 1_500_000;

  const taxBase = Math.max(0, earnedIncome - basicDeduction);
  const calculatedTax = calcProgressiveTax(taxBase);
  const taxCredit = calcEarnedIncomeTaxCredit(calculatedTax, annualSalary);

  const annualIncomeTax = Math.max(0, calculatedTax - taxCredit);
  const incomeTax = Math.floor(annualIncomeTax / 12);

  // 지방소득세: 소득세 × 10%
  const localIncomeTax = Math.floor(incomeTax * 0.1);

  const totalDeduction =
    nationalPension +
    healthInsurance +
    longTermCare +
    employmentInsurance +
    incomeTax +
    localIncomeTax;

  const netMonthly = monthlyGross - totalDeduction;

  return {
    monthlyGross,
    nationalPension,
    healthInsurance,
    longTermCare,
    employmentInsurance,
    incomeTax,
    localIncomeTax,
    totalDeduction,
    netMonthly,
  };
}

export function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}
