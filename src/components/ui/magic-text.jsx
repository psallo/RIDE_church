"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Word = ({ children, progress, range, className }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className={`relative mt-[10px] mr-1 font-semibold ${className}`}>
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export const MagicText = ({
  text,
  containerClassName = "min-h-[50vh] flex items-center justify-center",
  className = "flex flex-wrap leading-[0.5] p-4 max-w-[1200px]",
  wordClassName = "text-2xl",
}) => {
  const container = useRef(null);
  const normalizedText = text.replace(/\\n/g, "\n");

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "end 1"],
  });

  const tokens = normalizedText
    .split(/(\s+)/)
    .flatMap((token) => {
      if (!token.includes("\n")) return [token];
      const parts = token.split("\n");
      const expanded = [];
      parts.forEach((part, index) => {
        if (part) expanded.push(part);
        if (index < parts.length - 1) expanded.push("\n");
      });
      return expanded;
    });

  return (
    <div ref={container} className={containerClassName}>
      <p className={className}>
        {tokens.map((token, i) => {
          if (token === "") return null;

          if (token === "\n") {
            return <br key={`br-${i}`} />;
          }

          if (token.trim() === "") {
            return (
              <span key={`space-${i}`} aria-hidden="true">
                {token}
              </span>
            );
          }

          const wordIndex =
            tokens.slice(0, i + 1).filter((t) => t.trim()).length - 1;
          const totalWords = tokens.filter((t) => t.trim()).length;
          const start = wordIndex / totalWords;
          const end = start + 1 / totalWords;

          return (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[start, end]}
              className={wordClassName}
            >
              {token}
            </Word>
          );
        })}
      </p>
    </div>
  );
};
