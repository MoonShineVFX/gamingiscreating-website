import { useEffect, useRef, useState } from 'react'

type Props = {
  lines: string[][]
  typeSpeed?: number
  delay?: number
}

const INVISIBLE_CHAR = 'ㅤ'
const DELAY = 3500
const TYPE_SPEED = 40

const removeChar = (currentLine: any[]) => {
  let hasUpdated = false
  let hasFinished = false

  const newLines = currentLine
    .slice()
    .reverse()
    .map((curr, index, arr) => {
      if (curr.length === 1) {
        if (index === arr.length - 1) {
          hasFinished = true
        }

        return INVISIBLE_CHAR
      }
      if (hasUpdated) {
        return curr
      }

      hasUpdated = true
      const newWord = curr.slice(0, curr.length - 1)

      return newWord
    })
    .reverse()

  return {
    newLines,
    hasFinished,
  }
}

const addChar = (currentLine: any[], lines: any[], lineIndex: number) => {
  let hasUpdated = false
  let hasFinished = false
  const line = lines[lineIndex]
  const lastWord = line[line.length - 1]

  const newLines = currentLine.slice().map((curr, index) => {
    if (hasUpdated || curr.length === lines[lineIndex][index].length) {
      return curr
    }

    hasUpdated = true
    if (curr === INVISIBLE_CHAR) {
      return lines[lineIndex][index][0]
    }
    const newWord = curr + lines[lineIndex][index][curr.length]

    if (index === line.length - 1 && newWord.length === lastWord.length) {
      hasFinished = true
    }

    return newWord
  })

  return { hasFinished, newLines }
}

const useMultiLineTypeWriter = ({ lines, typeSpeed = TYPE_SPEED, delay = DELAY }: Props) => {
  const numLines = lines[0].length
  const [currentLine, setCurrentLine] = useState<any[]>(lines[0])
  const [lineIndex, setLineIndex] = useState(0)
  const [reversing, setReversing] = useState(false)
  const mountedRef = useRef(false)

  useEffect(() => {
    const line = lines[lineIndex]
    const lastWord = line[line.length - 1]
    const hasReachedEnd = currentLine[line.length - 1].length === lastWord.length
    const setNextLine = () => {
      setCurrentLine(new Array(numLines).fill(INVISIBLE_CHAR))
      setLineIndex(lineIndex === lines.length - 1 ? 0 : lineIndex + 1)
      setReversing(false)
    }

    if (!mountedRef.current) {
      mountedRef.current = true
      setReversing(true)
      return
    }

    const interval = setInterval(
      () => {
        const { hasFinished, newLines } = reversing
          ? removeChar(currentLine)
          : addChar(currentLine, lines, lineIndex)

        if (hasFinished) {
          setReversing(!reversing)
        }

        if (hasFinished && reversing) {
          return setNextLine()
        }

        setCurrentLine(newLines)
      },
      hasReachedEnd ? delay : typeSpeed
    )

    return () => clearInterval(interval)
  }, [currentLine, lineIndex, reversing, mountedRef.current])

  return {
    currentLine,
  }
}

export default useMultiLineTypeWriter