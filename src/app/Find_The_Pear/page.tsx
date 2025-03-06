"use client"
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import EndScreen from './components/EndScreen'
import { Poppins } from "next/font/google"
import { useRef, useState } from 'react';
import { RefObject } from 'react';

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export type ScreenRefName = "startScreenRef" | "gameScreenRef" | "endScreenRef"
export type ScreenType = RefObject<HTMLDivElement | null>;
export interface dRefTable {
  "startScreenRef": ScreenType,
  "gameScreenRef": ScreenType,
  "endScreenRef": ScreenType,
} 
export type dStateOfGame =  "Win" | "Bugged"

function FindThePear() {
  const startScreenRef = useRef<HTMLDivElement>(null);
  const gameScreenRef = useRef<HTMLDivElement>(null);
  const endScreenRef = useRef<HTMLDivElement>(null);
  const languageChooser = useRef<HTMLSelectElement>(null);
  const [stateOfGame, setStateOfGame] = useState<dStateOfGame | null>(null)
  const [optionWords, setOptionWords] = useState<string[]>([]);
  const [wordsToChooseFrom, setWordsToChooseFrom] = useState<string[]>(optionWords);
  const [toFindWord, setToFindWord] = useState("")

  const refTable = {
    "startScreenRef": startScreenRef,
    "gameScreenRef": gameScreenRef,
    "endScreenRef": endScreenRef
  }

  return (
    <section className={poppins.className}>
      <StartScreen 
        setOptionWords={setOptionWords} 
        setWordsToChooseFrom={setWordsToChooseFrom} 
        setToFindWord={setToFindWord} 
        refs={refTable} 
        languageChooser={languageChooser} 
      />
      <GameScreen 
        optionWordsProperties={{
            getter: optionWords, 
            setter: setOptionWords
          }} 
        toFindWordProperties={{
          getter: toFindWord, 
          setter: setToFindWord
        }} 
        languageChooser={languageChooser} refs={refTable} 
        setStateOfGame={setStateOfGame}
        wordsToChooseFrom={{
          getter: wordsToChooseFrom, 
          setter: setWordsToChooseFrom
        }}
      />
      <EndScreen 
        refs={refTable}
        stateOfGame={stateOfGame}
        optionWordsProperties={{
          getter: optionWords 
        }} 
        wordsToChooseFrom={{
          setter: setWordsToChooseFrom
        }}
      />
    </section>
  )
}

export default FindThePear