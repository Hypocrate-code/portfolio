"use client"
import Link from "next/link"
import styles from "./NavbarEl.module.css"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { titleToLink } from "@/utils/L2A/listOfTitlesForNavBar"

function NavbarEl({ link, title } : { link : string, title : string }) {
    const [location, setLocation] = useState("")
    const { lang } = useParams()
    const totalLink = "/" + lang + link
    useEffect(() => {
        setLocation(window.location.pathname);
    })
    return (
        <div className={styles.navbarEl}>
            <Link className={totalLink === location || link + lang === location ? styles.current : ""} href={link}>
                {titleToLink(title) ? <Image width={105} height={35} src={titleToLink(title) || ""} alt={"Logo " + title}/> : title}
            </Link>
        </div>
    )
}

export default NavbarEl