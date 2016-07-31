import {START_COUNTDOWN, START_TYPING, FINISH_TYPING, SET_TEXT} from '../types'

export function startCountdown () {
  return {type: START_COUNTDOWN}
}

export function startTyping () {
  return {type: START_TYPING}
}

export function finishTyping (time, chars) {
  return {type: FINISH_TYPING, time, chars}
}

export function setText (text) {
  return {type: SET_TEXT, text}
}
