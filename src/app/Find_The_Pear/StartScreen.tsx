"use client"
import { useState, useRef } from "react"
import styles from "./page.module.css"
import img from './logo.png'
import Image from "next/image"
import RangeSlider from "./RangeSlider"
import { dRefTable } from "./page"
import { Dispatch, SetStateAction } from "react"


function StartScreen({ refs, setToFindWord, setOptionWords }: { refs: dRefTable, setToFindWord: Dispatch<SetStateAction<string>>, setOptionWords: Dispatch<SetStateAction<string[]>> }) {
    const [n, setValue] = useState<number>(10);
    const languageChooser = useRef<HTMLSelectElement>(null)
    const [alertText, setAlertText] = useState('')
    const fetchWords = () => {
        // if (value != undefined && pathsSource.includes(value as dPaths)) {
        //     fetch(paths[value]).then((res)=>res.json()).then((resu) => getRandomElements(resu, n))
        // }
    }
    async function fetchData(value: string | undefined, n: number): Promise<boolean> {
        if (value == "none") {
            setAlertText('Veuillez choisir une valeur.')
            return false
        }
        try {
            const res = await fetch(`/api/FTP?value=${value}&n=${n}`, {
                // headers: {
                //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`, // 🔒 Sécurité (garde la clé dans .env)
                // },
            });            
            if (!res.ok) {
                setAlertText("Accès non autorisé");
                return false
            };
            const json: {"optionWords": string[], "toFindWord": string} = await res.json();
            setOptionWords(json["optionWords"]);
            setToFindWord(json['toFindWord']);
            if (refs["startScreenRef"].current && refs["gameScreenRef"].current) {
                refs["startScreenRef"].current.style.display = "none"
                refs["gameScreenRef"].current.style.display = "block"
                return true
            }
            return false
        } catch (err: any) {
            console.log(err.message);
            return false
        }
    }

    return (
        <div className={styles.fullScreenContainer} ref={refs["startScreenRef"]}>
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <Image src={img} alt="logo" width={50} height={50}/>
                    <h1>Find The Pear</h1>
                </div>
                <p>A small game to learn vocabulary more interactively, a project made for a friend of mine, Paul.</p>
                <select ref={languageChooser} name="languageChooser" id="languageChooser">
                    <option value="none">- Choose your language -</option>
                    <option value="en_fr_normal_words">- English -</option>
                    <option value="en_fr_exp_and_fam">- English Expression & Familiar -</option>
                </select>
                <p className={styles.alertText} style={{display: alertText != "" ? "block" : "none"}}>{alertText}</p>
                <p>Words to load in your game : <span className={styles.counter}>{n}</span></p>
                <RangeSlider value={n} setValue={setValue}/>
                <button onClick={() => fetchData(languageChooser.current?.value, n)}>Launch Game</button>
            </div>
        </div>
    )
}

export default StartScreen