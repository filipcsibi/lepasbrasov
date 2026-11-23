"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Spec } from "../../types";

/** A specification value (static: no count-up). */
export function SpecValue({ spec, className }: { spec: Spec; className?: string }) {
  const locale = useLocale();
  const t = useTranslations("models.ui");
  const decimals = spec.decimals ?? 0;
  // Horsepower is the only unit written differently per language (CP in Romanian).
  const unit = spec.unit === "CP" && locale !== "ro" ? "hp" : spec.unit;
  const format = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: spec.value >= 10000,
  });

  return (
    <span className={className}>
      {spec.prefix && <>{t(spec.prefix)} </>}
      <span>{format.format(spec.value)}</span>
      <small> {unit}</small>
    </span>
  );
}
