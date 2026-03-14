import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { CharEntry, TestStatus } from "../../app/types"

const initialState = {
  status: "idle" as TestStatus,
  words: [] as string[],
  chars: [] as CharEntry[],
  currentIndex: 0,
  errors: 0,
  startTime: null as number | null,
  elapsed: 0,
}

export const testSlice = createAppSlice({
  name: "test",
  initialState,
  reducers: {
    initialiseTest: (state, action: PayloadAction<{ words: string[] }>) => {
      state.words = action.payload.words
      state.chars = buildCharMap(action.payload.words)
      state.status = "idle"
      state.currentIndex = 0
      state.errors = 0
      state.startTime = null
      state.elapsed = 0
    },
    keyPressed: (state, action: PayloadAction<{ key: string }>) => {
      if (state.status === "finished") return
      if (state.status === "idle") {
        state.status = "active"
        state.startTime = Date.now()
      }

      const { key } = action.payload
      const expected = state.chars[state.currentIndex]?.char
      if (!expected) return

      state.chars[state.currentIndex].state =
        key === expected ? "correct" : "wrong"
      if (key !== expected) state.errors++
      state.currentIndex++

      if (state.currentIndex >= state.chars.length) {
        state.status = "finished"
      }
    },
    backspace: state => {
      if (state.status !== "active" || state.currentIndex === 0) return
      const prev = state.currentIndex - 1
      if (state.chars[prev].state === "wrong") state.errors--
      state.chars[prev].state = "pending"
      state.currentIndex = prev
    },
    tick: state => {
      if (state.status !== "active" || !state.startTime) return
      state.elapsed = Date.now() - state.startTime
    },
    expireTest: state => {
      state.status = "finished"
    },
  },
})
