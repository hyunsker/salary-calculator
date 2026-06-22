import type { Metadata } from "next";
import MinimumWageCalculator from "@/components/MinimumWageCalculator";

export const metadata: Metadata = {
  title: "최저시급 계산기 2026 - 알바 월급 계산",
  description:
    "2026년 최저시급 10,030원 기준 알바 월급 계산기. 하루 근무시간, 주 근무일수 입력으로 주급·월급 자동 계산. 주휴수당 포함.",
  keywords: ["최저시급 계산기", "알바 월급 계산기", "2026 최저시급", "주휴수당 계산", "알바 급여"],
  alternates: { canonical: "/minimum-wage" },
  openGraph: {
    title: "최저시급 계산기 2026 - 알바 월급 계산",
    description: "2026년 최저시급 10,030원 기준 월급 계산. 주휴수당 포함.",
  },
};

export default function MinimumWagePage() {
  return <MinimumWageCalculator />;
}
