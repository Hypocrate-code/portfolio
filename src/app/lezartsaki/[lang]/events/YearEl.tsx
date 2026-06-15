
import EventEl from "./EventEl"
import { Year } from "./EventSection"
import Image from "next/image"
import styles from "./YearEl.module.css"
import { RefObject, useEffect, useRef, useState } from "react"
import Link from "next/link"

function YearEl({ year, refOfBigTitle, isLink } : { year : Year, refOfBigTitle: RefObject<HTMLHeadingElement | null>, isLink: boolean }) {
  const thisYearEl = useRef<HTMLDivElement>(null)
  const refOfGroupOfEvent = useRef<HTMLDivElement>(null)
  const [hasBeenSeen, setSeen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(1)
  useEffect(()=>{
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        observer.disconnect();
      }
    }, {rootMargin: "-170px"});
    if (refOfGroupOfEvent.current) {
      observer.observe(refOfGroupOfEvent.current);
    }
    if (window) {
      setWindowWidth(window.innerWidth)
      window.addEventListener('scroll', ()=>{
        if(refOfBigTitle.current && thisYearEl.current) {
          if(refOfBigTitle.current?.offsetTop >= thisYearEl.current?.offsetTop) {
            refOfBigTitle.current.innerText = year.year.toString()
          }
        }
      })
    }
    return () => {
      if (refOfGroupOfEvent.current) {
        observer.unobserve(refOfGroupOfEvent.current);
      }
    }
  }, [])
  return (
    <div ref={thisYearEl} className={`${styles.year} ${styles[year.ratioImg]}`}>
      {isLink && <Link target="_blank" className={styles.redirect} href={year.redirect || "https://www.cartonnerie.fr/"}>{year.redirectTitle || "Lien vers la billeterie"}</Link>}
      <div className={styles.imgContainer}>
        <Image src={year.img} alt={year.altImg} width={960} height={100}/>
        <div className={styles.imgYearContainer}>
          <h2>{year.ratioImg == "vertical" && windowWidth > 850 ? year.year - 2000 : year.year}</h2>
        </div>
      </div>
      <div ref={refOfGroupOfEvent} className={`${styles.eventContainer}  ${hasBeenSeen && styles.seen}`}>
        {year.events.map(event=> <EventEl key={event.date + year.events.indexOf(event)} isVertical={year.ratioImg == "vertical"} event={event}/>)}
      </div>
    </div>
  )
}

export default YearEl