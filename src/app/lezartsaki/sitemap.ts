import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const langPages : MetadataRoute.Sitemap = [
      {
        url: `https://lezartsaki.fr/fr`,
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `https://lezartsaki.fr/fr/events`,
        changeFrequency: "monthly",
        priority: .8,
      },
      {
        url: `https://lezartsaki.fr/fr/infos`,
        changeFrequency: "never",
        priority: .2,
      },
      {
        url: `https://lezartsaki.fr/fr/partners`,
        changeFrequency: "yearly",
        priority: .5,
      },
      {
        url: `https://lezartsaki.fr/fr/team`,
        priority: .7,
        changeFrequency: "monthly",
      },
      {
        url: `https://lezartsaki.fr/en`,
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `https://lezartsaki.fr/en/events`,
        changeFrequency: "monthly",
        priority: .8,
      },
      {
        url: `https://lezartsaki.fr/en/infos`,
        changeFrequency: "never",
        priority: .2,
      },
      {
        url: `https://lezartsaki.fr/en/partners`,
        changeFrequency: "yearly",
        priority: .5,
      },
      {
        url: `https://lezartsaki.fr/en/team`,
        priority: .7,
        changeFrequency: "monthly",
      }
  ]
  return langPages
}