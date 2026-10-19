import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { Link } from "@/i18n/navigation";
import type { NavHref } from "@/config/navigation";
import creasta from "./creasta.module.css";
import styles from "./CreastaButton.module.css";

type CommonProps = {
  children: ReactNode;
  className?: string;
  /** Optional colour of the button's wash and lit ridge, e.g. the section's brand colour. */
  tint?: string;
  /** Colour of the lit ridge, without filling the button. */
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

export type CreastaButtonProps = InternalLinkProps | ExternalLinkProps | ActionProps;

/**
 * The site-wide call-to-action button ("DESCOPERĂ MAI MULT", "CITEȘTE", …).
 * Creasta plate: the outline lights up from left to right on hover.
 */
export function CreastaButton(props: CreastaButtonProps) {
  const { children, className, tint, accent, size = "md" } = props;
  const classes = clsx(creasta.surface, creasta.interactive, styles.button, styles[size], className);
  const style = accent
    ? ({ "--creasta-accent": accent } as CSSProperties)
    : tint
      ? ({ "--creasta-tint": `color-mix(in srgb, ${tint} 42%, transparent)`, "--creasta-accent": tint } as CSSProperties)
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
