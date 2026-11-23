"use client";

import { ModelProvider } from "../lib/model-context";
import type { ModelDefinition } from "../types";
import { SpecSheet } from "./sections/SpecSheet";

/** The equipment page of a model (`model.specSheet` must be set). */
export function ModelEquipment({ model }: { model: ModelDefinition }) {
  if (!model.specSheet) return null;
  return (
    <ModelProvider model={model}>
      <SpecSheet contentKey={model.specSheet.contentKey} />
    </ModelProvider>
  );
}
