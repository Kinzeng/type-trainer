import {START_COUNTDOWN, START_TYPING, FINISH_TYPING, SET_TEXT} from '../types'
import {calculateWPM, calculateAccuracy} from '../../../utils'

const initialStats = {
  num: 0,
  averageWPM: 0,
  averageAcc: 0,
  personalRecord: 0,
  last10WPM: [],
  last10Acc: []
}

export function startCountdown () {
  return {type: START_COUNTDOWN}
}

export function startTyping () {
  return {type: START_TYPING}
}

export function finishTyping (text, time, chars, saveStats) {
  if (saveStats) {
    const wpm = calculateWPM(text, time)
    const accuracy = calculateAccuracy(text, chars)

    // if there is no object stored in localStorage, use initial stats

    // the last10 arrays of initialStats will be modified, but this is
    // okay because initialStats will only be used once if the user
    // does not clear the stats
    // if the user clears stats and then finishes another passage, the
    // single value stored in initialStats will be overridden
    const stats = JSON.parse(window.localStorage.getItem('stats')) || {...initialStats}
    const {num, averageWPM, averageAcc, personalRecord} = stats

    // calculate and store new averages
    const newWPM = ((averageWPM * num) + wpm) / (num + 1)
    const newAcc = ((averageAcc * num) + accuracy) / (num + 1)

    stats.num += 1
    stats.averageWPM = newWPM
    stats.averageAcc = newAcc

    // update personal record
    if (wpm > personalRecord) {
      stats.personalRecord = wpm
    }

    // store stats into correct "last 10" spot
    stats.last10WPM[num % 10] = wpm
    stats.last10Acc[num % 10] = accuracy

    window.localStorage.setItem('stats', JSON.stringify(stats))
    return {type: FINISH_TYPING, time, chars, wpm, accuracy: `${accuracy}%`}
  }

  return {type: FINISH_TYPING, wpm: null, accuracy: null}
}

export function setText (text) {
  return {type: SET_TEXT, text}
}
