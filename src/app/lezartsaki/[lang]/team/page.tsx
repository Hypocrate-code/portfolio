import type { localesAvailableType } from "@/traductions/config";
import { Metadata } from "next";
import { generateTraducedMetada } from "@/utils/L2A/metadata";
import LogoForMobile from "@/app/lezartsaki/public/ui/logoForMobile";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import TranslationContextProvider from "@/contexts/LangContext";
import { getTranslationContextValue } from "@/utils/L2A/getDataFromFile";
import TitleSection from "@/components/TitleSection";
import TeamSection from "./TeamSection";
import { t_Data } from "@/utils/L2A/traduction";

export async function generateMetadata({ params }: { params?: Promise<{ lang: localesAvailableType }> }): Promise<Metadata> {
  const {lang} = await (params as Promise<{ lang: localesAvailableType }>);
  return generateTraducedMetada("team",lang)
}

export default async function Team({ params }: { params?: Promise<{ lang: localesAvailableType }> }) {
  const {lang} = await (params as Promise<{ lang: localesAvailableType }>);
  const translations = await getTranslationContextValue(lang, "team")
  const { page } = translations;
  const members = JSON.parse(JSON.stringify(t_Data(page, "members")))
  return (
    <TranslationContextProvider translationsObject={translations}>
      <DefaultLayout>
        <LogoForMobile/>
        <TitleSection page={page}/>
        <TeamSection members={members}/>
      </DefaultLayout>
    </TranslationContextProvider>
  );
}