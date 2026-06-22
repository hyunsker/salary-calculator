"use client";

import { useState, useMemo } from "react";
import {
  calculateUnemployment,
  monthlyToDaily,
  type AgeGroup,
  type InsurancePeriod,
} from "@/lib/unemploymentCalculator";
import AdPlaceholder from "./AdPlaceholder";

function fmt(n: number) {
  return n.toLocaleString("ko-KR");
}

const AGE_OPTIONS: { value: AgeGroup; label: string }[] = [
  { value: "under50", label: "50세 미만" },
  { value: "50to64", label: "50세 이상 ~ 65세 미만" },
  { value: "65plus", label: "65세 이상" },
];

const PERIOD_OPTIONS: { value: InsurancePeriod; label: string }[] = [
  { value: "1to3", label: "1년 미만 ~ 3년 미만" },
  { value: "3to5", label: "3년 이상 ~ 5년 미만" },
  { value: "5to10", label: "5년 이상 ~ 10년 미만" },
  { value: "over10", label: "10년 이상" },
];

export default function UnemploymentCalculator() {
  const [monthlyWage, setMonthlyWage] = useState(2_800_000);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("under50");
  const [insurancePeriod, setInsurancePeriod] = useState<InsurancePeriod>("1to3");
  const [employedMonths, setEmployedMonths] = useState(12);

  const dailyWage = useMemo(() => monthlyToDaily(monthlyWage), [monthlyWage]);

  const result = useMemo(
    () =>
      calculateUnemployment({ dailyWage, ageGroup, insurancePeriod, employedMonths }),
    [dailyWage, ageGroup, insurancePeriod, employedMonths]
  );

  const quickWages = [
    { label: "200만", value: 2_000_000 },
    { label: "250만", value: 2_500_000 },
    { label: "280만", value: 2_800_000 },
    { label: "350만", value: 3_500_000 },
    { label: "500만", value: 5_000_000 },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">실업급여 계산기</h1>
        <p className="text-sm text-gray-500 mt-1">
          구직급여 수급액 · 수급 기간 계산 · 2026년 기준
        </p>
      </div>

      <AdPlaceholder />

      {/* 입력 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-5">
        {/* 월 평균 임금 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            퇴직 전 월 평균 임금 (원)
          </label>
          <input
            type="number"
            value={monthlyWage}
            onChange={(e) => setMonthlyWage(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            min={0}
            step={100000}
          />
          <p className="text-xs text-gray-400 mt-1">
            {fmt(monthlyWage)}원 → 일평균 {fmt(dailyWage)}원
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {quickWages.map((q) => (
              <button
                key={q.value}
                onClick={() => setMonthlyWage(q.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  monthlyWage === q.value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* 나이 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            나이 (퇴직 시점 기준)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {AGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setAgeGroup(opt.value)}
                className={`py-2 rounded-xl text-xs font-medium transition-colors ${
                  ageGroup === opt.value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 고용보험 가입 기간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            고용보험 가입 기간 (전체 가입 기간 합산)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PERIOD_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setInsurancePeriod(opt.value)}
                className={`py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  insurancePeriod === opt.value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 이번 직장 고용보험 가입 기간 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            이번 직장 고용보험 가입 기간 (개월)
            <span className="text-xs text-gray-400 ml-1">수급 자격 확인용</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={36}
              value={employedMonths}
              onChange={(e) => setEmployedMonths(Number(e.target.value))}
              className="flex-1 accent-blue-500"
            />
            <span className="text-sm font-semibold text-gray-800 w-16 text-right">
              {employedMonths}개월
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1개월</span>
            <span className="text-blue-500 font-medium">6개월 이상 수급 가능</span>
            <span>36개월</span>
          </div>
        </div>
      </div>

      {/* 수급 자격 배너 */}
      {!result.isEligible ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-red-700">수급 자격 미충족</p>
          <p className="text-xs text-red-500 mt-1">
            이번 직장에서 고용보험 가입 기간이 180일(약 6개월) 이상이어야 합니다.
          </p>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-green-700">수급 자격 충족</p>
          <p className="text-xs text-green-600 mt-1">
            비자발적 퇴사 시 실업급여 신청 가능합니다.
          </p>
        </div>
      )}

      {/* 결과 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-500 mb-4">구직급여 계산 결과</h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <p className="text-xs text-blue-500 mb-1">1일 구직급여</p>
            <p className="text-xl font-bold text-blue-700">{fmt(result.dailyBenefit)}원</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center">
            <p className="text-xs text-purple-500 mb-1">수급 기간</p>
            <p className="text-xl font-bold text-purple-700">{result.benefitDays}일</p>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 text-center mb-4">
          <p className="text-xs text-green-600 mb-1">총 수급액 (예상)</p>
          <p className="text-2xl font-bold text-green-700">{fmt(result.totalBenefit)}원</p>
          <p className="text-xs text-green-500 mt-1">
            월 환산 약 {fmt(result.monthlyBenefit)}원
          </p>
        </div>

        <div className="space-y-2.5">
          <Row label="퇴직 전 월평균 임금" value={`${fmt(monthlyWage)}원`} />
          <Row label="일평균 임금" value={`${fmt(dailyWage)}원`} />
          <Row label="구직급여 지급률" value="60%" />
          <Row label="1일 상한액" value={`${fmt(result.dailyUpper)}원`} sub />
          <Row label="1일 하한액" value={`${fmt(result.dailyLower)}원`} sub />
          <div className="border-t border-gray-100 pt-2.5">
            <Row label="1일 구직급여" value={`${fmt(result.dailyBenefit)}원`} bold />
            <Row label="수급 기간" value={`${result.benefitDays}일`} bold />
          </div>
        </div>
      </div>

      {/* 안내 */}
      <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 space-y-1">
        <p className="font-medium text-gray-600">수급 조건 안내</p>
        <p>· 비자발적 퇴사(권고사직, 계약만료 등)에 해당해야 합니다.</p>
        <p>· 이직 전 18개월 중 고용보험 피보험 기간이 180일 이상이어야 합니다.</p>
        <p>· 적극적인 구직 활동을 해야 하며, 실업인정을 받아야 합니다.</p>
        <p>· 2026년 기준: 상한액 68,100원/일, 하한액 66,048원/일</p>
        <p>· 자세한 사항은 고용보험 홈페이지(www.ei.go.kr) 또는 고용센터에 문의하세요.</p>
      </div>

      <AdPlaceholder />
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  sub,
}: {
  label: string;
  value: string;
  bold?: boolean;
  sub?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center px-1 ${sub ? "pl-3" : ""}`}>
      <span
        className={`text-sm ${sub ? "text-gray-400" : bold ? "font-semibold text-gray-800" : "text-gray-600"}`}
      >
        {label}
      </span>
      <span
        className={`text-sm ${bold ? "font-bold text-gray-900" : sub ? "text-gray-400" : "text-gray-700"}`}
      >
        {value}
      </span>
    </div>
  );
}
