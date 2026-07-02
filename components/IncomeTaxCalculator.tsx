"use client";

import { useState, useMemo } from "react";
import {
  calculateIncomeTax,
  INDUSTRIES,
} from "@/lib/incomeTaxCalculator";
import AdPlaceholder from "./AdPlaceholder";

function fmt(n: number) {
  return n.toLocaleString("ko-KR");
}

export default function IncomeTaxCalculator() {
  const [annualRevenue, setAnnualRevenue] = useState(20_000_000);
  const [industryCode, setIndustryCode] = useState("940909");

  const result = useMemo(
    () => calculateIncomeTax({ annualRevenue, industryCode }),
    [annualRevenue, industryCode]
  );

  const quickAmounts = [
    { label: "1천만", value: 10_000_000 },
    { label: "1.5천만", value: 15_000_000 },
    { label: "2천만", value: 20_000_000 },
    { label: "3천만", value: 30_000_000 },
    { label: "5천만", value: 50_000_000 },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">종합소득세 계산기</h1>
        <p className="text-sm text-gray-500 mt-1">
          프리랜서 · 1인 사업자 대상 · 단순경비율 방식 · 2026년 기준
        </p>
      </div>

      <AdPlaceholder />

      {/* 입력 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-5">
        {/* 업종 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            업종 선택
          </label>
          <select
            value={industryCode}
            onChange={(e) => setIndustryCode(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          >
            {INDUSTRIES.map((ind) => (
              <option key={ind.code} value={ind.code}>
                {ind.label} (단순경비율 {ind.rate}%)
              </option>
            ))}
          </select>
        </div>

        {/* 연수입 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            연수입 (원)
          </label>
          <input
            type="number"
            value={annualRevenue}
            onChange={(e) => setAnnualRevenue(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            min={0}
            step={1000000}
          />
          <p className="text-xs text-gray-400 mt-1">
            {fmt(annualRevenue)}원
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {quickAmounts.map((q) => (
              <button
                key={q.value}
                onClick={() => setAnnualRevenue(q.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  annualRevenue === q.value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* 단순경비율 안내 */}
        {!result.isEligible && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs text-amber-700 font-medium">
              ⚠️ 연수입 2,400만원 이상은 기준경비율 또는 장부 방식 적용 대상입니다.
              참고용 계산치이며, 정확한 신고를 위해 세무사 상담을 권장합니다.
            </p>
          </div>
        )}
      </div>

      {/* 결과 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-500 mb-4">세금 계산 결과</h2>

        {/* 핵심 결과 */}
        <div className="bg-blue-50 rounded-xl p-4 mb-4 text-center">
          <p className="text-xs text-blue-600 mb-1">예상 납부 세금 (총)</p>
          <p className="text-3xl font-bold text-blue-700">{fmt(result.totalTax)}원</p>
          <p className="text-xs text-blue-500 mt-1">
            실효세율 {result.effectiveTaxRate.toFixed(1)}%
          </p>
        </div>

        {/* 계산 상세 */}
        <div className="space-y-2.5">
          <Row label="연수입" value={`${fmt(result.annualRevenue)}원`} />
          <Divider />
          <Row
            label={`필요경비 (단순경비율 ${result.expenseRate}%)`}
            value={`-${fmt(result.expenses)}원`}
            sub
          />
          <Row
            label="소득금액"
            value={`${fmt(result.taxableIncome)}원`}
            bold
          />
          <Divider />
          <Row label="기본공제 (본인)" value={`-${fmt(result.basicDeduction)}원`} sub />
          <Row label="과세표준" value={`${fmt(result.deductedIncome)}원`} bold />
          <Divider />
          <Row label="산출세액" value={`${fmt(result.calculatedTax)}원`} />
          <Row label="표준세액공제" value={`-${fmt(result.standardTaxCredit)}원`} sub />
          <Row label="종합소득세 (결정세액)" value={`${fmt(result.incomeTax)}원`} />
          <Row label="지방소득세 (10%)" value={`${fmt(result.localIncomeTax)}원`} />
          <div className="bg-gray-50 rounded-lg px-3 py-2.5 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-800">총 납부 세금</span>
            <span className="text-sm font-bold text-red-600">{fmt(result.totalTax)}원</span>
          </div>
          <div className="bg-green-50 rounded-lg px-3 py-2.5 flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-800">세후 실수령 소득</span>
            <span className="text-sm font-bold text-green-700">{fmt(result.netIncome)}원</span>
          </div>
        </div>
      </div>

      {/* 안내 */}
      <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-500 space-y-1">
        <p className="font-medium text-gray-600">계산 기준 안내</p>
        <p>· 단순경비율은 직전연도 수입이 업종별 기준금액 미만인 경우 적용됩니다.</p>
        <p>· 본인 기본공제(150만원)와 표준세액공제(7만원)만 반영되어 있습니다. 부양가족·연금보험료 등 추가 공제는 미반영입니다.</p>
        <p>· 국민연금, 건강보험료 등 추가 공제는 반영되지 않으며 실제 세액과 다를 수 있습니다.</p>
        <p>· 정확한 세금 신고는 세무사 상담을 권장합니다.</p>
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
      <span className={`text-sm ${sub ? "text-gray-400" : bold ? "font-semibold text-gray-800" : "text-gray-600"}`}>
        {label}
      </span>
      <span className={`text-sm ${bold ? "font-bold text-gray-900" : sub ? "text-gray-400" : "text-gray-700"}`}>
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-gray-100 my-1" />;
}
