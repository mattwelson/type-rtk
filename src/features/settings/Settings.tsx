import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { setDifficulty, setMode } from "./settingsSlice"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Difficulty, Mode } from "@/app/types"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"
import { initialiseTest } from "../typingTest/typingTestSlice"

const difficulties = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
]

const modes = [
  { value: "timed", label: "Timed (60s)" },
  { value: "words", label: "Passage" },
]

export function Settings() {
  const mode = useAppSelector(state => state.settings.mode)
  const difficulty = useAppSelector(state => state.settings.difficulty)
  const dispatch = useAppDispatch()

  const difficultyLabel = difficulties.find(d => d.value === difficulty)?.label
  const modeLabel = modes.find(m => m.value === mode)?.label

  useEffect(() => {
    dispatch(initialiseTest())
  }, [mode, difficulty, dispatch])

  return (
    <>
      {/* MOBILE SETTINGS */}
      <div className="sm:hidden grid grid-cols-2 gap-4">
        <Select
          items={difficulties}
          value={difficulty}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onValueChange={value => dispatch(setDifficulty(value!))}
        >
          <SelectTrigger className="w-full">{difficultyLabel}</SelectTrigger>
          <SelectContent>
            {difficulties.map(diff => (
              <SelectItem key={diff.value} value={diff.value}>
                {diff.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          items={modes}
          value={mode}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onValueChange={value => dispatch(setMode(value!))}
        >
          <SelectTrigger className="w-full">{modeLabel}</SelectTrigger>
          <SelectContent>
            {modes.map(m => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* DESKTOP SETTINGS */}
      <div className="hidden sm:flex gap-4 justify-center">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Difficulty:</span>
          <ToggleGroup
            value={[difficulty]}
            onValueChange={([value]) =>
              dispatch(setDifficulty(value as Difficulty))
            }
            spacing={2}
          >
            {difficulties.map(diff => (
              <ToggleGroupItem
                key={diff.value}
                value={diff.value}
                aria-label={diff.label}
              >
                {diff.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Mode:</span>
          <ToggleGroup
            value={[mode]}
            onValueChange={([value]) => dispatch(setMode(value as Mode))}
            spacing={2}
          >
            {modes.map(m => (
              <ToggleGroupItem
                key={m.value}
                value={m.value}
                aria-label={m.label}
              >
                {m.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </>
  )
}
