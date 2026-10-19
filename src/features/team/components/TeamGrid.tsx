import clsx from "clsx";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { panel } from "@/shared/ui/switchgear";
import type { TeamMember } from "../content";
import styles from "./Team.module.css";

/** Cards with a portrait (when there is one), name, role and (when filled in) direct phone and e-mail. */
export function TeamGrid({ members }: { members: TeamMember[] }) {
  const t = useTranslations("team");

  return (
    <ul className={styles.grid}>
      {members.map((member) => (
        <li key={member.id} className={clsx(panel.surface, styles.card)}>
          {member.photo && (
            <div className={styles.photo}>
              <Image src={member.photo} alt={member.name} fill sizes="(max-width: 767px) 45vw, 22vw" />
            </div>
          )}
          <div className={styles.body}>
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.role}>{t(`roles.${member.role}`)}</p>
            {(member.phone || member.email) && (
              <p className={styles.links}>
                {member.phone && (
                  <a href={`tel:${member.phone.replace(/\s+/g, "")}`} aria-label={`${t("call")}: ${member.name}`}>
                    {member.phone}
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} aria-label={`${t("email")}: ${member.name}`}>
                    {member.email}
                  </a>
                )}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
