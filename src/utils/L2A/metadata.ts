import type { localesAvailableType } from "@/traductions/config";
import { t } from "./traduction";
import getDataFromFile from "./getDataFromFile";

interface MetadataContent {
  title : string,
  description : string,
  alternates: {
    canonical: string,
    languages: {
      'en': string,
      'fr': string
    }
  }
}

export async function generateTraducedMetada(page: string, lang : localesAvailableType ) : Promise<MetadataContent> {  
  const translations = await getDataFromFile("common", lang)
  const extension = page != "home" ? page : "";
  return {
    title: t(translations, `${page}.title`),
    description: t(translations, `${page}.description`),
    alternates: {
      canonical: `https://www.lezartsaki.fr/fr/${extension}`,
      languages: {
        'en': `https://www.lezartsaki.fr/en/${extension}`,
        'fr': `https://www.lezartsaki.fr/fr/${extension}`,
      }
    }
  }  
}