export const paths = {
    "en_fr_normal_words": "EN_FR_normal_words.json",
    "en_fr_exp_and_fam": "EN_FR_expression_and_familiar_words.json"
  }
export const pathsSource = ["en_fr_normal_words", "en_fr_exp_and_fam"] as const;
export type dPaths = typeof pathsSource[number];