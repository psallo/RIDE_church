import { BlurTextEffect } from "@/components/ui/blur-text-effect";

export default function BlurTextPreview({ lang = "ko" }) {
  const text = lang === "en" ? "Directions to RIDE Church" : "라이드처치 오시는 길 안내";
  return (
    <div className="flex justify-center items-center min-h-[20vh] w-full select-none pt-0">
      <BlurTextEffect className="font-semibold text-primary text-2xl sm:text-4xl">
        {text}
      </BlurTextEffect>
    </div>
  );
}
