import { NextResponse } from "next/server";
import { getRandomElements } from "@/utils/listTools"
import en_fr_normal_words from "./EN_FR_normal_words.json"
import en_fr_exp_and_fam from "./EN_FR_expression_and_familiar_words.json"

let dict: { [key: string] : string}[] = []

const paths = {
    "en_fr_normal_words": JSON.parse(JSON.stringify(en_fr_normal_words)),
    "en_fr_exp_and_fam": JSON.parse(JSON.stringify(en_fr_exp_and_fam))
  }

const pathsSource = ["en_fr_normal_words", "en_fr_exp_and_fam"] as const;
type dPaths = typeof pathsSource[number];

const randomI = (length: number) => {
    return Math.floor(Math.random() * length)
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const value = url.searchParams.get("value") as dPaths;   // Récupérer le paramètre "id"
    dict = paths[value]
    console.log(dict.length);
    
    const n = url.searchParams.get("n"); // Récupérer le paramètre "type"    
    // 1️⃣ Vérifier si l'utilisateur est autorisé (ex: via un token JWT ou un cookie sécurisé)
    const authHeader = req.headers.get("Authorization");
    if (!value || !n ) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const parsedN = parseInt(n);
    const i_of_word = randomI(parsedN)
    // 2️⃣ Lire le fichier JSON sécurisé (côté serveur)
    try {
        const content = getRandomElements(dict, parsedN)
        const optionWords = content.map(el=>el[0])
        const toFindWord = content[i_of_word][1]
        return NextResponse.json({"optionWords": optionWords, "toFindWord": toFindWord}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Data not found" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const { key, value, words } : { key : string, value : string, words : string[] } = await request.json();
    const wordData = dict.find((item) => item[0] === key && item[1] === value);
    if (!wordData) {
        return NextResponse.json({ error: "Wrong word" }, { status: 404 });
    }
    if (words) {
        words.splice(words.indexOf(key), 1);
        const newTrad = dict.find(trad => trad[0] === words[randomI(words.length)])
        if (newTrad) {
            return NextResponse.json({ message: "Good word", "words": words, "newTrad": newTrad[1] }, { status: 200 });
        }
    }
    
    return NextResponse.json({ message: "Good word" }, { status: 200 });

}
