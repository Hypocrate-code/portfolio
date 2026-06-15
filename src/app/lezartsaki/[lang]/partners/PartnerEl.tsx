"use client"
import ContainerBarToShow from "@/app/lezartsaki/public/ui/ContainerBarToShow"
import { Partner } from "./PartnerSection"
import styles from "./page.module.css"
import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"

function PartnerEl(
    { 
      partner,
      alt,
      redirectionTitle,
      count
    }: {
      partner: Partner,
      alt: string,
      redirectionTitle: string,
      count: number
    }
) {
  const refOfThisEl = useRef<HTMLDivElement>(null)
  const [hasBeenSeen, setSeen] = useState(false)
  useEffect(()=>{
    refOfThisEl.current?.style.setProperty('animation-delay', `${count*0.1}s`)
  })
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {        
        setSeen(true);
        observer.disconnect();
      }
    }, {rootMargin : "0px 0px -55px 0px"});
    if (refOfThisEl.current) {
      observer.observe(refOfThisEl.current);
    }
    return () => {
      if (refOfThisEl.current) {
        observer.unobserve(refOfThisEl.current);
      }
    };
  }, []);
  console.log(partner.logo)
  return (
    <div ref={refOfThisEl} className={`${styles.partnerEl} ${hasBeenSeen ? styles.visible : ""}`}>
      <Image src={partner.logo} alt={alt + partner.name} width={300} height={300}/>
      <ContainerBarToShow>
        <h2>{partner.name}</h2>
      </ContainerBarToShow>
      <p>{partner.description}</p>
      <Link target="_blank" href={partner.link}>{redirectionTitle}</Link>
    </div>
  )
}

export default PartnerEl