import { NextResponse } from "next/server";
import { getRandomElements } from "@/utils/listTools"
import en_fr_normal_words from "../../../../private/FTP/EN_FR_normal_words.json"
import en_fr_exp_and_fam from "../../../../private/FTP/EN_FR_expression_and_familiar_words.json"
import { pathsSource, dPaths } from "@/utils/FTP_config";

let dict: { [key: string] : string}[] = []

const paths = {
    "en_fr_normal_words": JSON.parse(JSON.stringify(en_fr_normal_words)),
    "en_fr_exp_and_fam": JSON.parse(JSON.stringify(en_fr_exp_and_fam))
  }

const randomI = (length: number) => {
    return Math.floor(Math.random() * length)
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const dictValue = url.searchParams.get("dictValue") as dPaths;   // Récupérer le paramètre "id"
    if (!pathsSource.includes(dictValue)) {
        return NextResponse.json({ error: "Invalid value" }, { status: 400 });
    }
    dict = paths[dictValue]    
    const n = url.searchParams.get("n"); // Récupérer le paramètre "type"    
    // 1️⃣ Vérifier si l'utilisateur est autorisé (ex: via un token JWT ou un cookie sécurisé)
    const authHeader = req.headers.get("Authorization");
    if (!dictValue || !n ) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
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
        return NextResponse.json({ error: "Data not found" }, { status: 400 });
    }
}

export async function POST(request: Request) {
    const { key, value, words, dictValue, soluce } : { key : string, value : string, words : string[], dictValue: dPaths, soluce: boolean | undefined } = await request.json();
    // console.log(soluce);
    
    dict = paths[dictValue]
    // console.log(key, value, words, dictValue);
    const wordData = dict.find((item) => item[0] === key && item[1] === value);
    if (!wordData && !soluce) {
        return NextResponse.json({ error: "Wrong word", "state": 0 }, { status: 200 });
    }
    if (words) {
        if (soluce) {
            const answer = dict.find((item) => item[1] === value && words.includes(item[0]))
            if (!answer) {
                return NextResponse.json({ error: "Data not found" }, { status: 400 });
            }
            return NextResponse.json({ message: "Data found", "answer": answer, "words": words }, { status: 200 });
        }
        words.splice(words.indexOf(key), 1);
        const l = randomI(words.length - 1);
        // console.log(l);
        const newTrad = dict.find(trad => trad[0] === words[l])
        if (words.length === 0) {
            return NextResponse.json({ message: "Win", "state": 2, "newTrad": "", "words": words }, { status: 200 })
        }
        if (newTrad) {
            return NextResponse.json({ message: "Good word", "state": 1, "newTrad": newTrad[1], "words": words }, { status: 200 });
        }
        return NextResponse.json({ error: "Data not found" }, { status: 400 });
    }
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });

}
