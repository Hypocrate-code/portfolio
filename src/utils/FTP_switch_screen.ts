import { dRefTable } from "@/app/Find_The_Pear/page";
import { ScreenRefName } from "@/app/Find_The_Pear/page";

export default function switchScreen( currentRef: ScreenRefName, newRef: ScreenRefName, refs: dRefTable ) {
    if(refs[currentRef].current && refs[newRef].current) {
        refs[currentRef].current.style.display = "none"
        refs[newRef].current.style.display = "block"
        return true
    }
    return false
}