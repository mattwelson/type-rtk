import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useTimer } from "./useTime"
import { useEffect } from "react"
import { typingTestSlice } from "@/features/typingTest/typingTestSlice"
import { selectAccuracy, selectWpm } from "@/features/typingTest/selectors"
import { addResult } from "@/features/history/historySlice"

/**
 * This hook manages the core typing test logic, including:
 * - Listening for key presses and dispatching appropriate actions
 * - Managing the timer for timed tests
 * - Calculating results and saving them to history when a test finishes
 */
export function useTypingTest() {
  const dispatch = useAppDispatch()

  const { resetTick } = useTimer()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        dispatch(typingTestSlice.actions.backspace())
        resetTick()
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        dispatch(typingTestSlice.actions.keyPressed({ key: e.key }))
        resetTick() // reset timer on every key press
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [dispatch, resetTick])

  const status = useAppSelector(s => s.typingTest.status)
  const wpm = useAppSelector(selectWpm)
  const accuracy = useAppSelector(selectAccuracy)
  const errors = useAppSelector(s => s.typingTest.errors)
  const elapsed = useAppSelector(s => s.typingTest.elapsed)
  const mode = useAppSelector(s => s.settings.mode)

  useEffect(() => {
    if (status !== "finished") return

    dispatch(
      addResult({
        wpm,
        accuracy,
        errors,
        elapsed,
        mode,
        timestamp: Date.now(),
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])
}
