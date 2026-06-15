import ContainerBarToShow from "@/app/lezartsaki/public/ui/ContainerBarToShow";
import styles from "./TitleSection.module.css"
import { JSONData } from "@/utils/L2A/traduction";
import { t } from "@/utils/L2A/traduction";


function TitleSection({page}: {page: JSONData}) {
  return (
    <section className={styles.titleSection}>
    <ContainerBarToShow>
      <h1>{t(page, "h1")}</h1>
    </ContainerBarToShow>
    <p>{t(page, "description")}</p>
  </section>
  )
}

export default TitleSection