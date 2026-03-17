import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { store } from "@/app/store"
import { typingTestSlice } from "@/features/typingTest/typingTestSlice"
import { useCallback, useEffect, useRef } from "react"

export function useTimer() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(s => s.typingTest.status)
  const mode = useAppSelector(s => s.settings.mode)
  const duration = useAppSelector(s => s.settings.duration)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startTick = useCallback(() => {
    clearTick()
    intervalRef.current = setInterval(() => {
      dispatch(typingTestSlice.actions.tick())

      if (mode === "timed") {
        const s = store.getState()
        if (s.typingTest.elapsed >= duration * 1000) {
          dispatch(typingTestSlice.actions.expireTest())
          clearTick()
        }
      }
    }, 200)
  }, [dispatch, mode, duration])

  useEffect(() => {
    if (status === "active") startTick()
    else clearTick()
    return clearTick
  }, [startTick, status])

  return { resetTick: startTick }
}
