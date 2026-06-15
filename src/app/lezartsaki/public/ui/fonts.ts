import { Bebas_Neue, Outfit, Roboto_Condensed } from 'next/font/google';

export const bebas_neue = Bebas_Neue({ weight: "400",fallback: ['sans-serif'], subsets: ["latin"], variable: "--primary-font" });
export const outfit = Outfit({subsets: ["latin"],
    display: "swap",});
export const roboto_condensed = Roboto_Condensed({variable: '--quote-font', subsets: ["latin"]})