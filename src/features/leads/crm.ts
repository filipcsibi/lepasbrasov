/**
 * SalesPartner — the fixed values sent with every lead from this site.
 * Leads are created directly in the dealer's own instance (the Dip Motors LEPAS DMS), not in the importer's
 * lepas-ims: the DMS takes no dealer code and no "intention to buy", the consultant is assigned there.
 * Server only: imported by the delivery code, never by the forms.
 * The endpoint and keys come from the environment: CRM_WEBHOOK_URL_LEPAS, CRM_API_KEY_LEPAS, CRM_API_SECRET_LEPAS.
 */
export const salesPartner = {
  brand: "LEPAS",
  channel: "WEBSITE",
  site: "lepasbrasov.ro",
  vehicleUsedStatus: "NOU",
  vehicleType: "AUTOTURISM",
};
