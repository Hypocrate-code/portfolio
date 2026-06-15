"use client"
import Link from "next/link"
import Image from "next/image"
import { t } from "@/utils/L2A/traduction"
import stylesFBox from "./FooterBox.module.css"
import styles from "./FooterFollow.module.css"
import ytbIcon from '@/app/lezartsaki/public/ui/assets/ytb-icon.svg'
import fbIcon from '@/app/lezartsaki/public/ui/assets/facebook-icon.svg'
import igIcon from '@/app/lezartsaki/public/ui/assets/ig-icon.svg'
import ContainerBarToShow from "@/app/lezartsaki/public/ui/ContainerBarToShow"
import { useContext } from "react"
import { translationContext } from "@/contexts/LangContext"


function FooterFollow() {
    const translations = useContext(translationContext)["common"]
    return (
        <div className={`${stylesFBox.footerBox} ${styles.footerBox}`}>
            <ContainerBarToShow>
                <h3>{t(translations, "footer.follow.title")}</h3>
            </ContainerBarToShow>
            <div className={`${stylesFBox.footerBoxContent} ${styles.footerBoxContent}`}>
                <Link target="_blank" href="https://www.facebook.com/LezArtsAki">
                    <Image src={fbIcon} alt=""/>
                </Link>
                <Link target="_blank" href="https://www.instagram.com/LezArtsAki/">
                    <Image src={igIcon} width={44} height={44} alt=""/>
                </Link>
                <Link target="_blank" href="https://www.youtube.com/@LezArtsAki708">
                    <Image src={ytbIcon} width={44} height={44} alt=""/>
                </Link>
            </div>
        </div> 
    )
}

export default FooterFollow