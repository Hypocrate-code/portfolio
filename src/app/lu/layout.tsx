import type { Metadata } from "next";

import "./globals.css"

export const metadata: Metadata = {
  'title': "le squat'",
  "description": "le souvenir de la chambre du feignant."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
