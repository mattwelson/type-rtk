import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { initialiseTest, start, testSlice } from "./testSlice"
import { useTimer } from "@/hooks/useTime"
import { useEffect } from "react"

export function TypingTest() {
  const status = useAppSelector(state => state.test.status)
  const chars = useAppSelector(state => state.test.chars)

  const dispatch = useAppDispatch()

  const { resetTick } = useTimer()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        dispatch(testSlice.actions.backspace())
        resetTick()
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        dispatch(testSlice.actions.keyPressed({ key: e.key }))
        resetTick() // reset timer on every key press
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [dispatch, resetTick])

  if (status === "finished") {
    return (
      <div className="my-16 text-center">
        <h2 className="text-2xl font-bold">Test Finished!</h2>
        <Button
          className="mt-4"
          onClick={() => {
            dispatch(initialiseTest())
          }}
        >
          Restart Test
        </Button>
      </div>
    )
  }

  return (
    <div className="relative">
      {status === "idle" && (
        <div
          onClick={() => dispatch(start())}
          className="absolute flex flex-col gap-4 items-center justify-center inset-0 z-1"
        >
          <Button>Start Typing Test</Button>
          <p>Or click the text and start typing</p>
        </div>
      )}
      <div
        className={cn("my-16", {
          "blur-xs": status == "idle",
        })}
      >
        <div className="mx-auto flex flex-wrap max-w-xl text-xl text-muted-foreground">
          {chars.map((c, i) => (
            <span
              key={i}
              className={cn("text-muted-foreground", {
                "text-green-500": c.state === "correct",
                "text-red-500 underline": c.state === "wrong",
              })}
            >
              {c.char === " " ? "␣" : c.char}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
