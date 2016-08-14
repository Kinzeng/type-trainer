import React from 'react'
import {displayTime} from '../../../utils'
import {COUNTDOWN, ACTIVE, DONE} from '../../../constants/typer'
import {red, green} from '../../../colors'

const containerProps = {
  style: {
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }
}

export default class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {minutes: 1, seconds: 0, timer: null}
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.stage === DONE) {
      clearInterval(this.state.timer)
      clearInterval(this.state.preciseTimer)
    }
  }

  componentWillUnmount () {
    if (this.props.stage === ACTIVE || this.props.stage === COUNTDOWN) {
      this.finish()
    }
  }

  startCountdown () {
    this.setState({minutes: 0, seconds: 3})
    this.props.startCountdown()

    const timer = setInterval(() => {
      const nextSecond = this.state.seconds - 1
      if (nextSecond < 0) {
        clearInterval(timer)
        this.start()
      } else {
        this.setState({seconds: nextSecond})
      }
    }, 1000)

    this.setState({timer})
  }

  start () {
    this.setState({minutes: 1, seconds: 0})
    // start a timer to display seconds
    const timer = setInterval(this.tick.bind(this), 1000)
    // start another timer that is used to calculate WPM.
    // a tick needs to be much faster than a second so that
    // WPM is more accurate
    const preciseTimer = setInterval(this.preciseTick.bind(this), 10)
    this.setState({timer, preciseTimer})
    this.props.startTyping()
  }

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

  preciseTick () {
    this.props.incrementTime()
  }

  finish () {
    clearInterval(this.state.timer)
    clearInterval(this.state.preciseTimer)
    this.setState({timer: null})
    this.props.finishTyping(false)
  }

  render () {
    const timerStyle = {
      color: this.props.stage === ACTIVE ? green() : red(),
      fontSize: '1.5em',
      margin: 'none'
    }

    const textStyle = {
      margin: '0px'
    }

    const buttonProps = {
      onClick: this.startCountdown.bind(this),
      style: {
        fontSize: '0.8em'
      }
    }

    return (
      <div {...containerProps}>
        <div style={timerStyle}>
          {this.props.stage === ACTIVE || this.props.stage === COUNTDOWN
            ? <p style={textStyle}>{displayTime(this.state.minutes, this.state.seconds)}</p>
            : <button {...buttonProps}>Start!</button>
          }
        </div>
        <button style={{position: 'fixed', top: 0, left: 0}} onClick={this.finish.bind(this, true)}>
          Done
        </button>
      </div>
    )
  }
}
