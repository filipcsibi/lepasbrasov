"use client";

import clsx from "clsx";
import type { CSSProperties } from "react";
import panel from "./panel.module.css";
import styles from "./KeyTabs.module.css";

type Props<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
};

/** Rocker switch: a raised key slides between the options, its LED lit. */
export function KeyTabs<T extends string>({ options, value, onChange, label, className }: Props<T>) {
  const index = options.findIndex((o) => o.value === value);
  return (
    <div
      role="tablist"
      aria-label={label}
      className={clsx(panel.surface, styles.tabs, className)}
      style={{ "--count": options.length, "--index": index } as CSSProperties}
    >
      <span className={styles.thumb} aria-hidden="true">
        <span className={styles.led} />
      </span>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          className={clsx(styles.tab, o.value === value && styles.active)}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
