import { Dispatch, RefObject, SetStateAction } from "react";

export default function showOrHideEl(setIsScrolled: Dispatch<SetStateAction<boolean>>, isOpen: boolean, ref: RefObject<HTMLElement | null>) {
    const navbar = document.querySelector('nav');
    if (navbar && ref.current) {
        const condition = (window.scrollY > navbar.clientHeight - 1) || isOpen 
        setIsScrolled(condition)
        const style = window.getComputedStyle(ref.current)
        const toHidden = () => {
            if (style["transform"].includes('matrix')) {
                ref.current?.style.setProperty('visibility', "hidden")
            }
        }
        if (condition && style["visibility"] == "hidden") {
            ref.current?.style.setProperty('visibility', "visible")
        }
        if (!condition && style["visibility"] == "visible" ) {
            ref.current?.addEventListener('transitionend', toHidden, {once: true})
        }
    }
} 