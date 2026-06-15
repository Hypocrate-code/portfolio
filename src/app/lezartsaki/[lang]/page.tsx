import type { localesAvailableType } from "@/traductions/config";
import { Metadata } from "next";
import { generateTraducedMetada } from "@/utils/L2A/metadata";
import LogoForMobile from "../public/ui/logoForMobile";
import HeroSection from "./sections/hero/HeroSection";
import DescriptionSection from "./sections/description/DescriptionSection";
import TimelineSection from "./sections/timeline/TimelineSection";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import TranslationContextProvider from "@/contexts/LangContext";
import { getTranslationContextValue } from "@/utils/L2A/getDataFromFile";
import CovidSection from "./sections/covid/CovidSection";

export async function generateMetadata({ params }: { params?: Promise<{ lang: localesAvailableType }> }): Promise<Metadata> {
  const { lang } = await (params as Promise<{ lang: localesAvailableType }>);
  return generateTraducedMetada("home", lang);
}

export default async function Home({ params }: { params?: Promise<{ lang: localesAvailableType }> }) {
  const { lang } = await (params as Promise<{ lang: localesAvailableType }>);
  const translations = await getTranslationContextValue(lang, "home")
  return (
    <TranslationContextProvider translationsObject={translations}>
      <DefaultLayout>
        <LogoForMobile/>
        <HeroSection/>
        <DescriptionSection/>
        <TimelineSection/>
        <CovidSection/>
      </DefaultLayout>
    </TranslationContextProvider>
  );
}