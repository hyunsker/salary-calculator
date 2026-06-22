"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "연봉계산기" },
  { href: "/minimum-wage", label: "최저시급" },
  { href: "/weekly-allowance", label: "주휴수당" },
  { href: "/severance", label: "퇴직금" },
  { href: "/income-tax", label: "종합소득세" },
  { href: "/unemployment", label: "실업급여" },
];

export default function TabNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex gap-1 py-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`shrink-0 text-center text-sm font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
