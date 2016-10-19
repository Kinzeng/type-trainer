import {START_COUNTDOWN, START_TYPING, LONG_TYPO, FINISH_TYPING, SET_TEXT} from '../types'
import {calculateWPM, calculateAccuracy} from '../../../utils'
import {SAGA_LENGTH} from '../../../constants/typer'

const initialStats = {
  num: 0,
  averageWPM: 0,
  averageAcc: 0,
  personalRecord: 0,
  last10WPM: [],
  last10Acc: [],
  sagaProgress: -1
}

// set the stage to countdown
export function startCountdown () {
  return {type: START_COUNTDOWN}
}

// set the stage to active
export function startTyping () {
  return {type: START_TYPING}
}

// the user has a long typo
export function showLongTypo () {
  return {type: LONG_TYPO, typo: true}
}

// the user fixed the long typo
export function clearLongTypo () {
  return {type: LONG_TYPO, typo: false}
}

// set the stage to done and calculate and store stats if necessary
export function finishTyping (text, time, chars, saveStats, textIndex) {
  if (saveStats) {
    const wpm = calculateWPM(text.length, time)
    const accuracy = calculateAccuracy(text, chars)
    const potentialWPM = calculateWPM(chars, time)

    // if there is no object stored in localStorage, use initial stats

    // the last10 arrays of initialStats will be modified, but this is
    // okay because initialStats will only be used once if the user
    // does not clear the stats
    // if the user clears stats and then finishes another passage, the
    // single value stored in initialStats will be overridden
    const stats = JSON.parse(window.localStorage.getItem('stats')) || {...initialStats}
    const {num, averageWPM, averageAcc, personalRecord, sagaProgress} = stats

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
    // the arrays are rotating arrays in that every time a new entry is entered,
    // the oldest entry is replaced, and we display the stats in the correct order
    // in the Stats component based on the number of passages stored
    stats.last10WPM[num % 10] = wpm
    stats.last10Acc[num % 10] = accuracy

    // check sagaProgress
    if (textIndex >= 0 && textIndex < SAGA_LENGTH) {
      stats.sagaProgress = Math.max(sagaProgress, textIndex)
    }

    // store the stats in localStorage so that the user's stats are saved even when leaving
    // the webpage
    window.localStorage.setItem('stats', JSON.stringify(stats))
    return {type: FINISH_TYPING, time, chars, wpm, accuracy: `${accuracy}%`, potentialWPM}
  }

  return {type: FINISH_TYPING, wpm: null, accuracy: null, potentialWPM: null}
}

// set the current text that the user is typing
export function setText (text) {
  return {type: SET_TEXT, text}
}
