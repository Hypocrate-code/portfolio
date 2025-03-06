import styles from "../page.module.css"
import { dRefTable, dStateOfGame } from "../page"
import { SetStateAction, Dispatch, RefObject } from "react";
import { useState } from "react";
import Image from "next/image";
import img from './logo.png'
import switchScreen from "@/utils/FTP_switch_screen";
import Word from "./Word";

const MAX_NUMBER_OF_PEARS = 3;

export type dPostData = {key: string, value: string, words: string[], dictValue: string, soluce?: boolean}

function GameScreen({ 
  refs,
  optionWordsProperties, 
  wordsToChooseFrom,
  toFindWordProperties, 
  languageChooser, 
  setStateOfGame
}: { 
  refs: dRefTable, 
  optionWordsProperties: { getter: string[], setter: Dispatch<SetStateAction<string[]>> }, 
  wordsToChooseFrom: { getter: string[], setter: Dispatch<SetStateAction<string[]>> },
  toFindWordProperties: { getter: string, setter: Dispatch<SetStateAction<string>> }, 
  languageChooser: RefObject<HTMLSelectElement | null>, 
  setStateOfGame: Dispatch<SetStateAction<dStateOfGame | null>>,
}) {
  const [numberOfPear, setNumberOfPear] = useState(MAX_NUMBER_OF_PEARS);
  const [blinkWord, setBlinkWord] = useState<string>("");
  const sendPostRequest = async (data: dPostData, isGood? : boolean): Promise<number> => {
    try {

      if(isGood) {
        setNumberOfPear(MAX_NUMBER_OF_PEARS);
        setBlinkWord("")
      }
      else if (numberOfPear === 0) {
        return 3;
      }

      const response = await fetch("/api/FTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        setStateOfGame("Bugged");
        switchScreen("gameScreenRef", "endScreenRef", refs)
        console.log(response);
        return 0;
      }

      else if (result["state"] === 0) {
        setNumberOfPear(numberOfPear - 1);
        console.log("numberOfPear");
        if(numberOfPear === 1) {
          data.soluce = true;
          const finalResponse = await fetch("/api/FTP", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          
          const finalResult = await finalResponse.json();
          console.log(finalResult);
          setBlinkWord(finalResult["answer"][0])
        }
      }

      else {
        setNumberOfPear(MAX_NUMBER_OF_PEARS);
        wordsToChooseFrom.getter.length > 1 && toFindWordProperties.setter(result["newTrad"])
        wordsToChooseFrom.setter(result["words"])
        if (result["state"] === 2) {
          setStateOfGame("Win");
          switchScreen("gameScreenRef", "endScreenRef", refs)
        }
      }
      console.log("Réponse:", result);
      return result["state"]

    } catch (error) {
      console.error("Erreur:", error);
      setStateOfGame("Bugged");
      switchScreen("gameScreenRef", "endScreenRef", refs)
      return 0
    }
  };

  return (
    <div className={styles.fullScreenContainer} ref={refs["gameScreenRef"]}>
      <div className={`${styles.container} ${styles.gameContainer}`}>
        <div className={styles.gamePearsContainer}>
            {Array.from({ length: MAX_NUMBER_OF_PEARS }, (_, index) => (
              <Image src={img} className={`${styles.gamePear} ${ index >= numberOfPear ? styles.darkPear : ""}`} alt="Icon of Find The Pear to indicate health point" width={40} height={40} key={index} />
            ))}
        </div>
        <h2>Find this word's peer !</h2>
        <p className={styles.word}>{toFindWordProperties.getter}</p>
        <div className={styles.wordsContainer}>
          {optionWordsProperties.getter.map(word =>

            <Word data={{
                  value: toFindWordProperties.getter,
                  key: word,
                  words: wordsToChooseFrom.getter, 
                  dictValue: languageChooser.current?.value || "none" 
                }}
              isDone={!wordsToChooseFrom.getter.includes(word)}
              isBlinking={word === blinkWord}
              method={sendPostRequest}
              key={word} 
              word={word}
            /> 
          )}
        </div>
      </div>
    </div>
  )
}

export default GameScreen