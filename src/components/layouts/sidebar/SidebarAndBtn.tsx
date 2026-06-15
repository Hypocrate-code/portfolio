"use client"
import { UIEventHandler, useState } from "react"
// import SidebarContainer from "./SidebarContainer"
import Sidebar from "./Sidebar"
import SidebarBtn from "./SidebarBtn"

function SidebarAndBtn() {

    const [isBtnClicked, setBtnClicked] = useState(false)
    const onClickHandler : UIEventHandler = () => {
        setBtnClicked(!isBtnClicked);
    }
    return (
        <>
            <SidebarBtn isOpen={isBtnClicked} onClickHandler={onClickHandler}/>
            <Sidebar isOpen={isBtnClicked} isOpenSwitch={onClickHandler}/>
        </>

    )
}

export default SidebarAndBtn