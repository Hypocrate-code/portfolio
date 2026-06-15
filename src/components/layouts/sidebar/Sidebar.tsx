"use client"
import React, { UIEventHandler } from "react"
import styles from "./Sidebar.module.css"
import getListOfLinksForNavEl from "@/utils/L2A/listOfTitlesForNavBar"
import { translationContext } from "@/contexts/LangContext"
import { useContext } from "react"
import SidebarEl from "./SidebarEl"

export default function Sidebar({
    isOpen,
    isOpenSwitch,
}: {
    isOpen: boolean;
    isOpenSwitch: UIEventHandler;
}) {
    const translations = useContext(translationContext)
    const titles = getListOfLinksForNavEl(translations["common"])
    return (
        <nav className={`${styles.sidebarContainer} ${isOpen ? styles.visible : ''}`}>
            <div
                className={styles.sidebar}>
                {Object.entries(titles).map(([link, title]) => (
                    <SidebarEl
                        isOpenSwitch={isOpenSwitch}
                        title={title}
                        key={link}
                        link={link.includes('#') ? link : `/${translations.lang}${link}`}
                    />
                ))}
            </div>
        </nav>
    );
}
