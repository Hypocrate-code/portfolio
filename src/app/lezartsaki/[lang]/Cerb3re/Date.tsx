"use client"
import styles from "./Date.module.css"
import { JSONData, t_Data } from '@/utils/L2A/traduction';
import ContainerBarToShow from '@/app/lezartsaki/public/ui/ContainerBarToShow';
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IDayContent } from "./page";


export default function Date({page, date}: {page: JSONData, date: string}) {
    const content : IDayContent = JSON.parse(JSON.stringify(t_Data(page, date)));
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        setIsDesktop(window.innerWidth > 600);
        window.addEventListener('resize', ()=> {
            setIsDesktop(window.innerWidth > 600);
        })
    }, []) 
    return (
        <section className={styles.section}>
            <ContainerBarToShow>
                <h2>{content.title}</h2>
            </ContainerBarToShow>
            <Image
                className={styles.img}
                src={isDesktop ? content.desktopImg : content.mobileImg }
                alt={content.altPoster}
                width={isDesktop ? 900 : 400}
                height={isDesktop ? 240 : 325}
            />
            <p>{content.text}</p>
            <Link target="_blank" href={content.link}>{content.btnText}</Link>
        </section>
    );
    }