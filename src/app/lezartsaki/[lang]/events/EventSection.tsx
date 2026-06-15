"use client"
import { useRef } from "react";
import { JSONData } from "@/utils/L2A/traduction"
import { t_Data } from "@/utils/L2A/traduction"
import YearEl from "./YearEl";
import styles from "./EventSection.module.css"

type ratioImg = "horizontal" | "vertical";

export interface Event {
    "date": string,
    "artists": string,
    "where": string
}
export interface Year {
    "year": number,
    "img": string,
    "altImg": string,
    "ratioImg": ratioImg,
    "events": Event[],
    "redirect"?: string,
    "redirectTitle"?: string,
}

function EventSection({page}: {page: JSONData}) {
    const years : Year[] = JSON.parse(JSON.stringify(t_Data(page, "years")))
    const bigYearTitle = useRef<HTMLHeadingElement>(null)
    return (
        <section className={styles.section}>
            <div className={styles.bigYearContainer}>
                <h2 ref={bigYearTitle}>{years[0].year}</h2>
            </div>
            {years.map((year) =><YearEl key={year.altImg} year={year} isLink={year.redirect != undefined && year.redirectTitle != undefined && year.redirect != "" && year.redirectTitle != ""} refOfBigTitle={bigYearTitle}/>)}
        </section>
    )
}

export default EventSection