import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Kept so call sites stay unchanged; sections are no longer pinned. */
  distance?: number;
  start?: string;
  desktopOnly?: boolean;
};

/** Sections used to be held in place while scrolling; on this site they scroll normally. */
export function PinOnScroll({ children, className }: Props) {
  return <div className={className}>{children}</div>;
}
