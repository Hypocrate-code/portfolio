"use client"
import Link from "next/link"
import styles from "./Navbar.module.css"
import stylesNavEl from "./NavbarEl.module.css"
import NavbarEl from "./NavbarEl"
import { useContext } from "react"
import { translationContext } from "@/contexts/LangContext"
import getListOfLinksForNavEl from "@/utils/L2A/listOfTitlesForNavBar"


function Navbar() {
    const translations = useContext(translationContext)
    const titles = getListOfLinksForNavEl(translations["common"])    
    return (
        <nav id="top" className={`${styles.navbarContainer}`}>
            <div className={styles.navbar}>
                <div className={`${styles.navbarEl} ${styles.logo}`}>
                    <Link className={stylesNavEl.navbarEl} href={`/lezartsaki/${translations.lang}`}></Link>
                </div>
                {Object.entries(titles).map(([link, title]) => <NavbarEl title={title} key={Object.keys(titles).indexOf(link)} link={link.includes('#') ? link : `/lezartsaki/${translations.lang}${link}`}/>)}
            </div>
        </nav>
    )
}

export default Navbar