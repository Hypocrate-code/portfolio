import "@/app/lezartsaki/public/ui/globals.css"
import { bebas_neue, outfit, roboto_condensed } from '../public/ui/fonts'
import { localesAvailableType } from "@/traductions/config";

export default async function Layout({ children, params }: { children: React.ReactNode; params?: Promise<{ lang: localesAvailableType }> }) {
    const { lang } = await (params as Promise<{ lang: localesAvailableType }>);
    return (
        <html lang={lang}>
            <body className={`${outfit.className} ${bebas_neue.variable} ${roboto_condensed.variable}`}>
                {children}
            </body>
        </html>
    );
  }
  