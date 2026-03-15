export type Mode = "words" | "timed"
export type Difficulty = "easy" | "medium" | "hard"

export type Settings = {
  mode: Mode
  wordCount: number // used in 'words' mode
  duration: number // seconds, used in 'timed' mode
  difficulty: Difficulty
}

export type CharState = "pending" | "correct" | "wrong"

export type CharEntry = {
  char: string
  wordIndex: number
  state: CharState
}

export type TestStatus = "loading" | "idle" | "active" | "finished"

export type TestResult = {
  wpm: number
  accuracy: number
  errors: number
  elapsed: number
  mode: Mode
  timestamp: number
}
