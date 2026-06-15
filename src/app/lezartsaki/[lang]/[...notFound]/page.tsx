import type { localesAvailableType } from "@/traductions/config";
import { Metadata } from "next";
import { generateTraducedMetada } from "@/utils/L2A/metadata";
import LogoForMobile from "@/app/lezartsaki/public/ui/logoForMobile";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import TranslationContextProvider from "@/contexts/LangContext";
import { getTranslationContextValue } from "@/utils/L2A/getDataFromFile";
import TitleSection from "@/components/TitleSection";

export async function generateMetadata({ params }: { params?: Promise<{ lang: localesAvailableType }> }): Promise<Metadata> {
  const { lang } = await (params as Promise<{ lang: localesAvailableType }>);
  return generateTraducedMetada("404", lang)
}

export default async function Error({ params }: { params?: Promise<{ lang: localesAvailableType }> }) {  
  const { lang } = await (params as Promise<{ lang: localesAvailableType }>);
  const translations = await getTranslationContextValue(lang, "404")
  return (
    <TranslationContextProvider translationsObject={translations}>
      <DefaultLayout>
        <LogoForMobile/>
        <TitleSection page={translations.page}/>
      </DefaultLayout>
    </TranslationContextProvider>
  );
}