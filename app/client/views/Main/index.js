import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Timer from './components/Timer'
import Typer from './components/Typer'
import Stats from './components/Stats'
import {startCountdown, startTyping, finishTyping, setText} from '../../redux/actions/creators/typer'
import {COUNTDOWN, ACTIVE, DONE} from '../../constants/typer'

const mainProps = {
  style: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%'
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

  finishTyping () {
    this.props.finishTyping(this.state.time, this.state.chars + 1)
    this.setState({time: 0, chars: 0})
  }

  incrementTime () {
    this.setState({time: this.state.time + 1})
  }

  incrementChars () {
    this.setState({chars: this.state.chars + 1})
  }

  render () {
    const timerProps = {
      stage: this.props.stage,
      startCountdown: this.props.startCountdown,
      startTyping: this.props.startTyping,
      finishTyping: this.finishTyping.bind(this),
      incrementTime: this.incrementTime.bind(this)
    }

    const typerProps = {
      stage: this.props.stage,
      finishTyping: this.finishTyping.bind(this),
      setText: this.props.setText,
      incrementChars: this.incrementChars.bind(this)
    }

    const statsProps = {
      wpm: this.props.wpm,
      accuracy: this.props.accuracy
    }

    return (
      <div {...mainProps}>
        <Timer {...timerProps} />
        <Typer {...typerProps} />
        {this.props.stage === DONE &&
          <Stats {...statsProps} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stage: state.typer.stage,
    text: state.typer.text,
    wpm: state.typer.wpm,
    accuracy: state.typer.accuracy
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startCountdown: bindActionCreators(startCountdown, dispatch),
    startTyping: bindActionCreators(startTyping, dispatch),
    finishTyping: bindActionCreators(finishTyping, dispatch),
    setText: bindActionCreators(setText, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
