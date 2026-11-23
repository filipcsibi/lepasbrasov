"use client";

import { ResponsiveVideo } from "@/shared/ui/media";
import { useModelText } from "../../lib/model-context";
import type { VideoIntroSection } from "../../types";
import styles from "./VideoIntro.module.css";

/** Full-screen video with a statement over it. */
export function VideoIntro({ section }: { section: VideoIntroSection }) {
  const t = useModelText();

  return (
    <section className={styles.section}>
      <div className={styles.frame}>
        <ResponsiveVideo src={section.video} poster={section.poster} className={styles.video} />
      </div>
      {section.textKey && <p className={styles.text}>{t(section.textKey)}</p>}
    </section>
  );
}
