import { Metadata } from "next";
import UnemploymentCalculator from "@/components/UnemploymentCalculator";

export const metadata: Metadata = {
  title: "실업급여 계산기 2026 - 구직급여 수급액 계산",
  description:
    "2026년 기준 실업급여(구직급여) 계산기. 퇴직 전 월급·나이·고용보험 가입 기간을 입력하면 1일 수급액, 수급 기간, 총 수령액을 자동 계산. 상한액 68,100원, 하한액 66,048원 적용.",
  keywords: [
    "실업급여 계산기",
    "구직급여 계산기",
    "실업급여 2026",
    "실업급여 수급액",
    "실업급여 기간",
    "고용보험 급여 계산",
    "비자발적 퇴사 실업급여",
  ],
  alternates: { canonical: "/unemployment" },
  openGraph: {
    title: "실업급여 계산기 2026 - 구직급여 수급액 계산",
    description:
      "2026년 기준 실업급여 계산기. 나이·가입 기간별 수급 기간과 총 수령액을 바로 확인하세요.",
    url: "https://salary-calculator-bay.vercel.app/unemployment",
    type: "website",
  },
};

export default function UnemploymentPage() {
  return <UnemploymentCalculator />;
}
