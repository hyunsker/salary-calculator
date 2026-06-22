import type { Metadata } from "next";
import WeeklyAllowanceCalculator from "@/components/WeeklyAllowanceCalculator";

export const metadata: Metadata = {
  title: "주휴수당 계산기 2026 - 알바 주휴수당",
  description:
    "주휴수당 계산기. 주 15시간 이상 근무 시 발생하는 주휴수당을 바로 계산하세요. 실질 시급, 주급, 월급까지 한번에.",
  keywords: ["주휴수당 계산기", "주휴수당 계산", "알바 주휴수당", "주휴수당 조건", "실질 시급"],
  alternates: { canonical: "/weekly-allowance" },
  openGraph: {
    title: "주휴수당 계산기 2026 - 알바 주휴수당",
    description: "주 15시간 이상 근무 시 발생하는 주휴수당을 바로 계산하세요.",
  },
};

export default function WeeklyAllowancePage() {
  return <WeeklyAllowanceCalculator />;
}
