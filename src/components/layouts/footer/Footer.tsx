import FooterUtils from "./FooterUtils"
import FooterContact from "./FooterContact"
import FooterFollow from "./FooterFollow"
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={`${styles.footer}`}>
        <FooterUtils/>
        <FooterContact/>
        <FooterFollow/>
    </footer>
  )
}

export default Footer