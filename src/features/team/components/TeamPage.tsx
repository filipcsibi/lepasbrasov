import { getTranslations } from "next-intl/server";
import { CreastaButton } from "@/shared/ui/creasta";
import { teamMembers } from "../content";
import { TeamGrid } from "./TeamGrid";
import styles from "./Team.module.css";

/** Team page: who the visitor will meet at the showroom. People are listed in `content.ts`. */
export async function TeamPage() {
  const t = await getTranslations("team");

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{t("eyebrow")}</p>
        <h1 className={styles.title}>{t("title")}</h1>
        <p className={styles.text}>{t("text")}</p>
      </header>
      <TeamGrid members={teamMembers} />
      <div className={styles.actions}>
        <CreastaButton href="/contact" tint="var(--color-accent)">
          {t("contact")}
        </CreastaButton>
      </div>
    </div>
  );
}
