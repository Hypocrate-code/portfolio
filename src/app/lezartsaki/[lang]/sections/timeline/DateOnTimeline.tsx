import Image from "next/image"
import ContainerBarToShow from "@/app/lezartsaki/public/ui/ContainerBarToShow"
import styles from "./DateOnTimeline.module.css"
import { Date } from "./TimelineSection";
import { useState, useEffect, useRef } from "react";
import { addBold, addRed } from "@/utils/L2A/addInlineStyle";

function DateOnTimeline( { date } : {date: Date} ) {
  const { title, url, text, alt, secondUrl, secondAlt, boldStrings, redStrings} = date;
  const dateRef = useRef(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const [isSeen, setSeen] = useState(false)
  useEffect(() => {
    if (textRef.current && boldStrings && redStrings) {
      textRef.current.innerHTML = addRed(addBold(text, boldStrings), redStrings)
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const others = entry.target.parentElement?.children
        if(others) {
          // const index = Array.from(others).indexOf(entry.target)
          // const previous = others[Array.from(others).indexOf(entry.target) - 1]          
          // if (index > 1) {
          //   previous?.children[1].addEventListener('transitionend', ()=>{
          //     setSeen(true);
          //     observer.disconnect();
          //   })
          // }
          
          setSeen(true);
          observer.disconnect();  
          
        } 
      }
    }, {rootMargin: "-70px"});
    if (dateRef.current) {
      observer.observe(dateRef.current);
    }
    return () => {
      if (dateRef.current) {
        observer.unobserve(dateRef.current);
      }
    }
  }, [])
  return (
    <div ref={dateRef} className={`${styles.dateContainer} ${isSeen && styles.seen}`}>
      <div className={styles.titleBox}>
        <ContainerBarToShow>
          <h3>{title}</h3>
        </ContainerBarToShow>
        {secondUrl && <Image
          src={secondUrl}
          alt={secondAlt ? secondAlt : ""}
          width={230}
          height={350}
        />}
      </div>
      <div className={styles.dotAndLineContainer}>
        <div className={styles.dot}></div>
      </div>
      <div className={styles.content}>
          <p ref={textRef}>{text}</p>
          <Image
          src={url}
          alt={alt}
          width={300}
          height={200}/>
      </div>
    </div>
  )
}

export default DateOnTimeline