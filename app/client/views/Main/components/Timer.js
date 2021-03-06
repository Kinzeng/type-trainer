import React from 'react'
import {displayTime} from '../../../utils'
import {COUNTDOWN, ACTIVE, DONE} from '../../../constants/typer'
import {red, green, orange, gray} from '../../../colors'

const containerProps = {
  style: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }
}

export default class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {minutes: 3, seconds: 0, timer: null, preciseTimer: null}
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.stage === DONE) {   // clear the timers and state when the user finishes
      clearInterval(this.state.timer) // typing the passage
      clearInterval(this.state.preciseTimer)
      this.setState({timer: null, preciseTimer: null})
    } else if (!this.state.timer &&                    // start the countdown if the timers
               this.props.stage !== nextProps.stage && // aren't already ticking and if the
               nextProps.stage === COUNTDOWN) {        // stage is on countdown
      this.startCountdown()
    }
  }

  // start countdown as soon as the page is loaded
  componentWillMount () {
    this.startCountdown()
  }

  componentWillUnmount () {
    // finish typing if the user leaves the page
    if (this.props.stage === ACTIVE || this.props.stage === COUNTDOWN) {
      this.finish()
    }
  }

  // starts the countdown
  startCountdown () {
    this.setState({minutes: 0, seconds: 3})
    // set the redux state to countdown if it's not already
    if (this.props.stage !== COUNTDOWN) {
      this.props.startCountdown()
    }

    // decrement the displayed timer every second
    const timer = setInterval(() => {
      const nextSecond = this.state.seconds - 1
      if (nextSecond < 0) {
        // when the countdown finishes, start typing
        clearInterval(timer)
        this.start()
      } else {
        this.setState({seconds: nextSecond})
      }
    }, 1000)

    this.setState({timer})
  }

  start () {
    this.setState({minutes: 2, seconds: 0})
    // start a timer to display seconds
    const timer = setInterval(this.tick.bind(this), 1000)
    // start another timer that is used to calculate WPM.
    // a tick needs to be much faster than a second so that
    // WPM is more accurate
    const preciseTimer = setInterval(this.props.incrementTime, 5)
    this.setState({timer, preciseTimer})

    // set the redux state to active
    this.props.startTyping()
  }

  // decrement the displayed timer every second
  tick () {
    let nextMinute = this.state.minutes
    let nextSecond = this.state.seconds - 1
    if (nextSecond < 1) {
      nextMinute -= 1
      nextSecond = 59
    }

    if (nextMinute < 0) {
      this.finish()
    } else {
      this.setState({minutes: nextMinute, seconds: nextSecond})
    }
  }

  // clear both timers so that they don't continue to tick
  finish () {
    clearInterval(this.state.timer)
    clearInterval(this.state.preciseTimer)
    this.setState({timer: null, preciseTimer: null})

    // set redux state to done, but don't calculate stats
    this.props.finishTyping(false)
  }

  render () {
    const timerStyle = {
      color: this.props.stage === ACTIVE
        ? green()
        : this.props.stage === COUNTDOWN
          ? red()
          : gray(),
      fontSize: '1.5em',
      margin: 'none'
    }

    const textStyle = {
      margin: 0
    }

    // if the stage is countdown or active, show the timer
    // otherwise, show a button to start another passage
    return (
      <div {...containerProps}>
        <div style={timerStyle}>
          <p style={textStyle}>{displayTime(this.state.minutes, this.state.seconds)}</p>
        </div>
        {process.env.NODE_ENV !== 'production' &&
          <button style={{position: 'fixed', top: 0, left: 0}} onClick={this.finish.bind(this, true)}>
            Done
          </button>
        }
      </div>
    )
  }
}
