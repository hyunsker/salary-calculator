"use client";

import { useState, useMemo } from "react";
import { calculateWeeklyAllowance } from "@/lib/weeklyAllowanceCalculator";
import { MINIMUM_WAGE_2026 } from "@/lib/minimumWageCalculator";
import AdPlaceholder from "./AdPlaceholder";

export default function WeeklyAllowanceCalculator() {
  const [hourlyWage, setHourlyWage] = useState(MINIMUM_WAGE_2026);
  const [weeklyWorkHours, setWeeklyWorkHours] = useState(40);

  const result = useMemo(
    () => calculateWeeklyAllowance(hourlyWage, weeklyWorkHours),
    [hourlyWage, weeklyWorkHours]
  );

  return (
    <div className="max-w-lg mx-auto px-4 pb-12">
      <div className="pt-4 pb-3">
        <AdPlaceholder position="top" />
      </div>

      <header className="py-5">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          주휴수당 계산기
          <span className="text-blue-500"> 2026</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          주 15시간 이상 근무 시 발생 · 실질 시급 계산
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
          <button
            onClick={() => setHourlyWage(MINIMUM_WAGE_2026)}
            className="mt-2 text-xs text-blue-500 underline"
          >
            최저시급({MINIMUM_WAGE_2026.toLocaleString()}원)으로 설정
          </button>
        </div>

        {/* 주 근무시간 */}
        <div>
          <label className="block text-sm text-gray-500 mb-1.5">
            주 근무시간{" "}
            <span className={`text-xs font-medium ${result.isEligible ? "text-blue-500" : "text-red-400"}`}>
              {result.isEligible ? "(주휴수당 발생)" : "(주 15시간 미만 — 미발생)"}
            </span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={52}
              value={weeklyWorkHours}
              onChange={(e) => setWeeklyWorkHours(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-xl font-bold text-gray-900 w-16 text-right tabular-nums">
              {weeklyWorkHours}시간
            </span>
          </div>
          {/* 15시간 기준선 표시 */}
          <div className="relative mt-1">
            <div
              className="absolute text-xs text-red-400"
              style={{ left: `${((15 - 1) / (52 - 1)) * 100}%` }}
            >
              ↑15h
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[15, 20, 30, 40].map((h) => (
              <button
                key={h}
                onClick={() => setWeeklyWorkHours(h)}
                className={`py-1.5 rounded-lg border text-sm transition-colors ${
                  weeklyWorkHours === h
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
              >
                {h}시간
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 결과 */}
      <div className="space-y-4">
        {/* 주휴수당 강조 */}
        <div className={`rounded-2xl p-6 text-white shadow-md ${result.isEligible ? "bg-gradient-to-br from-blue-500 to-blue-600" : "bg-gray-400"}`}>
          <p className="text-white/80 text-sm font-medium mb-1">주휴수당</p>
          <p className="text-4xl font-bold tracking-tight">
            {result.isEligible
              ? `${result.weeklyAllowance.toLocaleString()}원`
              : "미발생"}
          </p>
          <p className="text-white/80 text-sm mt-2">
            {result.isEligible
              ? `주휴시간 ${result.weeklyAllowanceHours.toFixed(1)}시간`
              : "주 15시간 이상 근무 시 발생"}
          </p>
        </div>

        {/* 상세 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="text-base font-semibold text-gray-700">상세 내역</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {[
              { label: "시급", value: `${result.hourlyWage.toLocaleString()}원` },
              { label: "주 근무시간", value: `${result.weeklyWorkHours}시간` },
              { label: "주 근로수당", value: `${Math.floor(result.hourlyWage * result.weeklyWorkHours).toLocaleString()}원` },
              {
                label: "주휴수당",
                value: result.isEligible
                  ? `+${result.weeklyAllowance.toLocaleString()}원`
                  : "미발생",
                highlight: result.isEligible,
              },
              { label: "실질 시급 (주휴 포함)", value: `${result.effectiveHourlyWage.toLocaleString()}원` },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-gray-700">{row.label}</span>
                <span className={`text-sm font-medium tabular-nums ${row.highlight ? "text-blue-600" : "text-gray-800"}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 bg-gray-50 divide-y divide-gray-100">
            <div className="flex justify-between px-5 py-3.5">
              <span className="text-sm font-semibold text-gray-700">주급 합계</span>
              <span className="text-sm font-bold text-blue-600 tabular-nums">
                {result.weeklyTotal.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between px-5 py-3.5">
              <span className="text-sm font-semibold text-gray-700">월급 합계</span>
              <span className="text-sm font-bold text-blue-600 tabular-nums">
                {result.monthlyTotal.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4">
          <p className="text-sm text-blue-700 font-medium">주휴수당이란?</p>
          <p className="text-xs text-blue-600 mt-1 leading-relaxed">
            1주 동안 소정근로일을 개근한 근로자에게 유급으로 주어지는 하루치 임금입니다.
            주 15시간 이상 근무하면 사업장 규모와 관계없이 지급 의무가 있습니다.
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 leading-relaxed">
          실제 급여는 4대보험 공제 전 금액입니다.
        </p>
      </div>

      <div className="mt-8">
        <AdPlaceholder position="bottom" />
      </div>
    </div>
  );
}
