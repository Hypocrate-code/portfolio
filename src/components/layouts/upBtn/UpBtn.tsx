'use client'
import img from "@/app/lezartsaki/public/ui/assets/go-up.png"
import textImg from "@/app/lezartsaki/public/ui/assets/text-go-up.png"
import Image from "next/image"
import style from "./UpBtn.module.css"
import { useState, useEffect, useRef } from "react"
import showOrHideEl from "@/utils/L2A/showOrHideEl"

function UpBtn() {
    const [isScrolledEnough, setIsScrolled] = useState(false)
    const btnRef = useRef<HTMLAnchorElement>(null)
    useEffect(()=>{
        showOrHideEl(setIsScrolled, false, btnRef)
        window.addEventListener('scroll', ()=> showOrHideEl(setIsScrolled, false, btnRef))
        window.addEventListener('resize', ()=> showOrHideEl(setIsScrolled, false, btnRef))
        return () => {
            window.removeEventListener('scroll', ()=> showOrHideEl(setIsScrolled, false, btnRef))
            window.removeEventListener('resize', ()=> showOrHideEl(setIsScrolled, false, btnRef))
        }
    }, [])
  return (
    <a ref={btnRef} className={`${style.upBtn} ${isScrolledEnough && style.visible}`} href="#top">
        <Image src={img} alt="go to the top of the website" width={100} height={100}/>
        <Image src={textImg} alt="go to the top of the website" width={50} height={50}/>
    </a>
  )
}

export default UpBtn