// import Image from "next/image";

import { Poppins } from "next/font/google";

// import styles from "./page.module.css";

import "./globals.css"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

export default function Home() {
  return (
    <section className={poppins.className}>
      <h1>Hi ! Welcome on Hypocrate's Portfolio</h1>
      <h2>This is currently in building state. However, you can visit some of my projets here :</h2>
      <ul>
        <li><a href="/lu">3D project with Lucien Joly</a></li>
        <li><a href="/Find_The_Pear">Find The Pear</a></li>
      </ul>
      <p>Made by Hypocrate</p>
    </section>
  );
}
