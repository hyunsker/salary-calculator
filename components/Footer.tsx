import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-lg mx-auto px-4 mt-8 pb-10 text-center text-xs text-gray-400 space-y-2">
      <p className="leading-relaxed">
        본 사이트의 계산 결과는 2026년 기준 참고용이며, 실제 금액은 개인 상황에 따라 다를 수 있습니다.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link href="/" className="hover:text-gray-600">
          홈
        </Link>
        <span className="text-gray-200">|</span>
        <Link href="/privacy" className="underline hover:text-gray-600">
          개인정보처리방침
        </Link>
      </div>
      <p className="text-gray-300">© 2026 연봉 실수령액 계산기</p>
    </footer>
  );
}
