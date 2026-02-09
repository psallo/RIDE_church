import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

function Hero({ lang = "ko" }) {
  const [titleNumber, setTitleNumber] = useState(0);
  const [maxTitleHeight, setMaxTitleHeight] = useState(0);
  const measureRefs = useRef([]);

  const titles = useMemo(() => {
    const copy = {
      ko: [
        "1. 예수님의 제자되는 교회\n(선교적 제자와 선교적 교회)",
        "2. 다양한 세대가\n먼저 은혜 받는 교회",
        "3. 다음 세대를 돕는 교회",
        "4. 성령충만으로\n돌파하는 교회",
        "5. 영적부흥을 경험하는 교회",
      ],
      en: [
        "1. A church that becomes disciples of Jesus (Missional disciples and a missional church)",
        "2. A church where generations receive grace first",
        "3. A church that helps the next generation",
        "4. A church that breaks through by being filled with the Holy Spirit",
        "5. A church that experiences spiritual revival",
      ],
    };

    return copy[lang] ?? copy.ko;
  }, [lang]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleNumber((prev) =>
        prev === titles.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [titles.length]);

  useLayoutEffect(() => {
    const computeMaxHeight = () => {
      let max = 0;
      for (const el of measureRefs.current) {
        if (!el) continue;
        const { height } = el.getBoundingClientRect();
        if (height > max) max = height;
      }
      if (max > 0) setMaxTitleHeight(Math.ceil(max));
    };

    const raf = requestAnimationFrame(computeMaxHeight);
    const onResize = () => requestAnimationFrame(computeMaxHeight);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <div className="flex flex-col gap-4">
            <h1 className="max-w-2xl text-center text-5xl font-regular tracking-tighter md:text-7xl">
              <span className="text-spektr-cyan-50 text-2xl md:text-4xl text-white bg-[#1f1f1f] px-3 py-1 rounded-sm inline-block">
                {lang === "en"
                  ? "2026 Ride Church Goals"
                  : "2026 라이드처치 교회 목표"}
              </span>

              <span
                className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 text-3xl md:text-4xl tracking-wide leading-tight min-h-[4.8rem] md:min-h-[5.6rem]"
                style={maxTitleHeight ? { height: `${maxTitleHeight}px` } : undefined}
              >
                &nbsp;
                <span className="absolute left-0 top-0 w-full pointer-events-none invisible">
                  {titles.map((title, index) => (
                    <span
                      key={`measure-${index}`}
                      ref={(el) => {
                        measureRefs.current[index] = el;
                      }}
                      className="block font-semibold whitespace-pre-line"
                    >
                      {title}
                    </span>
                  ))}
                </span>
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold whitespace-pre-line"
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={
                      titleNumber === index
                        ? { opacity: 1, y: 0 }
                        : {
                            opacity: 0,
                            y: titleNumber > index ? "-150%" : "150%",
                          }
                    }
                    transition={{ type: "spring", stiffness: 50 }}
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
              {lang === "en"
                ? "A church where generations are restored first to help the next generation."
                : "다양한 세대가 먼저 회복되어 다음세대를 돕는 우리 교회"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
