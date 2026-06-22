"use client";

import { useState, useMemo } from "react";
import { calculateSeverance, formatPeriod } from "@/lib/severanceCalculator";
import AdPlaceholder from "./AdPlaceholder";

function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default function SeveranceCalculator() {
  const today = new Date();
  const threeYearsAgo = new Date(today);
  threeYearsAgo.setFullYear(today.getFullYear() - 3);

  const [monthlyWage, setMonthlyWage] = useState(3_000_000);
  const [startDate, setStartDate] = useState(toDateInputValue(threeYearsAgo));
  const [endDate, setEndDate] = useState(toDateInputValue(today));

  const result = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) return null;
    return calculateSeverance(monthlyWage, start, end);
  }, [monthlyWage, startDate, endDate]);

  return (
    <div className="max-w-lg mx-auto px-4 pb-12">
      <div className="pt-4 pb-3">
        <AdPlaceholder position="top" />
      </div>

      <header className="py-5">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          퇴직금 계산기
          <span className="text-blue-500"> 2026</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          근로자퇴직급여보장법 기준 · 1년 이상 근무 시 발생
        </p>
      </header>

      {/* 입력 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-5 mb-4">
        <h2 className="text-base font-semibold text-gray-700">근무 정보 입력</h2>

        {/* 월급여 */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">
            월 급여 <span className="text-xs text-gray-400">(세전, 상여금 미포함)</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="number"
              inputMode="numeric"
              value={monthlyWage}
              onChange={(e) => setMonthlyWage(Number(e.target.value))}
              className="w-full text-right text-2xl font-bold text-gray-900 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="absolute right-4 text-gray-400 font-medium pointer-events-none">원</span>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[2000000, 3000000, 4000000, 5000000].map((v) => (
              <button
                key={v}
                onClick={() => setMonthlyWage(v)}
                className={`text-sm py-1.5 rounded-lg border transition-colors ${
                  monthlyWage === v
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {(v / 10000).toLocaleString()}만
              </button>
            ))}
          </div>
        </div>

        {/* 입사일 */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">입사일</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* 퇴사일 */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">퇴사일</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      {/* 결과 */}
      {result ? (
        <div className="space-y-4">
          {/* 퇴직금 강조 */}
          <div className={`rounded-2xl p-6 text-white shadow-md ${result.isEligible ? "bg-gradient-to-br from-blue-500 to-blue-600" : "bg-gray-400"}`}>
            <p className="text-white/80 text-sm font-medium mb-1">퇴직금</p>
            <p className="text-4xl font-bold tracking-tight">
              {result.isEligible
                ? `${result.severancePay.toLocaleString()}원`
                : "미발생"}
            </p>
            <p className="text-white/80 text-sm mt-2">
              근속기간 {formatPeriod(result.workYears, result.workMonths)}
              {!result.isEligible && " (1년 미만)"}
            </p>
          </div>

          {/* 상세 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h2 className="text-base font-semibold text-gray-700">계산 내역</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {[
                { label: "근속일수", value: `${result.workDays.toLocaleString()}일` },
                { label: "근속기간", value: formatPeriod(result.workYears, result.workMonths) },
                { label: "월 급여", value: `${monthlyWage.toLocaleString()}원` },
                { label: "평균임금 (일)", value: `${result.averageDailyWage.toLocaleString()}원` },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-sm text-gray-700">{row.label}</span>
                  <span className="text-sm font-medium text-gray-800 tabular-nums">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-5 py-3.5 flex justify-between">
              <span className="text-sm font-semibold text-gray-700">퇴직금 합계</span>
              <span className={`text-sm font-bold tabular-nums ${result.isEligible ? "text-blue-600" : "text-gray-400"}`}>
                {result.isEligible ? `${result.severancePay.toLocaleString()}원` : "미발생"}
              </span>
            </div>
          </div>

          {!result.isEligible && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
              <p className="text-sm text-amber-700 font-medium">퇴직금 발생 조건 미충족</p>
              <p className="text-xs text-amber-600 mt-1">
                퇴직금은 1년(365일) 이상 근무해야 발생합니다. 현재 근속일수: {result.workDays}일
              </p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4">
            <p className="text-sm text-blue-700 font-medium">계산 방식</p>
            <p className="text-xs text-blue-600 mt-1 leading-relaxed">
              퇴직금 = 평균임금 × 30일 × (근속일수 ÷ 365)<br />
              평균임금 = 최근 3개월 급여 합계 ÷ 92일
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 leading-relaxed">
            상여금, 연차수당 등을 포함하면 실제 퇴직금이 달라질 수 있습니다.
          </p>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">입사일과 퇴사일을 입력하면 퇴직금이 계산됩니다</p>
        </div>
      )}

      <div className="mt-8">
        <AdPlaceholder position="bottom" />
      </div>
    </div>
  );
}
