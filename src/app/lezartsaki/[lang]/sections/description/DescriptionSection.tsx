"use client"
import styles from "./DescriptionSection.module.css"
import Image from "next/image"
import ContainerBarToShow from "@/app/lezartsaki/public/ui/ContainerBarToShow"
import { t } from "@/utils/L2A/traduction"
import { useContext } from "react"
import { translationContext } from "@/contexts/LangContext"

function DescriptionSection() {
  const { page } = useContext(translationContext)
  const getQuoteElements = () => {
    const boldString = t(page, "descriptionSection.boldString")
    const redString = t(page, "descriptionSection.redString")
    const text = t(page, "descriptionSection.quote")
    const textForL2ABold = text.split(boldString);
    const textForL2ARed = textForL2ABold[1].split(redString)
    return [textForL2ABold[0], ...textForL2ARed, boldString, redString]
    return boldString
  };
  const quoteElements = getQuoteElements();
  const quote = <p className={styles.quote}>
  {quoteElements[0]}<span id="accentuate">{quoteElements[3]}</span>{quoteElements[1]}<u>{quoteElements[4]}</u>{quoteElements[2]}
  </p>
  return (
    <section id="know-more" className={styles.section}>
      <ContainerBarToShow>
        <h2 className={`${styles.h2} bar_to_show`}>{t(page, "descriptionSection.h2")}</h2>
      </ContainerBarToShow>
      <div className={styles.content}>
        <div className={styles.quoteContainer}>
          {quote}
          <p className={styles.author}><span id="accentuate">Ludo</span>, {t(page, "descriptionSection.author")}</p>
        </div>
        <Image
          src={"/lezartsaki/assets/home/description/LEZARTSAKI-B&W.jpg"}
          alt={t(page, "descriptionSection.alt")}
          width={200}
          height={200}
        />
      </div>
    </section>
  )
}

export default DescriptionSection