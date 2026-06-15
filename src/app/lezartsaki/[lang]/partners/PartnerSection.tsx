"use client"
import { JSONData } from "@/utils/L2A/traduction";
import styles from "./page.module.css"
import { useEffect, useRef, useState } from "react";
import { t, t_Data } from "@/utils/L2A/traduction";
import PartnerEl from "./PartnerEl";

export interface Partner {
    "name" : string,
    "description": string,
    "logo": string,
    "link": string 
  }  

function PartnerSection({page}: {page: JSONData}) {
    const partners : Partner[] = JSON.parse(JSON.stringify(t_Data(page, "partners")))
    const [columnCount, setColumnCount] = useState(3)
    const alt = t(page, "alt");
    const redirectionTitle = t(page, "redirection");
    const partnerSectionRef = useRef<HTMLDivElement>(null)
    const groupData = (data: Partner[], cc: number): Partner[][] => {
      const result: Partner[][] = Array.from({ length: cc }, () => []);
    
      data.forEach((item, index) => {
        result[index % cc].push(item);
      });
    
      return result;
    };
    const finalData = groupData(partners, columnCount);
    useEffect(() => {
        if (partnerSectionRef.current) {
          const newColumnCount = parseInt(window.getComputedStyle(partnerSectionRef.current).columnCount); 
          setColumnCount(newColumnCount)
          console.log((partners.length+1) / newColumnCount);
        }
    }, [])
  return (
    <section ref={partnerSectionRef} className={styles.partnerSection}>
        {
        finalData.map((group, i) =>
          group.map((partner, index) => (
            <PartnerEl count={Math.trunc(( index + i )/(Math.ceil(partners.length / columnCount)))} key={partner.name} partner={partner} alt={alt} redirectionTitle={redirectionTitle}/>
          ))
        )}
    </section>
  )
}

export default PartnerSection