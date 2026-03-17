import { useAppSelector } from "@/app/hooks"
import { Trophy } from "lucide-react"

export function PersonalBest() {
  const best = useAppSelector(state => state.history.best)

  if (!best) return

  return (
    <div className="flex items-center gap-2">
      <Trophy className="text-yellow-300" />
      <p className="text-sm text-muted-foreground">Personal Best:</p>
      <p className="text-lg">{best.wpm} WPM</p>
    </div>
  )
}
