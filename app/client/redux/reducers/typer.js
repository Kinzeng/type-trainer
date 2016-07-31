import {SET_STAGE, START_COUNTDOWN, START_TYPING, FINISH_TYPING, SET_TEXT} from '../actions/types'
import {COUNTDOWN, ACTIVE, DONE} from '../../constants/typer'

let initialState = {stage: 'init', text: '', wpm: ''}

function calculateWPM (text, time) {
  return ((text.length / 5) / (time / 6000)).toFixed(0)
}

export default function (state = initialState, action) {
  switch (action.type) {
    case START_COUNTDOWN: {
      return {
        ...state,
        stage: COUNTDOWN
      }
    }

    case START_TYPING: {
      return {
        ...state,
        stage: ACTIVE
      }
    }

    case FINISH_TYPING: {
      const wpm = calculateWPM(state.text, action.time)
      return {
        ...state,
        stage: DONE,
        wpm
      }
    }

    case SET_TEXT : {
      return {
        ...state,
        text: action.text
      }
    }

    case SET_STAGE: {
      return {
        ...state,
        stage: action.stage
      }
    }

    default: {
      return state
    }
  }
}
