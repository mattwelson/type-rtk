import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { initialiseTest, start } from "./typingTestSlice"
import { Separator } from "@/components/ui/separator"
import { Settings } from "../settings/Settings"
import { LiveResult } from "./LiveResult"
import { Undo } from "lucide-react"

export function TypingTest() {
  const status = useAppSelector(state => state.typingTest.status)
  const chars = useAppSelector(state => state.typingTest.chars)

  const dispatch = useAppDispatch()

  return (
    <div>
      <div className="grid lg:grid-cols-2 my-4 gap-4">
        <LiveResult />
        <Settings />
      </div>
      <Separator />
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
          <div className="text-center mx-auto max-w-xl text-3xl text-muted-foreground">
            {chars.map((c, i) => (
              <span
                key={i}
                className={cn("text-muted-foreground", {
                  "text-white":
                    c.wordIndex ===
                    chars.find(c => c.state === "pending")?.wordIndex,
                  "text-green-500": c.state === "correct",
                  "text-red-500 underline": c.state === "wrong",
                })}
              >
                {c.char === " " ? "␣\u200B" : c.char}
              </span>
            ))}
          </div>
        </div>
      </div>
      {status === "active" && (
        <>
          <Separator className="mb-8" />
          <div className="flex justify-center">
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(initialiseTest())
              }}
            >
              Restart Test <Undo />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
