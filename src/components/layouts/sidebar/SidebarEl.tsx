"use client"
import Link from "next/link"
import styles from "./SidebarEl.module.css"
import { UIEventHandler, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { titleToLink } from "@/utils/L2A/listOfTitlesForNavBar"

function SidebarEl({ isOpenSwitch, link, title } : { isOpenSwitch: UIEventHandler ,link : string, title : string }) {
    const [location, setLocation] = useState("")
    const { lang } = useParams()
    const totalLink = "/lezartsaki" + link
    useEffect(() => {
        setLocation(window.location.pathname);
    })
    return (
            <div className={styles.sidebarEl}>
                <Link onClick={isOpenSwitch} className={totalLink === location || link + lang === location ? styles.current : ""} href={totalLink}>
                    {titleToLink(title) ? <Image width={105} height={35} src={titleToLink(title) || ""} alt={"Logo " + title}/> : title}
                </Link>
            </div>
        )
}

export default SidebarEl