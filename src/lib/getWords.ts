import type { Difficulty } from "@/app/types"
import data from "@/lib/data.json"

export function getWords(difficulty: Difficulty) {
  return (
    data[difficulty].at(
      Math.floor(Math.random() * data[difficulty].length),
    ) ?? {
      id: "error",
      text: "error",
    }
  )
}
