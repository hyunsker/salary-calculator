import { Metadata } from "next";
import IncomeTaxCalculator from "@/components/IncomeTaxCalculator";

export const metadata: Metadata = {
  title: "종합소득세 계산기 2026 - 프리랜서 세금 계산 (단순경비율)",
  description:
    "2026년 기준 프리랜서·1인 사업자 종합소득세 계산기. 업종별 단순경비율 적용, 필요경비·과세표준·종합소득세·지방소득세를 자동 계산. 연수입 2,400만원 미만 대상.",
  keywords: [
    "종합소득세 계산기",
    "프리랜서 세금 계산",
    "단순경비율 계산기",
    "1인 사업자 세금",
    "종합소득세 2026",
    "프리랜서 세금 2026",
    "소득세 계산기",
  ],
  alternates: { canonical: "/income-tax" },
  openGraph: {
    title: "종합소득세 계산기 2026 - 프리랜서 세금 계산",
    description:
      "2026년 기준 프리랜서·1인 사업자 종합소득세 계산기. 업종별 단순경비율 자동 적용.",
    url: "https://salary-calculator-bay.vercel.app/income-tax",
    type: "website",
  },
};

export default function IncomeTaxPage() {
  return <IncomeTaxCalculator />;
}
