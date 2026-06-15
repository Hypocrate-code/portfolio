"use client"
import styles from "./Carousel.module.css"
import Image from "next/image"
import { translationContext } from "@/contexts/LangContext"
import { useContext } from "react"
import { t } from "@/utils/L2A/traduction"

// type Images = {[key: string]: string}

function Carousel() {
  const { page } = useContext(translationContext)
  const images = [
    {
      "src": "/lezartsaki/assets/home/carousel/L2A - LANDMVRKS-3.jpg",
      "alt": t(page, 'hero.alts.Landmvrks')
    },
    {
      "src": "/lezartsaki/assets/home/carousel/L2A - TAGADA.jpg",
      "alt": t(page, 'hero.alts.tagada')
    },
    {
      "src": "/lezartsaki/assets/home/carousel/L2A - THE DEVIL WEARS PRADA-16.jpg",
      "alt": t(page, 'hero.alts.theDevilWearsPrada')
    },
    {
      "src": "/lezartsaki/assets/home/carousel/L2A - CROWD-10.jpg",
      "alt": t(page, 'hero.alts.crowd')
    }
  ]
  return (
    <div className={`${styles.carouselContainer} ${styles.active}`}>
        <div className={styles.carousel}>
            {images.map((el) => <Image
            className={styles.img}
            loading="lazy"
            src={el.src}
            width={1000}
            height={650}
            alt={el.alt}
            key={el.src}/>
          )}
          <Image
          className={styles.img}
          loading="lazy"
          alt={images[0].alt}
          src={images[0].src}
          width={1000}
          height={650}
          />
        </div>
    </div>
  )
}

export default Carousel