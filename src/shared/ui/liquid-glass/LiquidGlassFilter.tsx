"use client";

import { useEffect } from "react";

/**
 * Renders the SVG displacement filter used by glass surfaces and flags the
 * document when the browser can apply SVG filters to `backdrop-filter`
 * (Chromium). Other browsers keep the frosted-glass fallback.
 *
 * Mount once, in the root layout.
 */
export function LiquidGlassFilter() {
  useEffect(() => {
    type UAData = { brands?: { brand: string }[] };
    const uaData = (navigator as Navigator & { userAgentData?: UAData }).userAgentData;
    const isChromium = !!uaData?.brands?.some((b) => b.brand === "Chromium");
    if (isChromium && CSS.supports("backdrop-filter", "url(#a)")) {
      document.documentElement.dataset.glass = "refract";
    }
  }, []);

  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="liquid-glass-refraction" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.012" numOctaves="2" seed="7" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2.5" result="softNoise" />
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="38" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
