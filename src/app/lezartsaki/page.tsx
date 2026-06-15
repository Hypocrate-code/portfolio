import { Metadata } from "next";
import { generateTraducedMetada } from "@/utils/L2A/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return generateTraducedMetada("home", "en")
}

export default async function Redirect() {
  return (
    <h1>Redirection</h1>
  );
}