"use client"
import Link from "next/link"
import { t } from "@/utils/L2A/traduction"
import stylesFBox from "./FooterBox.module.css"
import styles from "./FooterUtils.module.css"
import ContainerBarToShow from "@/app/lezartsaki/public/ui/ContainerBarToShow"
import { useContext } from "react"
import { translationContext } from "@/contexts/LangContext"

function FooterUtils() {
  const { lang, common } = useContext(translationContext)
  return (
    <div className={`${stylesFBox.footerBox} ${styles.footerBox}`}>
      <ContainerBarToShow>
        <h3>{t(common, "footer.utils.title")}</h3>
      </ContainerBarToShow>
      <div className={stylesFBox.footerBoxContent}>
        <Link href={`/lezartsaki/${lang}/infos`}>{t(common, "footer.utils.links.infos")}</Link>
        <a download="Mentions-légales.pdf" href="./legals/mentions-légales.pdf" target="_blank" rel="noopener noreferrer">{t(common, "footer.utils.links.mentions")}</a>
        <a download="CGU.pdf" href="./legals/CGU.pdf" target="_blank" rel="noopener noreferrer">{t(common, "footer.utils.links.cgu")}</a>
        <a download="Politique-de-confidentialité-rgpd.pdf" href="./legals/Politique-de-confidentialite-rgpd.pdf" target="_blank" rel="noopener noreferrer">{t(common, "footer.utils.links.confidPolicy")}</a>
      </div>
    </div>
  )
}

export default FooterUtils