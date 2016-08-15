import {START_COUNTDOWN, START_TYPING, FINISH_TYPING, SET_TEXT} from '../actions/types'
import {INIT, COUNTDOWN, ACTIVE, DONE} from '../../constants/typer'

let initialState = {stage: INIT, text: '', wpm: ''}

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
      return {
        ...state,
        stage: DONE,
        wpm: action.wpm,
        accuracy: action.accuracy
      }
    }

    case SET_TEXT : {
      return {
        ...state,
        text: action.text
      }
    }

    default: {
      return state
    }
  }
}
