"use client";

import type { CSSProperties } from "react";
import { ResponsiveImage } from "@/shared/ui/media";
import { useModelText } from "../../lib/model-context";
import type { PowerSection } from "../../types";
import { SectionLabel } from "../shared/SectionLabel";
import { SpecList } from "../shared/SpecList";
import { SpecValue } from "../shared/SpecValue";
import styles from "./Power.module.css";

/** Hybrid powertrain story in three stages, stacked (no pinned scroll animation). */
export function Power({ section }: { section: PowerSection }) {
  const t = useModelText();

  return (
    <section className={styles.section} style={{ "--bg": `url(${section.background})` } as CSSProperties}>
      <div className={styles.picture}>
        <ResponsiveImage
          src={section.image.src}
          mobileSrc={section.image.mobileSrc}
          className={styles.image}
          quality={85}
        />
      </div>

      <SectionLabel className={styles.label}>{t(section.labelKey)}</SectionLabel>

      <div className={styles.stages}>
        {section.stageKeys.map((key, i) => (
          <p key={key} className={[styles.stage, styles[`stage${i + 1}`]].join(" ")}>
            {t(key)}
          </p>
        ))}
      </div>

      <ul className={styles.features}>
        {section.features.map((f) => (
          <li key={f.labelKey} className={styles.feature}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.icon} alt="" className={styles.icon} />
            {t(f.labelKey)}
          </li>
        ))}
      </ul>

      <SpecList specs={section.specs} tone="light" className={styles.specs} />

      <div className={styles.efficiency}>
        <ul className={styles.efficiencyTrack}>
          {section.efficiency.map(({ image, spec }) => (
            <li key={spec.labelKey} className={styles.efficiencyItem}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt="" />
              <div className={styles.metric}>
                <span className={styles.metricTitle}>{t(spec.labelKey)}</span>
                <SpecValue spec={spec} className={styles.metricValue} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
