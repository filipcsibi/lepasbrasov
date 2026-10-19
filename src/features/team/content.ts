/**
 * The showroom team, in the order shown on `/team`.
 * Role labels are translated in `messages/<locale>/team.json` → `roles`.
 *
 * `photo` is optional (a portrait in `public/media/team/…`, ideally 4:5) — without one the card is text only.
 * Empty `phone` / `email` are not shown.
 */
export type TeamMember = {
  id: string;
  name: string;
  role: "salesDirector" | "sales";
  photo?: string;
  phone?: string;
  email?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "cristian-tion",
    name: "Cristian Țion",
    role: "salesDirector",
    photo: "/media/team/cristian-tion.jpg",
  },
];
