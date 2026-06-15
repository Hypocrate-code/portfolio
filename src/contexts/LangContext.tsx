"use client"

import { createContext } from "react";
import React, { useState } from "react"
import { defaultLocale, localesAvailableType } from "@/traductions/config"
import { JSONData } from "@/utils/L2A/traduction";

export interface ITranslationObject {
    "page": JSONData,
    "common": JSONData,
    "lang": localesAvailableType
} 

export const translationContext = createContext({
    "page": {},
    "common" : {},
    "lang": defaultLocale
});

export default function TranslationContextProvider({ children, translationsObject } : { children : React.ReactNode, translationsObject : ITranslationObject }) {
    const [translations] = useState<ITranslationObject>(translationsObject)
    return (
        <translationContext.Provider value={ translations }>
            {children}
        </translationContext.Provider>
    )
}