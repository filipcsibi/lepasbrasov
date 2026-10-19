import { sendToSalesPartner } from "./salespartner";
import type { Lead } from "./validation";

/**
 * Sends a lead to the SalesPartner CRM (lepas-ims) — the only destination, the lead is created directly there.
 * Configured with env vars (the same endpoint and keys as the other LEPAS sites):
 *
 *   CRM_WEBHOOK_URL_LEPAS   lead endpoint of the lepas-ims SalesPartner instance
 *   CRM_API_KEY_LEPAS       sent as X-API-Key
 *   CRM_API_SECRET_LEPAS    sent as X-API-Secret
 */
export async function deliverLead(lead: Lead): Promise<{ ok: boolean }> {
  const { CRM_WEBHOOK_URL_LEPAS, CRM_API_KEY_LEPAS, CRM_API_SECRET_LEPAS } = process.env;

  if (!CRM_WEBHOOK_URL_LEPAS || !CRM_API_KEY_LEPAS || !CRM_API_SECRET_LEPAS) {
    // Local development without credentials: show the lead in the terminal.
    if (process.env.NODE_ENV !== "production") {
      console.info("[leads] lead (SalesPartner not configured):", lead);
      return { ok: true };
    }
    console.error("[leads] SalesPartner is not configured — lead NOT delivered.");
    return { ok: false };
  }

  try {
    await sendToSalesPartner(lead, {
      url: CRM_WEBHOOK_URL_LEPAS,
      apiKey: CRM_API_KEY_LEPAS,
      apiSecret: CRM_API_SECRET_LEPAS,
    });
    return { ok: true };
  } catch (error) {
    console.error("[leads] SalesPartner delivery failed:", error);
    return { ok: false };
  }
}
