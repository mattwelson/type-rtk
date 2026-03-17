import { useAppSelector } from "./app/hooks"
import logo from "./assets/images/logo-large.svg"
import { PersonalBest } from "./features/history/PersonalBest"
import { Results } from "./features/typingTest/Results"
import { TypingTest } from "./features/typingTest/TypingTest"
import { useTypingTest } from "./hooks/useTypingTest"

export const App = () => {
  const testStatus = useAppSelector(s => s.typingTest.status)
  useTypingTest()

  return (
    <div className="App bg-background text-foreground min-h-screen p-4">
      <header className="max-w-3xl flex justify-between mx-auto">
        <img
          src={logo}
          className="h-10 w-10 object-left object-cover md:w-auto"
          alt="Typing Speed Test"
        />
        <PersonalBest />
      </header>

      {["idle", "active"].includes(testStatus) && <TypingTest />}
      {testStatus === "finished" && <Results />}
    </div>
  )
}
