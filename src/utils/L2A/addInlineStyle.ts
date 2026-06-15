

export function addBold(text : string, boldWords : string[]) {
    if (!text || boldWords.length === 0) {
        return text;
      }
      const regex = new RegExp(`(${boldWords.join('|')})`, 'gi');
      return text.replaceAll(regex, '<b>$1</b>');
}

export function addRed(text : string, redWords : string[]) {
    if (!text || redWords.length === 0) {
        return text;
      }
      const regex = new RegExp(`(${redWords.join('|')})`, 'gi');
      return text.replaceAll(regex, '<u id="group">$1</u>');
}