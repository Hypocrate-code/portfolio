import { dRefTable } from "../page"
import styles from "../page.module.css"
import { dStateOfGame } from "../page"
import switchScreen from "@/utils/FTP_switch_screen"
import { Dispatch, SetStateAction } from "react"

function EndScreen({ 
    refs, 
    stateOfGame,
    optionWordsProperties,
    wordsToChooseFrom
 }: { 
    refs: dRefTable, 
    stateOfGame: dStateOfGame | null,
    optionWordsProperties: {getter: string[]},
    wordsToChooseFrom: {setter: Dispatch<SetStateAction<string[]>>}
}) {
    let smallText = "Default"
    if (stateOfGame === "Win") {
        smallText = "You're a real warrior !"
    }
    else if (stateOfGame === "Bugged") {
        smallText = "Contact Hypocr4te ASAP"
    }
    const resetGame = () => {
        wordsToChooseFrom.setter(optionWordsProperties.getter);
        switchScreen("endScreenRef", "gameScreenRef", refs);
    }
    return (
        <div className={styles.fullScreenContainer} ref={refs["endScreenRef"]}>
            <div className={`${styles.container} ${styles.endContainer} ${stateOfGame === "Win" ? styles.winGame : styles.lostGame}`}>
                <h2>{stateOfGame} !</h2>
                <p>{smallText}</p>
                <button onClick={() => resetGame()}>Retry Session</button>
                <button onClick={() => switchScreen("endScreenRef", 'startScreenRef', refs)}>Go to Title Screen</button>
            </div>
        </div>
  )
}

export default EndScreen