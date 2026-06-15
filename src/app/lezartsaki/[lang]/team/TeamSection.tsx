"use client"
import MemberEl from "./MemberEl"
import styles from "./page.module.css"
import { useRef, useState, useEffect } from "react"

export interface Member {
    name: string,
    role: string,
    quote: string,
    img: string,
    fb?: string,
    ig?: string,
    group?: string
}

function TeamSection({ members }: { members : Member[]}) {
    const [widthContainer, setWidthContainer] = useState(1)
    const [width, setWidth] = useState(1)
    const teamSectionRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (teamSectionRef.current) {
            const computedStyle = window.getComputedStyle(teamSectionRef.current)
            setWidthContainer(parseInt(computedStyle.width) - (parseInt(computedStyle.paddingInline) * 2))
            setWidth(parseInt(window.getComputedStyle(teamSectionRef.current.children[0]).width))
        }
    }, [widthContainer, width])
    return (
        <section ref={teamSectionRef} className={styles.section}>
            {members.map((member, i) => {
                const n = Math.trunc(widthContainer / width)
                const nLastRow = (members.length % n) == 0 ? n : members.length % n 
                const inner_i = ((i) % n) + 1
                return <MemberEl key={member.name} i={inner_i} n={(i >= ((Math.trunc(members.length / n)*n)) ? nLastRow : n)} member={member}/>
            })}
        </section>
    )
}

export default TeamSection