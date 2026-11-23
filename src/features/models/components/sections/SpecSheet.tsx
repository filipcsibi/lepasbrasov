"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { KeyButton, KeyTabs, panel } from "@/shared/ui/switchgear";
import { useModel } from "../../lib/model-context";
import { SectionLabel } from "../shared/SectionLabel";
import styles from "./SpecSheet.module.css";

type Version = "essence" | "elegance";

/** Texts of a spec sheet, as written in `models.<model>.<contentKey>`. */
type SpecSheetContent = {
  title: string;
  intro: string;
  versionsLabel: string;
  onlyBadge?: string;
  /** Models that do not name their versions publicly: standard equipment only, no version switch. */
  versionless?: boolean;
  back: string;
  specs: { title: string; rows: Row[] }[];
  equipment: { title: string; items: Item[] }[];
  footnote: string;
};

/** One value for both versions, or one per version. */
type Row = { label: string } & ({ value: string } | Record<Version, string>);
/** Same value on both versions (`text`), only on Elegance (`only`), or worded per version. */
type Item = { text: string; only?: Version } | Record<Version, string>;

const versions: Version[] = ["essence", "elegance"];

function useSpecSheet(contentKey: string) {
  const { messagesKey } = useModel();
  const t = useTranslations(`models.${messagesKey}`);
  return t.raw(contentKey as never) as SpecSheetContent;
}

/** Equipment page: spec tables, then the equipment of the selected version. */
export function SpecSheet({ contentKey }: { contentKey: string }) {
  const { slug, messagesKey, specSheet } = useModel();
  const t = useTranslations(`models.${messagesKey}`);
  const content = useSpecSheet(contentKey);
  const [version, setVersion] = useState<Version>(content.versionless ? "essence" : "elegance");

  const tabs = versions.map((v) => ({ value: v, label: v === "essence" ? "Essence" : "Elegance" }));

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <Link href={{ pathname: "/models/[slug]", params: { slug } }} className={styles.back}>
          ‹ {content.back}
        </Link>
        <SectionLabel>{t("labels.specSheet")}</SectionLabel>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.intro}>{content.intro}</p>
        {!content.versionless && (
          <KeyTabs
            className={styles.tabs}
            label={content.versionsLabel}
            options={tabs}
            value={version}
            onChange={setVersion}
          />
        )}
      </header>

      <div className={styles.grid}>
        {content.specs.map((group) => (
          <div key={group.title} className={`${panel.surface} ${styles.card}`}>
            <h4>{group.title}</h4>
            <dl>
              {group.rows.map((row) => (
                <div key={row.label} className={styles.row}>
                  <dt>{row.label}</dt>
                  <dd>{"value" in row ? row.value : row[version]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}

        {content.equipment.map((group) => {
          const items = group.items.filter((item) => !("only" in item && item.only && item.only !== version));
          return (
            <div key={group.title} className={`${panel.surface} ${styles.card}`}>
              <h4>{group.title}</h4>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {"text" in item ? item.text : item[version]}
                    {"only" in item && item.only && content.onlyBadge && (
                      <span className={styles.badge}>{content.onlyBadge}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className={styles.footnote}>{content.footnote}</p>

      <div className={styles.actions}>
        {specSheet?.actions.map((action, i) => (
          <KeyButton
            key={action.labelKey}
            href={action.href}
            tint={i === 0 ? "var(--color-panther-orange)" : undefined}
          >
            {t(action.labelKey as never)}
          </KeyButton>
        ))}
      </div>
    </section>
  );
}
