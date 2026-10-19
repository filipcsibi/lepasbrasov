"use client";

import { GlassButton } from "@/shared/ui/liquid-glass";
import { OPEN_SETTINGS_EVENT } from "../lib/consent";

/** Re-opens the cookie preference centre (e.g. from the Cookies Policy page). */
export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <GlassButton tint="#111" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}>
      {label}
    </GlassButton>
  );
}
