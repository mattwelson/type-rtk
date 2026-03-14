import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { TestResult } from "../../app/types"

export const historySlice = createAppSlice({
  name: "history",
  initialState: [] as TestResult[],
  reducers: {
    addResult: (state, action: PayloadAction<TestResult>) => {
      state.unshift(action.payload)
      if (state.length > 10) state.pop()
    },
    clearHistory: () => [],
  },
})
