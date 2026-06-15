import "@/app/lezartsaki/public/ui/globals.css";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Lez Arts Aki',
    default: 'Page web Lez Arts Aki',
  },
  metadataBase: new URL('https://hypocrate.dev/lezartsaki/fr')
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
