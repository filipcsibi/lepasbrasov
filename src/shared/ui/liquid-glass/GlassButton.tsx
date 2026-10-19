import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { Link } from "@/i18n/navigation";
import type { NavHref } from "@/config/navigation";
import glass from "./glass.module.css";
import styles from "./GlassButton.module.css";

type CommonProps = {
  children: ReactNode;
  className?: string;
  /** Optional colour tint behind the glass, e.g. the section's brand colour. */
  tint?: string;
  /** Same as `tint`: a brand colour behind the glass (kept for call sites that pass an accent). */
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

export type GlassButtonProps = InternalLinkProps | ExternalLinkProps | ActionProps;

/**
 * The site-wide call-to-action button ("DESCOPERĂ MAI MULT", "CITEȘTE", …).
 * Square liquid glass plate with the LEPAS rainbow rim on hover.
 */
export function GlassButton(props: GlassButtonProps) {
  const { children, className, accent, size = "md" } = props;
  const tint = props.tint ?? accent;
  const classes = clsx(glass.surface, glass.interactive, styles.button, styles[size], className);
  const style = tint
    ? ({ "--glass-tint": `color-mix(in srgb, ${tint} 55%, transparent)` } as CSSProperties)
    : undefined;
  const label = <span className={styles.label}>{children}</span>;

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
