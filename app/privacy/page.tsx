import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 - 연봉 실수령액 계산기 2026",
  description: "연봉 실수령액 계산기의 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-blue-500 hover:text-blue-600 mb-6"
        >
          ← 계산기로 돌아가기
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          개인정보처리방침
        </h1>
        <p className="text-sm text-gray-400 mb-8">최종 수정일: 2026년 6월 22일</p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-7 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="font-semibold text-base text-gray-900 mb-2">1. 개요</h2>
            <p>
              연봉 실수령액 계산기(이하 "본 서비스")는 사용자의 개인정보를 수집하거나
              저장하지 않습니다. 모든 계산은 사용자의 브라우저 내에서만 처리되며
              서버로 전송되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-gray-900 mb-2">2. 수집하는 정보</h2>
            <p>
              본 서비스는 사용자가 입력한 연봉, 부양가족 수 등의 정보를
              수집하거나 저장하지 않습니다. 해당 정보는 오직 실수령액 계산을 위해
              브라우저에서만 사용되며 외부로 전송되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-gray-900 mb-2">3. 광고 (Google AdSense)</h2>
            <p>
              본 서비스는 Google AdSense를 통해 광고를 제공합니다. Google은
              광고 제공을 위해 쿠키를 사용할 수 있으며, 이를 통해 사용자의
              관심사에 맞는 광고가 표시될 수 있습니다.
            </p>
            <p className="mt-2">
              Google의 광고 쿠키 사용에 대한 자세한 내용은{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Google 광고 정책
              </a>
              에서 확인하실 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-gray-900 mb-2">4. 쿠키</h2>
            <p>
              본 서비스는 자체적으로 쿠키를 사용하지 않습니다. 단, 광고 제공을
              위한 Google AdSense에서 쿠키를 사용할 수 있습니다. 브라우저 설정을
              통해 쿠키를 비활성화할 수 있으나, 일부 서비스 이용에 제한이 있을
              수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-gray-900 mb-2">5. 제3자 링크</h2>
            <p>
              본 서비스에는 외부 사이트 링크가 포함될 수 있으며, 해당 사이트의
              개인정보 처리방침에 대해서는 책임을 지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-gray-900 mb-2">6. 방침 변경</h2>
            <p>
              본 개인정보처리방침은 관련 법령 또는 서비스 변경에 따라 수정될 수
              있으며, 변경 시 본 페이지를 통해 공지합니다.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-base text-gray-900 mb-2">7. 문의</h2>
            <p>
              개인정보처리방침에 관한 문의사항이 있으시면 아래로 연락해 주세요.
              <br />
              이메일: hyunsker@gmail.com
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
