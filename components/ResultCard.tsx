import { TaxResult, formatKRW } from "@/lib/taxCalculator";

interface ResultCardProps {
  result: TaxResult;
}

interface DeductionRow {
  label: string;
  amount: number;
  sublabel?: string;
  highlight?: boolean;
}

export default function ResultCard({ result }: ResultCardProps) {
  const deductions: DeductionRow[] = [
    {
      label: "국민연금",
      amount: result.nationalPension,
      sublabel: "4.5%",
    },
    {
      label: "건강보험",
      amount: result.healthInsurance,
      sublabel: "3.545%",
    },
    {
      label: "장기요양보험",
      amount: result.longTermCare,
      sublabel: "건강보험료×12.95%",
    },
    {
      label: "고용보험",
      amount: result.employmentInsurance,
      sublabel: "0.9%",
    },
    {
      label: "소득세",
      amount: result.incomeTax,
    },
    {
      label: "지방소득세",
      amount: result.localIncomeTax,
      sublabel: "소득세×10%",
    },
  ];

  const netRatio =
    result.monthlyGross > 0
      ? Math.round((result.netMonthly / result.monthlyGross) * 100)
      : 0;

  return (
    <div className="space-y-4">
      {/* 월 실수령액 강조 카드 */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-md">
        <p className="text-blue-100 text-sm font-medium mb-1">월 실수령액</p>
        <p className="text-4xl font-bold tracking-tight">
          {formatKRW(result.netMonthly)}
        </p>
        <div className="mt-3 flex items-center gap-3 text-blue-100 text-sm">
          <span>세전 {formatKRW(result.monthlyGross)}</span>
          <span>·</span>
          <span>실수령률 {netRatio}%</span>
        </div>

        {/* 진행 바 */}
        <div className="mt-3 bg-blue-400/40 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${netRatio}%` }}
          />
        </div>
      </div>

      {/* 공제 내역 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="text-base font-semibold text-gray-700">공제 항목 내역</h2>
          <p className="text-xs text-gray-400 mt-0.5">2026년 기준</p>
        </div>

        <div className="divide-y divide-gray-50">
          {deductions.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-5 py-3.5"
            >
              <div>
                <span className="text-sm text-gray-700">{row.label}</span>
                {row.sublabel && (
                  <span className="text-xs text-gray-400 ml-1.5">
                    ({row.sublabel})
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-gray-800 tabular-nums">
                -{row.amount.toLocaleString("ko-KR")}원
              </span>
            </div>
          ))}
        </div>

        {/* 합계 행 */}
        <div className="border-t border-gray-200 bg-gray-50 divide-y divide-gray-100">
          <div className="flex items-center justify-between px-5 py-3.5">
            <span className="text-sm font-semibold text-gray-700">총 공제액</span>
            <span className="text-sm font-bold text-red-500 tabular-nums">
              -{result.totalDeduction.toLocaleString("ko-KR")}원
            </span>
          </div>
          <div className="flex items-center justify-between px-5 py-3.5">
            <span className="text-sm font-semibold text-gray-700">월 세전급여</span>
            <span className="text-sm font-medium text-gray-800 tabular-nums">
              {result.monthlyGross.toLocaleString("ko-KR")}원
            </span>
          </div>
        </div>
      </div>

      {/* 연간 환산 */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 px-5 py-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-600">연간 환산</h3>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">연간 실수령액</span>
          <span className="font-bold text-gray-800 tabular-nums">
            {formatKRW(result.netMonthly * 12)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">연간 총 공제액</span>
          <span className="font-medium text-red-400 tabular-nums">
            -{formatKRW(result.totalDeduction * 12)}
          </span>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 px-4 leading-relaxed">
        본 계산기는 근로소득 간이세액표 방식으로 계산됩니다. 실제 공제액은
        회사 급여 규정, 비과세 항목 등에 따라 달라질 수 있습니다.
      </p>
    </div>
  );
}
