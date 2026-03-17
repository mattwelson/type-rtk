import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { HistoryState, TestResult } from "../../app/types"
import z from "zod"

const BEST_SCORE_KEY = "typingSpeedTest:bestScore"

const localStorageSchema = z.object({
  wpm: z.number(),
  accuracy: z.number(),
  errors: z.number(),
  elapsed: z.number(),
  mode: z.string(),
  timestamp: z.number(),
})

function loadBestScore() {
  const json = localStorage.getItem(BEST_SCORE_KEY)
  if (!json) return null
  return localStorageSchema.parse(JSON.parse(json))
}

function saveBestScore(result: TestResult) {
  localStorage.setItem(BEST_SCORE_KEY, JSON.stringify(result))
}

function clearBestScore() {
  localStorage.removeItem(BEST_SCORE_KEY)
}

const initialBest = loadBestScore()

export const historySlice = createAppSlice({
  name: "history",
  initialState: {
    results: [],
    best: initialBest ?? null,
    totalTests: initialBest ? 1 : 0,
  } as HistoryState,
  reducers: {
    addResult: (state, action: PayloadAction<TestResult>) => {
      const result = action.payload
      state.results.unshift(result)
      state.totalTests += 1
      if (!state.best || result.wpm > state.best.wpm) {
        state.best = result
        saveBestScore(result)
      }
    },
    clearHistory: state => {
      state.results = []
      state.best = null
      state.totalTests = 0
      clearBestScore()
    },
  },
})

export const { addResult, clearHistory } = historySlice.actions

/**
 * This is a little hacky because the history slice gets total tests incremented BEFORE the results are shown to the user (test -> save results -> show user)
 * @param state
 * @returns boolean indication if the current test result is the first one in the history
 */
export const selectIsFirstTestResult = (state: { history: HistoryState }) =>
  state.history.totalTests === 1

export const selectWasBestResult = (state: { history: HistoryState }) =>
  state.history.results[0]?.wpm === state.history.best?.wpm
