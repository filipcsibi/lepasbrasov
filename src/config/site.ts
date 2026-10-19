/**
 * Site-wide, non-translatable configuration.
 * Labels shown to visitors live in `messages/<locale>/common.json`.
 */
export const siteConfig = {
  name: "LEPAS Brașov",
  url: "https://lepasbrasov.ro",
  logo: "/media/shared/logo.svg",
  /**
   * Showroom details shown on the contact page, in the footer and on the test-drive pages.
   * Empty values are simply not rendered — fill them in once confirmed.
   */
  showroom: {
    name: "LEPAS Brașov",
    // Confirmed by the dealer.
    operator: "Dip Motors",
    address: "Calea București nr. 168, Brașov, jud. Brașov",
    /** The showroom's street — shown as the site's signature next to the city name. */
    landmark: "Calea București 168",
    phone: "+40 732 336 300",
    /** The phone number also answers on WhatsApp (international format, digits only). */
    whatsapp: "40732336300",
    email: "sales@dipmotors.ro",
    /** Opening hours, one line per row, e.g. "Luni – Vineri: 9:00 – 18:00\nSâmbătă: 10:00 – 14:00". */
    hours: "Luni – Vineri: 8:30 – 17:00\nSâmbătă: 9:00 – 13:30",
    /** What the map on the contact page searches for. */
    mapsQuery: "Calea București nr. 168, Brașov",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Dip%20Motors%2C%20Calea%20Bucure%C8%99ti%20nr.%20168%2C%20Bra%C8%99ov",
  },
  /**
   * The dealer's own accounts — add them here once they exist:
   * `{ id: "facebook", href: "https://…", icon: "/media/shared/icon_facebook.png" }`
   * (icons for facebook, tiktok, instagram and youtube are in `public/media/shared`).
   */
  socials: [
    { id: "facebook", href: "https://www.facebook.com/lepasbrasov", icon: "/media/shared/icon_facebook.png" },
    { id: "instagram", href: "https://www.instagram.com/lepasbrasov", icon: "/media/shared/icon_instagram.png" },
    { id: "tiktok", href: "https://www.tiktok.com/@lepasbrasov", icon: "/media/shared/icon_tiktok.png" },
  ] as { id: string; href: string; icon: string }[],
} as const;
