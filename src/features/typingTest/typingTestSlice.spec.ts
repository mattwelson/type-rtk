import type { RootState } from "@/app/store"
import { typingTestSlice } from "./typingTestSlice"
import { selectAccuracy, selectElapsedSeconds, selectWpm } from "./selectors"

const { keyPressed, backspace, initialiseTest } = typingTestSlice.actions
const reducer = typingTestSlice.reducer

describe("testSlice", () => {
  const baseState = reducer(undefined, initialiseTest({ words: ["hit"] }))

  it("starts idle", () => {
    expect(baseState.status).toBe("idle")
  })

  it("goes active on first keypress", () => {
    const state = reducer(baseState, keyPressed({ key: "h" }))
    expect(state.status).toBe("active")
    expect(state.startTime).not.toBeNull()
  })

  it("marks correct chars", () => {
    const state = reducer(baseState, keyPressed({ key: "h" }))
    expect(state.chars[0].state).toBe("correct")
  })

  it("marks wrong chars and increments errors", () => {
    const state = reducer(baseState, keyPressed({ key: "x" }))
    expect(state.chars[0].state).toBe("wrong")
    expect(state.errors).toBe(1)
  })

  it("backspace undoes wrong char", () => {
    const s1 = reducer(baseState, keyPressed({ key: "h" }))
    const s2 = reducer(s1, keyPressed({ key: "x" })) // wrong
    const s3 = reducer(s2, backspace())
    expect(s3.errors).toBe(0)
    expect(s3.chars[1].state).toBe("pending")
    expect(s3.currentIndex).toBe(1)
  })

  it("finishes when all chars typed", () => {
    const s1 = reducer(baseState, keyPressed({ key: "h" }))
    const s2 = reducer(s1, keyPressed({ key: "i" }))
    const s3 = reducer(s2, keyPressed({ key: "t" }))
    expect(s3.status).toBe("finished")
  })

  it("ignores keypresses when finished", () => {
    const s1 = reducer(baseState, keyPressed({ key: "h" }))
    const s2 = reducer(s1, keyPressed({ key: "i" }))
    const s3 = reducer(s2, keyPressed({ key: "t" })) // finished
    const s4 = reducer(s3, keyPressed({ key: "x" })) // should be ignored
    expect(s4.currentIndex).toBe(s3.currentIndex)
  })
})

describe("selectors", () => {
  describe("selectAccuracy", () => {
    it("selectAccuracy returns 100 when no chars typed", () => {
      const state = {
        typingTest: {
          currentIndex: 0,
          errors: 0,
        },
      } as RootState
      expect(selectAccuracy(state)).toBe(100)
    })

    it("selectAccuracy returns 100 when no errors", () => {
      const state = {
        typingTest: {
          currentIndex: 5,
          errors: 0,
        },
      } as RootState
      expect(selectAccuracy(state)).toBe(100)
    })

    it("selectAccuracy returns correct percentage when there are errors", () => {
      const state = {
        typingTest: {
          currentIndex: 5,
          errors: 1,
        },
      } as RootState
      expect(selectAccuracy(state)).toBe(80)
    })
  })

  describe("selectElapsedSeconds", () => {
    it("returns the elapsed time in seconds", () => {
      const state = {
        typingTest: {
          elapsed: 4500,
        },
      } as RootState
      expect(selectElapsedSeconds(state)).toBe(5)
    })

    it("rounds the elapsed time to the nearest second", () => {
      const state = {
        typingTest: {
          elapsed: 12345,
        },
      } as RootState
      expect(selectElapsedSeconds(state)).toBe(12)
    })
  })

  describe("selectWpm", () => {
    it("returns the words per minute", () => {
      const state = {
        typingTest: {
          elapsed: 4500,
          currentIndex: 10,
        },
      } as RootState
      expect(selectWpm(state)).toBe(24)
    })
  })
})
