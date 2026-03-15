import type { CharEntry } from "@/app/types"

export function buildCharMap(words: string[]): CharEntry[] {
  return words
    .flatMap((word, wordIndex) =>
      word
        .split("")
        .map(char => ({
          char,
          wordIndex,
          state: "pending" as const,
        }))
        .concat({ char: " ", wordIndex, state: "pending" as const }),
    )
    .slice(0, -1) // Remove the trailing space
}
