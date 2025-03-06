import { useRef } from "react"
import { dPostData } from "./GameScreen"
import styles from "../page.module.css"

function Word({
    data,
    method,
    word,
    isDone,
    isBlinking
}: {
    data: dPostData,
    method: (data: dPostData, isGood?: boolean) => Promise<number>,
    word: string,
    isDone: boolean,
    isBlinking: boolean
}) {
    const thisBtnRef = useRef<HTMLButtonElement>(null);
    const thisBtnChange = async () => {
        if (thisBtnRef.current) {
            if (thisBtnRef.current.classList.contains(styles.good) || thisBtnRef.current.classList.contains(styles.wrong)) return;
            const state : number | string = await method(data, isBlinking);
            if (state === 0) {
                thisBtnRef.current.classList.add(styles.wrong);
            }
            else if ((state === 1) && thisBtnRef.current.parentElement?.children) {
                Array.from(thisBtnRef.current.parentElement?.children).forEach(element => {
                    element.classList.remove(styles.wrong);
                });
            }
            // if (state === 3) {
            //     thisBtnRef.current.classList.add(styles.blinkBtn)
            // }
        }
    }
    return (
        <button className={`${isDone ? styles.good : ""} ${isBlinking ? styles.blinkBtn : ""}`} onClick={() => thisBtnChange()} ref={thisBtnRef}>{word}</button>
    )
}

export default Word