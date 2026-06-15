"use server"
import type { localesAvailableType } from "@/traductions/config";
import { Metadata } from "next";
import { generateTraducedMetada } from "@/utils/L2A/metadata";
// import LogoForMobile from "@/app/lezartsaki/public/ui/logoForMobile";
// import DefaultLayout from "@/components/layouts/DefaultLayout";
// import TranslationContextProvider from "@/contexts/LangContext";
// import { getTranslationContextValue } from "@/utils/L2A/getDataFromFile";
// import Video from "./Video";
// import Date from "./Date";
import Error from "../[...notFound]/page";


export async function generateMetadata({ params }: { params?: Promise<{ lang: localesAvailableType }> }): Promise<Metadata> {
  const {lang} = await (params as Promise<{ lang: localesAvailableType }>);
  return generateTraducedMetada("Cerb3re", lang)
}

interface NetworkInformation extends EventTarget {
    readonly effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
    onchange?: EventListener;
  }  
  declare global {
    interface Navigator {
      connection?: NetworkInformation;
    }
}

export interface IDayContent {
    "title": string,
    "mobileImg": string,
    "desktopImg": string,
    "text": string,
    "link": string,
    "btnText": string,
    "altPoster": string
}

export default async function Events({ params }: { params?: Promise<{ lang: localesAvailableType }> }) {
  return Error({params});
  // const translations = await getTranslationContextValue(params.lang, "Cerb3re")
  // const { page } = translations;
  // return (
  //   <TranslationContextProvider translationsObject={translations}>
  //     <DefaultLayout>
  //       <LogoForMobile/>
  //       <Video page={page}/>
  //       <Date page={page} date="firstDate"/>
  //       <Date page={page} date="secondDate"/>
  //       <Date page={page} date="thirdDate"/>
  //     </DefaultLayout>
  //   </TranslationContextProvider>
  // );
}