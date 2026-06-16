// import Image from "next/image";


// import styles from "./page.module.css";

import styles from "./page.module.css"


export default function Home() {
  return (
    <html lang="fr">
      <body className={styles.body}>
        <section className={styles.section}>
          <h1 className={styles.h1}><i>Thibaut Alvoët / Hypocrate</i></h1>
          <p className={styles.p}>Yo ! mon portfolio est en construction, mais vous pouvez visiter mes projets ici, du plus récent au plus ancien : </p>
          <ul className={styles.ul}>
            <li className={styles.li}>2025 - <a className={styles.a} href="https://github.com/Hypocrate-code/HypLoad">HypLoad</a> (logiciel Windows / MacOS et réalisation mini-film) pour télécharger des vidéos, musiques et playlists YouTube</li>
            <li className={styles.li}>2025 - <a className={styles.a} href="/lu">le squat'</a> (3D et web) reproduction interactive de la chambre d'un ami, Lucien Joly</li>
            <li className={styles.li}>2025 - <a className={styles.a} href="/lezartsaki">LezArtsAki</a> (vitrine web) une asso organisatrice de concerts et festivals</li>
            <li className={styles.li}>2024 - <a className={styles.a} href="/Find_The_Pear">Find The Pear</a> (jeu web) pour améliorer son vocabulaire en anglais</li>
            <li className={styles.li}>2023 - <a className={styles.a} href="https://Hypocrate-code.github.io/Robusto">Robusto</a> (vente web) création d'entreprise de vente de café</li>
            <li className={styles.li}>2023 - <a className={styles.a} href="https://Hypocrate-code.github.io/Dernier_Choix">Dernier Choix</a> (jeu web) histoire à choix et fins multiples, sur notre rapport aux objets (sur grands écrans uniquement)</li>
          </ul>
          <p className={styles.p}>made by Hypocrate - everything available on <a className={styles.a} href="https://github.com/Hypocrate-code">GitHub</a></p>
        </section>
      </body>
    </html>
  );
}
