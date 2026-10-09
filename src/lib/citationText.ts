const words = new Intl.Segmenter("zh", { granularity: "word" });

/** 保留原文，只取句末完整词及其标点，与引用共同排版。 */
export function splitCitationTail(text: string) {
  const lastWord = Array.from(words.segment(text))
    .reverse()
    .find((part) => part.isWordLike);
  const index = lastWord?.index ?? 0;
  return { leading: text.slice(0, index), tail: text.slice(index) };
}
