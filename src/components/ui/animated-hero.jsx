import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);

  const titles = useMemo(
    () => [
      "1. 예수님의 제자되는 교회\n(선교적 제자와 선교적 교회)",
      "2. 다양한 세대가\n먼저 은혜 받는 교회",
      "3. 다음 세대를 돕는 교회",
      "4. 성령충만으로\n돌파하는 교회",
      "5. 영적부흥을 경험하는 교회",
    ],
    []
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTitleNumber((prev) =>
        prev === titles.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [titles.length]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <div className="flex flex-col gap-4">
            <h1 className="max-w-2xl text-center text-5xl font-regular tracking-tighter md:text-7xl">
              <span className="text-spektr-cyan-50 text-2xl md:text-4xl text-white bg-[#1f1f1f] px-3 py-1 rounded-sm inline-block">
                2026 라이드처치 교회 목표
              </span>

              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 text-3xl md:text-4xl tracking-wide leading-tight min-h-[4.8rem] md:min-h-[5.6rem]">
                &nbsp;
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
              다양한 세대가 먼저 회복되어 다음세대를 돕는 우리 교회
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
