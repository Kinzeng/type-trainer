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

  // store stats into correct "last 10" spot
  const last10WPM = JSON.parse(window.localStorage.getItem('last10WPM')) || []
  const last10Acc = JSON.parse(window.localStorage.getItem('last10Acc')) || []
  last10WPM[num % 10] = wpm
  last10Acc[num % 10] = accuracy
  window.localStorage.setItem('last10WPM', JSON.stringify(last10WPM))
  window.localStorage.setItem('last10Acc', JSON.stringify(last10Acc))

  return {type: FINISH_TYPING, time, chars, wpm, accuracy: `${accuracy}%`}
}

export function setText (text) {
  return {type: SET_TEXT, text}
}
