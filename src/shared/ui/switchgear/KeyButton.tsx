import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { Link } from "@/i18n/navigation";
import type { NavHref } from "@/config/navigation";
import panel from "./panel.module.css";
import styles from "./KeyButton.module.css";

type CommonProps = {
  children: ReactNode;
  className?: string;
  /** Lights the key's LED in this colour, e.g. the section's brand colour — marks the primary action. */
  tint?: string;
  /** Same as `tint` (kept for call sites that pass an accent). */
  accent?: string;
  size?: "md" | "sm";
};

type InternalLinkProps = CommonProps & { href: NavHref; newTab?: boolean };
type ExternalLinkProps = CommonProps & { externalHref: string; newTab?: boolean };
type ActionProps = CommonProps & {
  onClick: () => void;
  type?: "button" | "submit";
  ariaPressed?: boolean;
};

export type KeyButtonProps = InternalLinkProps | ExternalLinkProps | ActionProps;

/**
 * The site-wide call-to-action button ("DESCOPERĂ MAI MULT", "CITEȘTE", …).
 * A raised key of the site's switchgear: its LED lights up on hover, focus and press (always, for `tint`).
 */
export function KeyButton(props: KeyButtonProps) {
  const { children, className, accent, size = "md" } = props;
  const tint = props.tint ?? accent;
  const classes = clsx(panel.surface, panel.interactive, styles.button, styles[size], (tint || size === "md") && styles.lit, className);
  const style = tint
    ? ({ "--key-accent": tint } as CSSProperties)
    : undefined;
  const label = (
    <>
      <span className={styles.led} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </>
  );

  if ("href" in props) {
    return (
      <Link
        href={props.href}
        className={classes}
        style={style}
        {...(props.newTab ? { target: "_blank", rel: "noopener" } : {})}
      >
        {label}
      </Link>
    );
  }

  if ("externalHref" in props) {
    return (
      <a
        href={props.externalHref}
        className={classes}
        style={style}
        {...(props.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      aria-pressed={props.ariaPressed}
      className={classes}
      style={style}
    >
      {label}
    </button>
  );
}
