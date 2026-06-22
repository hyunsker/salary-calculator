"use client";

import { useState, useEffect } from "react";

interface SalaryInputProps {
  annualSalary: number;
  dependents: number;
  onSalaryChange: (value: number) => void;
  onDependentsChange: (value: number) => void;
}

export default function SalaryInput({
  annualSalary,
  dependents,
  onSalaryChange,
  onDependentsChange,
}: SalaryInputProps) {
  const [inputValue, setInputValue] = useState(
    String(Math.round(annualSalary / 10000))
  );

  useEffect(() => {
    setInputValue(String(Math.round(annualSalary / 10000)));
  }, [annualSalary]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setInputValue(raw);
    const numericValue = parseInt(raw, 10);
    if (!isNaN(numericValue) && numericValue >= 0) {
      onSalaryChange(numericValue * 10000);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    onSalaryChange(val * 10000);
  };

  const manWon = Math.round(annualSalary / 10000);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-5">
      <h2 className="text-base font-semibold text-gray-700">연봉 입력</h2>

      {/* 연봉 숫자 입력 */}
      <div>
        <label className="block text-sm text-gray-500 mb-1.5">연봉 (만원)</label>
        <div className="relative flex items-center">
          <input
            type="number"
            inputMode="numeric"
            value={inputValue}
            onChange={handleInputChange}
            min={0}
            max={100000}
            className="w-full text-right text-2xl font-bold text-gray-900 border border-gray-200 rounded-xl px-4 py-3 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="3600"
          />
          <span className="absolute right-4 text-gray-400 font-medium text-base pointer-events-none">
            만원
          </span>
        </div>
        {annualSalary > 0 && (
          <p className="text-right text-xs text-gray-400 mt-1">
            = {annualSalary.toLocaleString("ko-KR")}원
          </p>
        )}
      </div>

      {/* 슬라이더 */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>0</span>
          <span>5,000만원</span>
          <span>1억+</span>
        </div>
        <input
          type="range"
          min={0}
          max={20000}
          step={100}
          value={manWon}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* 빠른 선택 버튼 */}
      <div>
        <p className="text-xs text-gray-400 mb-2">빠른 선택</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { v: 3000, label: "3천만" },
            { v: 4000, label: "4천만" },
            { v: 5000, label: "5천만" },
            { v: 6000, label: "6천만" },
            { v: 7000, label: "7천만" },
            { v: 8000, label: "8천만" },
            { v: 10000, label: "1억" },
            { v: 12000, label: "1.2억" },
          ].map(({ v, label }) => (
            <button
              key={v}
              onClick={() => onSalaryChange(v * 10000)}
              className={`text-sm py-1.5 rounded-lg border transition-colors ${
                manWon === v
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 부양가족 수 */}
      <div>
        <label
          htmlFor="dependents"
          className="block text-sm text-gray-500 mb-1.5"
        >
          공제대상 가족 수{" "}
          <span className="text-xs text-gray-400">(본인 포함, 국세청 간이세액표 기준)</span>
        </label>
        <select
          id="dependents"
          value={dependents}
          onChange={(e) => onDependentsChange(Number(e.target.value))}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-base"
        >
          {Array.from({ length: 11 }, (_, i) => (
            <option key={i + 1} value={i}>
              {i + 1}명 {i === 0 ? "(본인만)" : i === 1 ? "(본인+1명)" : `(본인+${i}명)`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
