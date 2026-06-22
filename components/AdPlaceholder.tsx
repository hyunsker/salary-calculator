interface AdPlaceholderProps {
  position: "top" | "bottom";
}

export default function AdPlaceholder({ position }: AdPlaceholderProps) {
  return (
    <div
      className="w-full flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg text-gray-400 text-xs"
      style={{ minHeight: position === "top" ? "90px" : "90px" }}
      aria-label="광고 영역"
    >
      {/* AdSense 연동 시 아래 ins 태그 활성화 */}
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}
      <span>광고 영역 ({position === "top" ? "상단" : "하단"})</span>
    </div>
  );
}
