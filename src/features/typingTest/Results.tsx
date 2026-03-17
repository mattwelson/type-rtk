import { Check, PartyPopper, Undo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { initialiseTest } from "./typingTestSlice"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectWpm, selectAccuracy } from "./selectors"
import { cn } from "@/lib/utils"
import {
  selectIsFirstTestResult,
  selectWasBestResult,
} from "../history/historySlice"
import star1 from "@/assets/images/pattern-star-1.svg"
import star2 from "@/assets/images/pattern-star-2.svg"
import confetti from "@/assets/images/pattern-confetti.svg"

export function Results() {
  const wpm = useAppSelector(selectWpm)
  const accuracy = useAppSelector(selectAccuracy)
  const characters = useAppSelector(state => state.typingTest.currentIndex)
  const errors = useAppSelector(state => state.typingTest.errors)
  const dispatch = useAppDispatch()

  const isFirstTest = useAppSelector(selectIsFirstTestResult)
  const wasBestResult = useAppSelector(selectWasBestResult)

  return (
    <div className="relative my-16 text-center gap-4 flex flex-col items-center">
      <img
        src={star1}
        alt="Star Pattern"
        className="size-12 fixed right-1/10 top-1/2"
      />
      <img
        src={star2}
        alt="Star Pattern"
        className="size-8 fixed left-1/8 top-1/6"
      />
      <img
        src={confetti}
        alt="Confetti"
        className="fixed bottom-0 h-80 object-cover"
      />

      {wasBestResult && !isFirstTest ? (
        <>
          <PartyPopper className="size-16 text-yellow-300" />
          <p className="text-muted-foreground">
            You're getting faster. That was incredible typing.
          </p>
        </>
      ) : (
        <>
          {/* -- Other -- */}
          <div className="bg-green-600/15 rounded-full p-3">
            <div className="bg-green-600/30 rounded-full p-3">
              <div className="bg-green-600 rounded-full p-2 text-background">
                <Check className="size-8" strokeWidth={3} />
              </div>
            </div>
          </div>
          {isFirstTest ? (
            <>
              <h2 className="text-2xl font-bold">Baseline Established!</h2>
              <p className="text-muted-foreground">
                You've set the bar. Now the real challenge begins - time to beat
                it.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Test Complete!</h2>
              <p className="text-muted-foreground">
                Solid run. Keep pushing to beat your high score.
              </p>
            </>
          )}
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-md text-muted-foreground text-left">
        <div className="border-muted border p-2 rounded flex flex-col">
          <p className="text-sm">WPM:</p>
          <p className="text-2xl font-bold">{wpm}</p>
        </div>
        <div className="border-muted border p-2 rounded flex flex-col">
          <p className="text-sm">Accuracy:</p>
          <p
            className={cn("text-2xl font-bold", {
              "text-red-500": accuracy < 95,
            })}
          >
            {accuracy}%
          </p>
        </div>
        <div className="border-muted border p-2 rounded flex flex-col">
          <p className="text-sm">Characters:</p>
          <p className="text-2xl font-bold">
            <span className="text-green-500">{characters}</span>/
            <span className="text-red-500">{errors}</span>
          </p>
        </div>
      </div>
      <Button
        variant="secondary"
        className="mt-4"
        onClick={() => {
          dispatch(initialiseTest())
        }}
      >
        Go again <Undo />
      </Button>
    </div>
  )
}
