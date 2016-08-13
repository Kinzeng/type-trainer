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

  // calculate and store new average
  const num = parseInt(window.localStorage.getItem('num') || 0)

  const currentWPM = parseFloat(window.localStorage.getItem('averageWPM') || 0)
  const newWPM = ((currentWPM * num) + wpm) / (num + 1)

  const currentAcc = parseFloat(window.localStorage.getItem('averageAcc') || 0)
  const newAcc = ((currentAcc * num) + accuracy) / (num + 1)

  window.localStorage.setItem('num', num + 1)
  window.localStorage.setItem('averageWPM', newWPM)
  window.localStorage.setItem('averageAcc', newAcc)

  return {type: FINISH_TYPING, time, chars, wpm, accuracy: `${accuracy}%`}
}

export function setText (text) {
  return {type: SET_TEXT, text}
}
