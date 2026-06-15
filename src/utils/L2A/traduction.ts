function getProperty<T extends JSONData, K extends keyof T>(obj: T | undefined, key: K): T[K] | undefined {
  if (!obj) {
    console.error("L'objet est indéfini ou nul.");
    return undefined;
  }
  if (!(key in obj)) {
    console.error(`La clé "${String(key)}" n'existe pas dans l'objet.`);
    console.log(obj);
    
    return undefined;
  }
  return obj[key];
}


export type JSONData = { [key: string]: string | JSONData };


export const t = (translations : JSONData, key: string) : string => {
  const keySegments = key.split('.')  
  let res : JSONData | string | undefined = translations
  for (const segment in keySegments) {      
    res = getProperty(res as JSONData, keySegments[segment] as keyof JSONData)
  }
  return typeof res == "string" ? res : "Couldn't fetch words" 
}

export const t_Data = (translations : JSONData, key: string) : JSONData | undefined  => {
  const keySegments = key.split('.')  
  let res : JSONData | string | undefined = translations
  for (const segment in keySegments) {      
    res = getProperty(res as JSONData, keySegments[segment] as keyof JSONData)
  }
  return typeof res == "string" ? undefined : res
}




  // interface ITranslator {
  //   lang : localesAvailableType;
  //   fichier: JSONData;
  // }
  
  // export default class Translator implements ITranslator {
  //   lang: localesAvailableType;
  //   fichier: JSONData;
  
  //   constructor(lang: localesAvailableType, prefix: string) {
  //     this.lang = lang;
  //     this.fichier = {}; // Initialisation vide
  //     this.setTranslation(prefix); // Charger les traductions initiales
  //   }
  
  //   async getTranslation(prefix: string): Promise<JSONData> {
  //     // Importation dynamique du fichier JSON
  //     const module = await import(`@/traductions/${prefix}_${this.lang}.json`);
  //     return module.default; // Assurez-vous que vos fichiers JSON exportent un objet par défaut
  //   }
  
  //   async setTranslation(prefix: string) {
  //     this.fichier = await this.getTranslation(prefix);
  //   }
  
  //   async getStringTraduced(key: string): Promise<string> {
  //     const keySegments = key.split('.');
  //     let res: JSONData | string | undefined = this.fichier;
  //     console.log(this.fichier);
  //     console.log(key)
      
  //     try {
  //       // Itérer sur les segments pour accéder à la clé imbriquée
  //       for (const segment of keySegments) {
  //         if (typeof res === 'object' && res !== null && segment in res) {
  //           res = getProperty(res as JSONData, segment as keyof JSONData);
  //         } else {
  //           throw new Error(`Clé "${key}" introuvable`);
  //         }
  //       }
  
  //       // Vérifier si le résultat final est une chaîne de caractères
  //       if (typeof res === 'string') {
  //         return res;
  //       } else {
  //         throw new Error(`La clé "${key}" ne pointe pas vers une chaîne valide`);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       console.error("************************** Erreur ********************************");
  //       return "Not working";
  //     }
  //   }
  // }