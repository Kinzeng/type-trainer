import {START_COUNTDOWN, START_TYPING, LONG_TYPO, FINISH_TYPING, SET_TEXT} from '../actions/types'
import {INIT, COUNTDOWN, ACTIVE, DONE} from '../../constants/typer'

let initialState = {stage: INIT, text: '', longTypo: false, wpm: 0, accuracy: 0}

// reducer for the typer
// handles all the actions and sets the redux state accordingly
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

    case LONG_TYPO: {
      return {
        ...state,
        longTypo: action.typo
      }
    }

    case FINISH_TYPING: {
      return {
        ...state,
        stage: DONE,
        wpm: action.wpm,
        accuracy: action.accuracy,
        potentialWPM: action.potentialWPM
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
