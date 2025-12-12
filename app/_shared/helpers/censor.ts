const badWords = ["con", "merde", "pute", "fuck"]; // tu peux externaliser ça dans un JSON

export function censor(text: string): string {
  let censored = text;

  badWords.forEach((word) => {
    const regex = new RegExp(word, "gi");
    censored = censored.replace(regex, "*".repeat(word.length));
  });

  return censored;
}
