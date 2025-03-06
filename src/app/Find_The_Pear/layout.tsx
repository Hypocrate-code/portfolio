import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  'title': "Find The Pear",
  "description": "Find The Pear is a interactive game about learning things, mainly english vocabulary, even though the website is made for any list of peer of words."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
