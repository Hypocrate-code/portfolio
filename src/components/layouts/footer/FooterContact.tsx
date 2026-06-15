"use client"
import { t } from "@/utils/L2A/traduction"
import stylesFBox from "./FooterBox.module.css"
import styles from "./FooterContact.module.css"
import ContainerBarToShow from "@/app/lezartsaki/public/ui/ContainerBarToShow"
import { outfit } from "@/app/lezartsaki/public/ui/fonts"
import { useContext, useState } from "react"
import { translationContext } from "@/contexts/LangContext"

const subjects = ["Adhesion", "Programmation", "Infos", "Autre"]
const regexp : RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;


function FooterContact() {
  const translations = useContext(translationContext)["common"]
  const [status, setStatus]= useState('')
  const [formData, setFormData] = useState({
    "subject": "",
    "email": "",
    "message": ""
  })
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormData({
      "subject": "",
      "email": "",
      "message": ""
    })
    try {
      if (!subjects.includes(formData.subject)) {
        return setStatus(t(translations, `footer.contact.errors.subject`));
      };
      if (!regexp.test(formData.email)) {
        return setStatus(t(translations, `footer.contact.errors.email`));
      };
      if (formData.message === "" || !formData.message) {
        return setStatus(t(translations, `footer.contact.errors.message`));
      };
      setStatus(t(translations, "footer.contact.status.waiting"));
      const res = await fetch("https://lezartsaki.fr/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const response = await res.json();
      if(res.status === 400 || res.status === 500) {
        if(response.message.includes("Subject") || response.message.includes("Email") || response.message.includes("Message")) {
          setStatus(t(translations, `footer.contact.errors.${response.message.split(" ")[0].toLowerCase()}`));
        }
        else {
          setStatus(t(translations, `footer.contact.status.error`));
        }
      }
      else if (res.status === 200) {
        setStatus(t(translations, `footer.contact.status.sent`));
      }
    }
    catch (e) {
      console.log(e);
      setStatus(t(translations, `footer.contact.status.error`));
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className={`${stylesFBox.footerBox} ${styles.footerBox}`} id="contact">
      <ContainerBarToShow>
        <h3>{t(translations, "footer.contact.title")}</h3>
      </ContainerBarToShow>
      <div className={`${stylesFBox.footerBoxContent} ${styles.footerBoxContent}`}>
        <select name="subject" onChange={onChangeHandler} value={formData.subject} id="type-of-selector">
          <option value="">{t(translations, "footer.contact.themesOfRequest.title")}</option>
          <option value="Adhesion">&#x1F4DD; {t(translations, "footer.contact.themesOfRequest.adhesion")}</option>
          <option value="Programmation">&#x231A; {t(translations, "footer.contact.themesOfRequest.program")}</option>
          <option value="Infos">&#x1F918; {t(translations, "footer.contact.themesOfRequest.infos")}</option>
          <option value="Autre">&#x1F4E2; {t(translations, "footer.contact.themesOfRequest.other")}</option>
        </select>
        <input name="email" value={formData.email} onChange={onChangeHandler} className={outfit.className} type="email" placeholder={t(translations, "footer.contact.placeholders.email")}/>
        <textarea className={outfit.className} onChange={onChangeHandler} value={formData.message} name="message" placeholder={t(translations, "footer.contact.placeholders.comment")}></textarea>
        <p className={`${status === "" ? "" : styles.status}`}>{status}</p>
        <button id="send-contact" type="submit" form="contact">{t(translations, "footer.contact.placeholders.send")}</button>
      </div>
  </form>
  )
}

export default FooterContact