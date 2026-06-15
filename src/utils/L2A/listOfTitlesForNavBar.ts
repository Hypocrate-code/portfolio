import { JSONData } from "./traduction";
import { t } from "./traduction";

export const titleToLink = (title: string) => {
    return null;
    switch (title) {
        case "Cerb3re":
            return "/lezartsaki/assets/cerb3re/logo-texte.png"
        default:
            return null
    }
}

export interface ListOfLinksForNavElType { 
    "/": string;
    "/team": string;
    "/events": string;
    "/partners": string;
    "#contact": "Contacts"
}

function getListOfLinksForNavEl(translations : JSONData) : ListOfLinksForNavElType {
    return {
        "/": t(translations, 'home.title'),
        "/events": t(translations, 'events.title'),
        "/partners": t(translations, 'partners.title'),
        "/team": t(translations, 'team.title'),
        "#contact": "Contacts"
    }
}

export default getListOfLinksForNavEl