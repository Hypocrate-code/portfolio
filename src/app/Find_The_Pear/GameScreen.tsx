import styles from "./page.module.css"
import { dRefTable } from "./page"
import { SetStateAction, Dispatch } from "react";
import { useState } from "react";

type dStateOfGame = "Launched" | "Lost" | "Win"

function GameScreen({ refs, optionWordsProperties, toFindWordProperties }: { refs: dRefTable, optionWordsProperties: { getter: string[], setter: Dispatch<SetStateAction<string[]>> } , toFindWordProperties: { getter: string, setter: Dispatch<SetStateAction<string>> } }) {
  const [numberOfPear, setNumberOfPear] = useState(3);
  const [stateOfGame, supSetStateOfGame] = useState<dStateOfGame>("Launched")
  const setStateOfGame = (state: dStateOfGame) => {
    if(state === "Launched") {
      setNumberOfPear(3);
    };
    if (state === "Lost") {
      setNumberOfPear(0);
    }
    else {

    };
    supSetStateOfGame(state);
  };
  const sendPostRequest = async (data: {key: string, value: string, words: string[]}) => {
    try {
      const response = await fetch("/api/FTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {        
        numberOfPear > 0 ? setNumberOfPear(numberOfPear - 1) : setStateOfGame("Lost")
      }
      else {
        toFindWordProperties.setter(result["newTrad"])
        optionWordsProperties.setter(result["words"]);
        if (optionWordsProperties.getter.length === 2) {
          setStateOfGame("Win");
        }
      }
      // result.test === undefined ? optionWordsProperties.setter(["result.test"]) : optionWordsProperties.setter(result.test);
      console.log("Réponse:", result);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  return (
    <div className={styles.fullScreenContainer} ref={refs["gameScreenRef"]}>
        <h2>Find this word's peer !</h2>
        <div className={styles.pears}>
          {}
        </div>
        <p>{numberOfPear}</p>
        <p className={styles.word}>{toFindWordProperties.getter}</p>
        <div className={styles.wordsContainer}>
          {optionWordsProperties.getter.map(word=><button onClick={() => sendPostRequest({ value: toFindWordProperties.getter, key: word, words: optionWordsProperties.getter })} key={word}>{word}</button> )}
        </div>
    </div>
  )
}

export default GameScreen