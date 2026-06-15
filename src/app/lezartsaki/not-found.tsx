import "@/app/lezartsaki/public/ui/globals.css"
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: "Erreur 404",
};

export default function NotFound() {
  return (
    <html>
      <body>
        <div>
          <h1>Outside 404</h1>
        </div>
      </body>
    </html>
  );
}
