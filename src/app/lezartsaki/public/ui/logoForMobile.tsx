"use client"
import logo from "./assets/logo_nobg.png"
import Image from "next/image"
import styles from "./logoForMobile.module.css"
import { useContext } from "react"
import { translationContext } from "@/contexts/LangContext"

function LogoForMobile() {
  const { lang } = useContext(translationContext)
  return (
    <a className={styles.logoForMobile} href={`/lezartsaki/${lang}`}>
      <Image src={logo} alt="Logo Lez Arts Aki" height={40} width={40}/>
    </a>
  )
}

export default LogoForMobile