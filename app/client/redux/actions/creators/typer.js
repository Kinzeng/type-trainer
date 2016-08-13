import {START_COUNTDOWN, START_TYPING, FINISH_TYPING, SET_TEXT} from '../types'
import {calculateWPM, calculateAccuracy} from '../../../utils'

export function startCountdown () {
  return {type: START_COUNTDOWN}
}

export function startTyping () {
  return {type: START_TYPING}
}

export function finishTyping (text, time, chars) {
  const wpm = calculateWPM(text, time)
  const accuracy = calculateAccuracy(text, chars)
  return {type: FINISH_TYPING, time, chars, wpm, accuracy}
}

export function setText (text) {
  return {type: SET_TEXT, text}
}
