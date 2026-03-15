import logo from "./assets/images/logo-large.svg"
import { Separator } from "./components/ui/separator"
import { Settings } from "./features/settings/Settings"
import { LiveResult } from "./features/test/LiveResult"
import { TypingTest } from "./features/test/TypingTest"

export const App = () => (
  <div className="App bg-background text-foreground min-h-screen p-4">
    <header className="max-w-3xl">
      <img
        src={logo}
        className="size-10 object-left object-cover md:size-auto"
        alt="Typing Speed Test"
      />
      {/* TODO: add PB here based on history */}
    </header>
    <div className="grid lg:grid-cols-2 my-4 gap-4">
      <LiveResult />
      <Settings />
    </div>
    <Separator />

    <TypingTest />
  </div>
)
