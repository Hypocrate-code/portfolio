import React from "react"
import Navbar from "./navbar/Navbar"
import SidebarAndBtn from "./sidebar/SidebarAndBtn"
import Footer from "./footer/Footer"
import UpBtn from "./upBtn/UpBtn"
// import { ReactLenis } from "@/utils/lenis"

// import { localesAvailableType } from "@/traductions/config"

export default function DefaultLayout({ children } : { children : React.ReactNode}) {
  return (
    // <ReactLenis root options={{"duration": 1}}>
      <>
          <Navbar/>
          <SidebarAndBtn/>
          <main>
            {children}
          </main>
          <UpBtn/>
          <Footer/>
      </>
    // </ReactLenis>
  )
}