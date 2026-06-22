import type { Metadata } from "next";
import SeveranceCalculator from "@/components/SeveranceCalculator";

export const metadata: Metadata = {
  title: "퇴직금 계산기 2026 - 퇴직금 계산",
  description:
    "퇴직금 계산기. 입사일·퇴사일·월급여 입력으로 퇴직금을 바로 계산하세요. 근로자퇴직급여보장법 기준, 평균임금 자동 계산.",
  keywords: ["퇴직금 계산기", "퇴직금 계산", "평균임금 계산", "퇴직금 조건", "2026 퇴직금"],
  alternates: { canonical: "/severance" },
  openGraph: {
    title: "퇴직금 계산기 2026 - 퇴직금 계산",
    description: "입사일·퇴사일·월급여로 퇴직금을 바로 계산하세요.",
  },
};

export default function SeverancePage() {
  return <SeveranceCalculator />;
}
