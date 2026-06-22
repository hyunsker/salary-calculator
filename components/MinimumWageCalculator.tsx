"use client";

import { useState, useMemo } from "react";
import {
  calculateMinimumWage,
  MINIMUM_WAGE_2026,
} from "@/lib/minimumWageCalculator";
import AdPlaceholder from "./AdPlaceholder";

export default function MinimumWageCalculator() {
  const [hourlyWage, setHourlyWage] = useState(MINIMUM_WAGE_2026);
  const [dailyHours, setDailyHours] = useState(8);
  const [weeklyDays, setWeeklyDays] = useState(5);

  const result = useMemo(
    () => calculateMinimumWage(hourlyWage, dailyHours, weeklyDays),
    [hourlyWage, dailyHours, weeklyDays]
  );

  return (
    <div className="max-w-lg mx-auto px-4 pb-12">
      <div className="pt-4 pb-3">
        <AdPlaceholder position="top" />
      </div>

      <header className="py-5">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          최저시급 계산기
          <span className="text-blue-500"> 2026</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          2026년 최저시급 10,320원 기준 · 주휴수당 포함
        </p>
      </header>

      {/* 입력 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-5 mb-4">
        <h2 className="text-base font-semibold text-gray-700">근무 조건 입력</h2>

        {/* 시급 */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">시급</label>
          <div className="relative flex items-center">
            <input
              type="number"
              inputMode="numeric"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(Number(e.target.value))}
              className="w-full text-right text-2xl font-bold text-gray-900 border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="absolute right-4 text-gray-400 font-medium pointer-events-none">원</span>
          </div>
          {result.isMinimumWage && (
            <p className="text-xs text-red-500 mt-1">
              ⚠ 2026년 최저시급({MINIMUM_WAGE_2026.toLocaleString()}원) 미달입니다
            </p>
          )}
          <button
            onClick={() => setHourlyWage(MINIMUM_WAGE_2026)}
            className="mt-2 text-xs text-blue-500 underline"
          >
            최저시급({MINIMUM_WAGE_2026.toLocaleString()}원)으로 설정
          </button>
        </div>

        {/* 하루 근무시간 */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">
            하루 근무시간
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[4, 5, 6, 7, 8].map((h) => (
              <button
                key={h}
                onClick={() => setDailyHours(h)}
                className={`py-2 rounded-lg border text-sm font-medium transition-colors ${
                  dailyHours === h
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {h}시간
              </button>
            ))}
          </div>
          <input
            type="range"
            min={1}
            max={12}
            value={dailyHours}
            onChange={(e) => setDailyHours(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500 mt-3"
          />
          <p className="text-right text-xs text-gray-400 mt-1">직접 조절: {dailyHours}시간</p>
        </div>

        {/* 주 근무일수 */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">주 근무일수</label>
          <div className="grid grid-cols-6 gap-2">
            {[1, 2, 3, 4, 5, 6].map((d) => (
              <button
                key={d}
                onClick={() => setWeeklyDays(d)}
                className={`py-2 rounded-lg border text-sm font-medium transition-colors ${
                  weeklyDays === d
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {d}일
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 결과 */}
      <div className="space-y-4">
        {/* 월급 강조 */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-md">
          <p className="text-blue-100 text-sm font-medium mb-1">예상 월급</p>
          <p className="text-4xl font-bold tracking-tight">
            {result.monthlyWage.toLocaleString("ko-KR")}원
          </p>
          <p className="text-blue-100 text-sm mt-2">주휴수당 포함 기준</p>
        </div>

        {/* 상세 내역 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="text-base font-semibold text-gray-700">상세 내역</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { label: "시급", value: `${result.hourlyWage.toLocaleString()}원` },
              { label: "일급", value: `${result.dailyWage.toLocaleString()}원` },
              {
                label: `주휴수당 ${result.isEligible ? "(발생)" : "(미발생)"}`,
                value: result.isEligible
                  ? `${result.weeklyAllowance.toLocaleString()}원`
                  : "주 15시간 미만",
                sub: result.isEligible,
              },
              { label: "주급 (주휴 포함)", value: `${result.weeklyWage.toLocaleString()}원` },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
                <span className={`text-sm ${row.sub ? "text-blue-600" : "text-gray-700"}`}>
                  {row.label}
                </span>
                <span className={`text-sm font-medium tabular-nums ${row.sub ? "text-blue-600" : "text-gray-800"}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 bg-gray-50 px-5 py-3.5 flex justify-between">
            <span className="text-sm font-semibold text-gray-700">월급 합계</span>
            <span className="text-sm font-bold text-blue-600 tabular-nums">
              {result.monthlyWage.toLocaleString()}원
            </span>
          </div>
        </div>

        {!result.isEligible && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
            <p className="text-sm text-amber-700 font-medium">주휴수당 안내</p>
            <p className="text-xs text-amber-600 mt-1">
              주 15시간 이상 근무 시 주휴수당이 발생합니다. 현재 주{" "}
              {dailyHours * weeklyDays}시간 근무로 주휴수당이 적용되지 않습니다.
            </p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 leading-relaxed">
          실제 급여는 4대보험 공제 전 금액입니다. 월 소정근로시간은 4.345주 기준으로 계산됩니다.
        </p>
      </div>

      <div className="mt-8">
        <AdPlaceholder position="bottom" />
      </div>
    </div>
  );
}
