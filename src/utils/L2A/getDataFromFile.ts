import { localesAvailableType } from "@/traductions/config";
import { JSONData } from "./traduction";
import { ITranslationObject } from "@/contexts/LangContext";

export default async function getDataFromFile(prefix : string, lang : localesAvailableType) : Promise<JSONData> {
    if (lang in ["favicon.ico", "robots.txt"]) {
        console.log(lang);
        return {}
    } 
    const translations : JSONData = await import(`@/traductions/${prefix}_${lang}.json`);
    return translations
}

export async function getTranslationContextValue(lang: localesAvailableType, page: string) : Promise<ITranslationObject> {
    const pageTranslations = JSON.parse(JSON.stringify(await getDataFromFile(page, lang)));
    const commonTranslations = JSON.parse(JSON.stringify(await getDataFromFile('common', lang)));
    return {
        "page": pageTranslations,
        "common": commonTranslations,
        lang
    }
}