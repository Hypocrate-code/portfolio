"use client"

// import { localesAvailableType } from "@/traductions/config"
import { t, t_Data } from "@/utils/L2A/traduction"
import styles from "./TimelineSection.module.css"
import { useContext } from "react"
import { translationContext } from "@/contexts/LangContext"
import ContainerBarToShow from "@/app/lezartsaki/public/ui/ContainerBarToShow"
import DateOnTimeline from "./DateOnTimeline"

export interface Date {
    title: string,
    text: string,
    alt: string,
    url: string,
    secondUrl?: string,
    secondAlt?: string,
    boldStrings?: string[],
    redStrings?: string[]
}

function TimelineSection() { 
    const { page } = useContext(translationContext)
    const dates : Date[] = JSON.parse(JSON.stringify(t_Data(page, "timeline.dates")))
    const lastDate : Date = JSON.parse(JSON.stringify(t_Data(page, "timeline.lastDate")))
    return (
        <section className={styles.section}>
            <ContainerBarToShow>
                <h2 className={styles.h2}>{t(page, "timeline.title")}</h2>
            </ContainerBarToShow>
            {dates.map(date => <DateOnTimeline date={date} key={date["title"]}/>)}
            <DateOnTimeline date={lastDate}/>
        </section>
    )
}

export default TimelineSection