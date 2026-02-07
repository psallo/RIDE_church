"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function LayeredText({
  lines = [
    { top: "\u00A0", bottom: "Restoration" },
    { top: "Restoration", bottom: "Intercession" },
    { top: "Intercession", bottom: "Discipleship" },
    { top: "Discipleship", bottom: "Evangelism" },
    { top: "Evangelism", bottom: "\u00A0" },
  ],
  fontSize = "72px",
  fontSizeMd = "36px",
  lineHeight = 60,
  lineHeightMd = 35,
  className = "",
}) {
  const containerRef = useRef(null)
  const timelineRef = useRef()
  const toCssLength = (value) =>
    typeof value === "number" ? `${value}px` : value
  const toInnerLength = (value) => {
    if (typeof value === "number") {
      return `${Math.max(0, value - 2)}px`
    }
    return `calc(${value} - 2px)`
  }
  const innerLineHeight = toInnerLength(lineHeight)
  const innerLineHeightMd = toInnerLength(lineHeightMd)

  const calculateTranslateX = (index) => {
    const baseOffset = 35
    const baseOffsetMd = 20
    const centerIndex = Math.floor(lines.length / 2)
    return {
      desktop: (index - centerIndex) * baseOffset,
      mobile: (index - centerIndex) * baseOffsetMd,
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const paragraphs = container.querySelectorAll("p")

    timelineRef.current = gsap.timeline({ paused: true })

    timelineRef.current.to(paragraphs, {
      y: window.innerWidth >= 768 ? -60 : -35,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
    })

    const handleMouseEnter = () => {
      timelineRef.current?.play()
    }

    const handleMouseLeave = () => {
      timelineRef.current?.reverse()
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      timelineRef.current?.kill()
    }
  }, [lines])

  return (
    <div
      ref={containerRef}
      className={`layered-text mx-auto py-24 font-sans font-black tracking-[-2px] uppercase antialiased cursor-pointer ${className}`}
      style={{
        "--lt-font-size": fontSize,
        "--lt-font-size-md": fontSizeMd,
        "--lt-line-height": toCssLength(lineHeight),
        "--lt-line-height-md": toCssLength(lineHeightMd),
        "--lt-line-height-inner": innerLineHeight,
        "--lt-line-height-inner-md": innerLineHeightMd,
        color: "#1f1f1f",
      }}
    >
      <ul className="list-none p-0 m-0 flex flex-col items-center">
        {lines.map((line, index) => {
          const translateX = calculateTranslateX(index)
          return (
            <li
              key={index}
              className="layered-text__item overflow-hidden relative"
              style={{
                "--lt-height": toCssLength(lineHeight),
                "--lt-height-md": toCssLength(lineHeightMd),
                "--lt-translateX": `${translateX.desktop}px`,
                "--lt-translateX-md": `${translateX.mobile}px`,
                "--lt-skewX": index % 2 === 0 ? "60deg" : "0deg",
                "--lt-skewY": "-30deg",
                "--lt-scaleY": index % 2 === 0 ? "0.66667" : "1.33333",
              }}
            >
              <p
                className="layered-text__line px-[15px] align-top whitespace-nowrap m-0"
              >
                {line.top}
              </p>
              <p
                className="layered-text__line px-[15px] align-top whitespace-nowrap m-0"
              >
                {line.bottom}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
