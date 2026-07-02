import type { Metadata } from "next";
import { Geist } from "next/font/google";
import TabNav from "@/components/TabNav";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = "https://salary-calculator-bay.vercel.app";

export const metadata: Metadata = {
  title: "연봉 실수령액 계산기 2026 - 월급 세금 계산",
  description:
    "2026년 기준 연봉 실수령액 계산기. 국민연금, 건강보험, 장기요양, 고용보험, 소득세까지 항목별 공제액을 확인하세요. 부양가족 수 반영, 실시간 계산.",
  keywords: [
    "연봉 실수령액 계산기",
    "월급 계산기",
    "세금 계산기",
    "4대보험 계산기",
    "소득세 계산",
    "2026 연봉",
    "실수령액",
    "국민연금 계산",
    "건강보험 계산",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "연봉 실수령액 계산기 2026 - 월급 세금 계산",
    description:
      "2026년 기준 4대보험 + 소득세 공제 후 실제 받는 금액을 바로 확인하세요. 부양가족 수 반영, 실시간 계산.",
    url: siteUrl,
    siteName: "연봉 실수령액 계산기",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "연봉 실수령액 계산기 2026",
    description:
      "2026년 기준 4대보험 + 소득세 공제 후 실제 받는 금액을 바로 확인하세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "TB3cem4RQu21AgSgUYDo74uXExrsCuCGFTTZaisZAc4",
    other: {
      "naver-site-verification": "c4e814deb541e067f89ff2ed13c0a56ae0f8efe3",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9649209365883181"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full bg-gray-50 font-sans">
        <TabNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
