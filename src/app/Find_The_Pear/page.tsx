"use client"
import StartScreen from './StartScreen'
import GameScreen from './GameScreen'
import "./globals.css";
import { Poppins } from "next/font/google"
import { useRef, useState } from 'react';
import { RefObject } from 'react';

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})


export interface dRefTable {
  "startScreenRef": RefObject<HTMLDivElement | null>,
  "gameScreenRef": RefObject<HTMLDivElement | null>  
} 


function FindThePear() {
  const startScreenRef = useRef<HTMLDivElement>(null)
  const gameScreenRef = useRef<HTMLDivElement>(null)
  const [optionWords, setOptionWords] = useState<string[]>([])
  const [toFindWord, setToFindWord] = useState("")
  const refTable = {
    "startScreenRef": startScreenRef,
    "gameScreenRef": gameScreenRef
  }
  return (
    <section className={poppins.className}>
      <StartScreen setOptionWords={setOptionWords} setToFindWord={setToFindWord} refs={refTable}  />
      <GameScreen optionWordsProperties={{getter: optionWords, setter: setOptionWords}} toFindWordProperties={{getter: toFindWord, setter: setToFindWord}} refs={refTable}/>
    </section>
  )
}

export default FindThePear