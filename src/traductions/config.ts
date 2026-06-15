export const localesAvailable = ['fr', 'en'] as const;
export const defaultLocale = 'fr';

// Type basé directement sur le tableau
export type localesAvailableType = typeof localesAvailable[number];