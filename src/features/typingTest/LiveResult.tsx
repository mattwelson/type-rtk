import { useAppSelector } from "@/app/hooks"
import { selectAccuracy, selectRemainingSeconds, selectWpm } from "./selectors"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function LiveResult() {
  const wpm = useAppSelector(selectWpm)
  const accuracy = useAppSelector(selectAccuracy)
  const remainingSeconds = useAppSelector(selectRemainingSeconds)

  return (
    <div className="flex gap-8 justify-center lg:justify-start">
      <div className="flex flex-col items-center">
        <p className="text-sm text-muted-foreground">WPM:</p>
        <p className="text-2xl font-bold">{wpm}</p>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col items-center">
        <p className="text-sm text-muted-foreground">Accuracy:</p>
        <p
          className={cn("text-2xl font-bold", {
            "text-red-500": accuracy < 95,
          })}
        >
          {accuracy}%
        </p>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col items-end">
        <p className="text-sm text-muted-foreground">Time:</p>
        <p className="text-2xl font-bold">
          {String(Math.floor(remainingSeconds / 60)).padStart(1, "0")}:
          {String(remainingSeconds % 60).padStart(2, "0")}
        </p>
      </div>
    </div>
  )
}
