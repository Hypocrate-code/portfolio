"use client"
import { UIEventHandler, useEffect, useState, useRef } from "react";
import styles from "./SidebarBtn.module.css"
import sideBarStyle from "./Sidebar.module.css"
import showOrHideEl from "@/utils/L2A/showOrHideEl";


function SidebarBtn({ isOpen, onClickHandler } : { isOpen: boolean, onClickHandler : UIEventHandler }) {
    const [isScrolledEnough, setIsScrolled] = useState(false)
    const btnRef = useRef<HTMLButtonElement | null>(null)
    useEffect(()=>{
        showOrHideEl(setIsScrolled, isOpen || window.innerWidth <= 750, btnRef)
        window.addEventListener('scroll', ()=> showOrHideEl(setIsScrolled, isOpen || window.innerWidth <= 750, btnRef))
        window.addEventListener('resize', ()=> showOrHideEl(setIsScrolled, isOpen || window.innerWidth <= 750, btnRef))
        return () => {
            window.removeEventListener('scroll', ()=> showOrHideEl(setIsScrolled, isOpen || window.innerWidth <= 750, btnRef))
            window.removeEventListener('resize', ()=> showOrHideEl(setIsScrolled, isOpen || window.innerWidth <= 750, btnRef))
        }
    }, [isOpen])
    return (
        <button ref={btnRef} onClick={onClickHandler} className={`${styles.sidebarBtn} ${isScrolledEnough ? sideBarStyle.visible : ""} ${isOpen ? styles.active : styles.inactive}`}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
        </button>
    )
}

export default SidebarBtn