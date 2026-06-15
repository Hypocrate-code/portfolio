function switchClass(el : HTMLElement, class1 : string, class2 : string) {
    if (el.classList.contains(class1)) {
        el.classList.remove(class1);
        el.classList.add(class2);
    } else {
        el.classList.remove(class2);
        el.classList.add(class1);
    }
}

export default switchClass