"use client";

import type { MouseEvent, ReactNode } from "react";

export const FORM_ID = "formular";

type Props = { children: ReactNode; className?: string };

/** Every call-to-action on the landing page leads to the same place: the form. */
export function FormLink({ children, className }: Props) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const form = document.getElementById(FORM_ID);
    if (!form) return;
    event.preventDefault();
    form.scrollIntoView({ block: "start" });
    // On desktop, put the cursor in the first field (on phones this would pop the keyboard mid-scroll).
    if (window.matchMedia("(pointer: fine)").matches) {
      form.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true });
    }
  };

  return (
    <a href={`#${FORM_ID}`} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
