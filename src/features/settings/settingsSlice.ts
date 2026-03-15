// src/store/settingsSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { Mode, Difficulty, Settings } from "../../app/types"

const initialState: Settings = {
  mode: "timed",
  wordCount: 25,
  duration: 60,
  difficulty: "medium",
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload
    },
    setWordCount: (state, action: PayloadAction<number>) => {
      state.wordCount = action.payload
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
    },
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload
    },
  },
})

export const { setMode, setWordCount, setDuration, setDifficulty } =
  settingsSlice.actions
