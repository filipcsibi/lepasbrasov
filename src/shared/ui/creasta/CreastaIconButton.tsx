"use client";

import clsx from "clsx";
import creasta from "./creasta.module.css";
import styles from "./CreastaIconButton.module.css";

type Props = {
  icon: "prev" | "next" | "close" | "play" | "pause";
  label: string;
  onClick?: () => void;
  className?: string;
  size?: "md" | "lg";
  disabled?: boolean;
};

const paths: Record<Props["icon"], string> = {
  prev: "M14.5 5 7.5 12l7 7",
  next: "m9.5 5 7 7-7 7",
  close: "M6 6l12 12M18 6 6 18",
  play: "M8 5.5v13l10.5-6.5L8 5.5Z",
  pause: "M8.5 5.5v13M15.5 5.5v13",
};

/** Square Creasta button for carousel arrows, close and play controls. */
export function CreastaIconButton({ icon, label, onClick, className, size = "md", disabled }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={clsx(creasta.surface, creasta.interactive, styles.button, styles[size], className)}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d={paths[icon]}
          fill={icon === "play" ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
