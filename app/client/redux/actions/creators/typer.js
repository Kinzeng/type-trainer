import {SET_STAGE, START_COUNTDOWN, START_TYPING, FINISH_TYPING, SET_TEXT} from '../types'

export function startCountdown () {
  return {type: START_COUNTDOWN}
}

export function startTyping () {
  return {type: START_TYPING}
}

export function finishTyping (time) {
  return {type: FINISH_TYPING, time}
}

export function setText (text) {
  return {type: SET_TEXT, text}
}

export function setStage (stage) {
  console.log('setStage', stage)
  return {type: SET_STAGE, stage}
}
