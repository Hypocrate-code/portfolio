import Carousel from "./Carousel";
import TextualContent from "./TextualContent";
import styles from "./HeroSection.module.css"

function HeroSection() {
  return (
    <section className={styles.section}>
        <TextualContent/>
        <Carousel/>
        <div className={styles.ovale}></div>
    </section>
  )
}

export default HeroSection