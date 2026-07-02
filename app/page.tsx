"use client";

import { useState, useMemo } from "react";
import SalaryInput from "@/components/SalaryInput";
import ResultCard from "@/components/ResultCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { calculateSalary } from "@/lib/taxCalculator";

const DEFAULT_SALARY = 40_000_000; // 4,000만원

export default function Home() {
  const [annualSalary, setAnnualSalary] = useState(DEFAULT_SALARY);
  const [dependents, setDependents] = useState(0);

  const result = useMemo(
    () => calculateSalary(annualSalary, dependents),
    [annualSalary, dependents]
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 pb-12">
        {/* 상단 광고 */}
        <div className="pt-4 pb-3">
          <AdPlaceholder position="top" />
        </div>

        {/* 헤더 */}
        <header className="py-5">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            연봉 실수령액 계산기
            <span className="text-blue-500"> 2026</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            4대보험 + 소득세 공제 후 실제 받는 금액 계산
          </p>
        </header>

        {/* 입력 섹션 */}
        <section className="mb-4">
          <SalaryInput
            annualSalary={annualSalary}
            dependents={dependents}
            onSalaryChange={setAnnualSalary}
            onDependentsChange={setDependents}
          />
        </section>

        {/* 결과 섹션 */}
        {annualSalary > 0 ? (
          <section>
            <ResultCard result={result} />
          </section>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">💰</p>
            <p className="text-sm">연봉을 입력하면 실수령액이 계산됩니다</p>
          </div>
        )}

        {/* 하단 광고 */}
        <div className="mt-8">
          <AdPlaceholder position="bottom" />
        </div>

        {/* 요율 안내 */}
        <div className="mt-6 text-center text-xs text-gray-400 space-y-1">
          <p>2026년 기준 · 국민연금 4.75% · 건강보험 3.595%</p>
          <p>장기요양 13.14% · 고용보험 0.9%</p>
        </div>
      </div>
    </main>
  );
}
