import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getModel, ModelEquipment, models } from "@/features/models";
import { localizedAlternates } from "@/shared/lib/seo";

type Props = PageProps<"/[locale]/models/[slug]/equipment">;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => models.filter((m) => m.specSheet).map((m) => ({ locale, slug: m.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const model = getModel(slug);
  if (!model?.specSheet) return {};
  // Only models with an equipment page have `metaEquipment`; the cast stands for "lepasL8".
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: `models.${model.messagesKey}` as "models.lepasL8",
  });
  return {
    title: t("metaEquipment.title"),
    description: t("metaEquipment.description"),
    alternates: localizedAlternates({ pathname: "/models/[slug]/equipment", params: { slug } }, locale as Locale),
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const model = getModel(slug);
  if (!model?.specSheet) notFound();
  return <ModelEquipment model={model} />;
}
