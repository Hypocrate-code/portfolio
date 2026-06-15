"use client"
import styles from "./CovidSection.module.css"
import ContainerBarToShow from "@/app/lezartsaki/public/ui/ContainerBarToShow"
import { useContext, useEffect, useRef } from "react"
import { translationContext } from "@/contexts/LangContext"
import { t, t_Data } from "@/utils/L2A/traduction"
import VideoComponent from "./VideoComponent"
import { addBold, addRed } from "@/utils/L2A/addInlineStyle"

export interface Video {
    "image": string,
    "title": string,
    "by": string,
    "link": string
}

function CovidSection() {
    const { page } = useContext(translationContext);
    const videos : Video[] = JSON.parse(JSON.stringify(t_Data(page, "covid.videos")))
    const clickTitle = t(page, "covid.videoClickTitle")
    const redWords : string[] = JSON.parse(JSON.stringify(t_Data(page, "covid.redStrings")))
    const boldWords : string[] = JSON.parse(JSON.stringify(t_Data(page, "covid.boldStrings")))
    const text = t(page, "covid.paragraph");
    const paragraph = useRef<HTMLParagraphElement>(null)
    useEffect(() => {
        if (paragraph.current && redWords && boldWords) {
            paragraph.current.innerHTML =  addRed(addBold(text, boldWords), redWords)  
        }
    }, [])
    return (
        <section className={styles.section}>
            <ContainerBarToShow>
                <h2 className={styles.h2}>{t(page, "covid.title")}</h2>
            </ContainerBarToShow>
            <p className={styles.paragraph} ref={paragraph}>{text}</p>
            <div className={styles.videosContainer}>
                {videos.map(video => <VideoComponent key={video.image} video={video} clickTitle={clickTitle}/>)}
            </div>
        </section>
    )
}

export default CovidSection