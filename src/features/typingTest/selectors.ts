import type { RootState } from "@/app/store"
import { createSelector } from "@reduxjs/toolkit"

export const selectAccuracy = (state: RootState) => {
  const { currentIndex, errors } = state.typingTest
  if (!currentIndex) return 100
  return Math.round(((currentIndex - errors) / currentIndex) * 100)
}

export const selectElapsedSeconds = (state: RootState) => {
  const { elapsed } = state.typingTest
  return Math.round(elapsed / 1000)
}

export const selectRemainingSeconds = createSelector(
  (state: RootState) => state.typingTest.elapsed,
  (state: RootState) => state.settings.duration,
  (elapsed, duration) => {
    const remaining = duration * 1000 - elapsed
    return Math.max(0, Math.round(remaining / 1000))
  },
)

export const selectWpm = createSelector(
  (state: RootState) => state.typingTest.currentIndex,
  selectElapsedSeconds,
  (currentIndex, elapsedSeconds) => {
    if (!elapsedSeconds) return 0
    const minutes = elapsedSeconds / 60
    return Math.round(currentIndex / 5 / minutes)
  },
)
