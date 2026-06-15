import type { localesAvailableType } from "@/traductions/config";
import { Metadata } from "next";
import { generateTraducedMetada } from "@/utils/L2A/metadata";
import LogoForMobile from "@/app/lezartsaki/public/ui/logoForMobile";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import TranslationContextProvider from "@/contexts/LangContext";
import { getTranslationContextValue } from "@/utils/L2A/getDataFromFile";
import TitleSection from "@/components/TitleSection";
import ContainerBarToShow from "@/app/lezartsaki/public/ui/ContainerBarToShow";
import { t } from "@/utils/L2A/traduction";
import styles from "./page.module.css";
import Map from "./Map";
import Link from "next/link";

export async function generateMetadata({ params }: { params?: Promise<{ lang: localesAvailableType }> }): Promise<Metadata> {
  const {lang} = await (params as Promise<{ lang: localesAvailableType }>);
  return generateTraducedMetada("infos", lang)
}

export default async function Infos({ params }: { params?: Promise<{ lang: localesAvailableType }> }) {  
  const {lang} = await (params as Promise<{ lang: localesAvailableType }>);
  const translations = await getTranslationContextValue(lang, "infos")
  const { page } = translations
  return (
    <TranslationContextProvider translationsObject={translations}>
      <DefaultLayout>
        <LogoForMobile/>
        <TitleSection page={page}/>
        <section className={styles.section}>
          <ContainerBarToShow>
            <h2>{t(page, "ourAdressTitle")}</h2>
          </ContainerBarToShow>
          <div className={styles.infoContainer}>
            <p><b>{t(page, "adressHeader")}</b> :</p>
            <p>{t(page, "adress")}</p>
          </div>
          <ContainerBarToShow>
            <h2>{t(page, "adressCartoTitle")}</h2>
          </ContainerBarToShow>

          <div className={styles.withMapBigContainer}>
            <div className={styles.infosContainer}>
              <div className={styles.infoContainer}>
                <p><b>{t(page, "websiteHeader")}</b> :</p>
                <Link href={t(page, "cartonnerie.website")} target="_blank"><u>{t(page, "cartonnerie.website")}</u></Link>
              </div>
              <div className={styles.infoContainer}>
                <p><b>{t(page, "adressHeader")}</b> :</p>
                <Link href="https://www.cartonnerie.fr" target="_blank">{t(page, "cartonnerie.adress")}</Link>
              </div>
              <div className={styles.infoContainer}>
                <p><b>{t(page, "phoneHeader")}</b> :</p>
                <p>{t(page, "cartonnerie.phone")}</p>
              </div>
              <div className={styles.infoContainer}>
                <p><b>{t(page, "mailHeader")}</b> :</p>
                <p>{t(page, "cartonnerie.mail")}</p>
              </div>
            </div>
            <Map/>
          </div>

        </section>
      </DefaultLayout>
    </TranslationContextProvider>
  );
}