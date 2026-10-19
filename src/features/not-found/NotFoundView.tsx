import { getTranslations } from "next-intl/server";
import { KeyButton } from "@/shared/ui/switchgear";
import styles from "./NotFoundView.module.css";

export async function NotFoundView() {
  const t = await getTranslations("common");
  return (
    <section className={styles.page}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/shared/error_pic.png" alt="" className={styles.picture} />
      <h1 className={styles.code}>{t("notFound.title")}</h1>
      <p className={styles.text}>{t("notFound.text")}</p>
      <KeyButton href="/">{t("actions.backToHome")}</KeyButton>
    </section>
  );
}
