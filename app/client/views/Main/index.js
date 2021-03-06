import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import KeyListener from '../../containers/KeyListener'
import FlexGrow from '../../containers/FlexGrow'
import BoxShadow from '../../containers/BoxShadow'
import Welcome from './components/Welcome'
import Timer from './components/Timer'
import Typer from './components/Typer'
import Results from './components/Results'
import Tips from './components/Tips'
import {startCountdown, startTyping, showLongTypo, clearLongTypo,
        finishTyping, setText} from '../../redux/actions/creators/typer'
import {INIT, DONE} from '../../constants/typer'

const containerProps = {
  style: {
    flexGrow: 1,
    width: '50%',
    minWidth: '500px',
    maxWidth: '800px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    outline: 'none'
  }
}

const flexProps = {
  style: {
    display: 'flex',
    alignItems: 'center'
  }
}

const boxProps = {
  containerStyle: {},
  contentStyle: {
    padding: '35px 40px 40px'
  }
}

const viewProps = {
  style: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const tipProps = {
  style: {
    marginTop: '20px'
  }
}

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {text: '', time: 0, chars: 0}
  }

  // don't update if only the time changed
  shouldComponentUpdate (nextProps, nextState) {
    if (this.props !== nextProps) {
      return true
    }

    const keys = Object.keys(nextState)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (key !== 'time' && this.state[key] !== nextState[key]) {
        return true
      }
    }

    return false
  }

  finishTyping (saveStats, textIndex) {
    // call the redux action to calculate stats if saveStats is true and set the stage to done
    this.props.finishTyping(this.props.text, this.state.time, this.state.chars + 1, saveStats, textIndex)
    this.setState({time: 0, chars: 0})
  }

  // called every precise tick in the Timer
  incrementTime () {
    this.setState({time: this.state.time + 1})
  }

  // called when the user types a character, used to calculate accuracy
  incrementChars () {
    this.setState({chars: this.state.chars + 1})
  }

  onKeyDown (e) {
    if ((this.props.stage === INIT || this.props.stage === DONE) && e.keyCode === 13) {
      this.props.startCountdown()
    } else if (process.env.NODE_ENV !== 'production' && e.keyCode === 27) {
      this.props.finishTyping(false)
    }
  }

  render () {
    containerProps.onKeyDown = this.onKeyDown.bind(this)

    const welcomeProps = {
      startCountdown: this.props.startCountdown
    }

    const timerProps = {
      stage: this.props.stage,
      startCountdown: this.props.startCountdown,
      startTyping: this.props.startTyping,
      finishTyping: this.finishTyping.bind(this),
      incrementTime: this.incrementTime.bind(this)
    }

    const typerProps = {
      stage: this.props.stage,
      text: this.props.text,
      longTypo: this.props.longTypo,
      setText: this.props.setText,
      showLongTypo: this.props.showLongTypo,
      clearLongTypo: this.props.clearLongTypo,
      incrementChars: this.incrementChars.bind(this),
      finishTyping: this.finishTyping.bind(this)
    }

    const resultsProps = {
      startCountdown: this.props.startCountdown,
      wpm: this.props.wpm,
      accuracy: this.props.accuracy,
      potentialWPM: this.props.potentialWPM
    }

    // display the welcome page if the user just got to the website
    let view
    if (this.props.stage === INIT) {
      view = <Welcome {...welcomeProps} />
    } else {
      view = (
        <div {...viewProps}>
          <Timer {...timerProps} />
          <Typer {...typerProps} />
          {this.props.stage === DONE &&
            <Results {...resultsProps} />
          }
        </div>
      )
    }

    return (
      <KeyListener {...containerProps}>
        <FlexGrow {...flexProps}>
          <BoxShadow {...boxProps}>
            {view}
          </BoxShadow>
        </FlexGrow>
        {this.props.stage === DONE &&
          <div {...tipProps}>
            <Tips />
          </div>
        }
      </KeyListener>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stage: state.typer.stage,
    text: state.typer.text,
    longTypo: state.typer.longTypo,
    wpm: state.typer.wpm,
    accuracy: state.typer.accuracy,
    potentialWPM: state.typer.potentialWPM
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setText: bindActionCreators(setText, dispatch),
    startCountdown: bindActionCreators(startCountdown, dispatch),
    startTyping: bindActionCreators(startTyping, dispatch),
    showLongTypo: bindActionCreators(showLongTypo, dispatch),
    clearLongTypo: bindActionCreators(clearLongTypo, dispatch),
    finishTyping: bindActionCreators(finishTyping, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
