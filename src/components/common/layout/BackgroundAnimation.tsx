"use client";

import { useCallback, useEffect } from "react";

export default function Starfield() {
  const updateStars = useCallback(() => {
    function generateStars(
      id: string,
      count: number,
      width: number,
      height: number,
    ) {
      const el = document.getElementById(id);
      if (!el) return;

      const starArray: string[] = [];
      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        starArray.push(`${x}px ${y}px #64748b`);
      }

      el.style.boxShadow = starArray.join(", ");
    }

    const pageHeight = document.body.scrollHeight;
    const starHeight = pageHeight + 500;
    const pageWidth = window.innerWidth;

    const densitySmall = 0.15;
    const densityMedium = 0.05;
    const densityBig = 0.025;

    const countSmall = Math.floor(starHeight * densitySmall);
    const countMedium = Math.floor(starHeight * densityMedium);
    const countBig = Math.floor(starHeight * densityBig);

    generateStars("stars", countSmall, pageWidth, starHeight);
    generateStars("stars-after", countSmall, pageWidth, starHeight);

    generateStars("stars2", countMedium, pageWidth, starHeight);
    generateStars("stars2-after", countMedium, pageWidth, starHeight);

    generateStars("stars3", countBig, pageWidth, starHeight);
    generateStars("stars3-after", countBig, pageWidth, starHeight);

    const baseSpeed = 10; // px/sec
    const duration = starHeight / baseSpeed;

    const applyDuration = (id: string, multiplier: number) => {
      const el = document.getElementById(id);
      if (el) el.style.animationDuration = `${duration * multiplier}s`;
    };

    applyDuration("stars", 1);
    applyDuration("stars-after", 1);
    applyDuration("stars2", 2);
    applyDuration("stars2-after", 2);
    applyDuration("stars3", 3);
    applyDuration("stars3-after", 3);

    const styleId = "dynamic-star-animation";
    let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = `
      @keyframes animStar {
        from { transform: translateY(0); }
        to { transform: translateY(-${starHeight}px); }
      }
    `;
  }, []);

  useEffect(() => {
    updateStars();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateStars();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [updateStars]);

  return (
    <div className="background-animation-wrapper pointer-events-none inset-0 overflow-hidden">
      <div id="stars" className="animate-star absolute h-[1px] w-[1px]" />
      <div
        id="stars-after"
        className="animate-star absolute h-[1px] w-[1px]"
        style={{ top: "100%" }}
      />

      <div id="stars2" className="animate-star absolute h-[2px] w-[2px]" />
      <div
        id="stars2-after"
        className="animate-star absolute h-[2px] w-[2px]"
        style={{ top: "100%" }}
      />

      <div id="stars3" className="animate-star absolute h-[3px] w-[3px]" />
      <div
        id="stars3-after"
        className="animate-star absolute h-[3px] w-[3px]"
        style={{ top: "100%" }}
      />
    </div>
  );
}
