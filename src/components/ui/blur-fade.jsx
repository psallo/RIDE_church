"use client";

import { forwardRef, useCallback, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
} from "framer-motion";

export const BlurFade = forwardRef(function BlurFade(
  {
    children,
    className,
    variant,
    duration = 0.4,
    delay = 0,
    yOffset = 6,
    inView = false,
    inViewMargin = "-50px",
    blur = "6px",
  },
  forwardedRef
) {
  const nodeRef = useRef(null);
  const setRefs = useCallback(
    (node) => {
      nodeRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef]
  );

  const inViewResult = useInView(nodeRef, {
    once: true,
    margin: inViewMargin,
  });

  const isInView = !inView || inViewResult;

  const defaultVariants = {
    hidden: {
      y: yOffset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      y: -yOffset,
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <AnimatePresence>
      <motion.div
        ref={setRefs}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
});
