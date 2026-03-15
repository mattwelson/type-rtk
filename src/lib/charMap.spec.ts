import { buildCharMap } from "./charMap"

describe("buildCharMap", () => {
  it("should build a character map from an array of words", () => {
    const words = ["hello", "world"]
    const charMap = buildCharMap(words)
    expect(charMap).toEqual([
      { char: "h", wordIndex: 0, state: "pending" },
      { char: "e", wordIndex: 0, state: "pending" },
      { char: "l", wordIndex: 0, state: "pending" },
      { char: "l", wordIndex: 0, state: "pending" },
      { char: "o", wordIndex: 0, state: "pending" },
      { char: " ", wordIndex: 0, state: "pending" },
      { char: "w", wordIndex: 1, state: "pending" },
      { char: "o", wordIndex: 1, state: "pending" },
      { char: "r", wordIndex: 1, state: "pending" },
      { char: "l", wordIndex: 1, state: "pending" },
      { char: "d", wordIndex: 1, state: "pending" },
    ])
  })
})
