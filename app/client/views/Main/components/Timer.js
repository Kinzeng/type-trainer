import React from 'react'
import {typerState} from '..'

export default class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {minutes: 1, seconds: 0, timer: null}
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.state === typerState.DONE) {
      clearInterval(this.state.timer)
      clearInterval(this.state.preciseTimer)
    }
  }

  startCountdown () {
    this.setState({minutes: 0, seconds: 3})
    this.props.startCountdown()
    const timer = setInterval(() => {
      const nextSecond = this.state.seconds - 1
      if (nextSecond < 1) {
        clearInterval(timer)
        this.start()
      } else {
        this.setState({seconds: nextSecond})
      }
    }, 1000)
  }

  start () {
    this.setState({minutes: 1, seconds: 0})
    const timer = setInterval(this.tick.bind(this), 1000)
    const preciseTimer = setInterval(this.preciseTick.bind(this), 10)
    this.setState({timer, preciseTimer})
    this.props.start()
  }

  tick () {
    console.log(this.state.minutes, this.state.seconds)
    let nextMinute = this.state.minutes
    let nextSecond = this.state.seconds - 1
    if (nextSecond < 1) {
      nextMinute -= 1
      nextSecond = 59
    }

    if (nextMinute < 0) {
      console.log(nextMinute, nextSecond)
      this.finish()
    } else {
      this.setState({minutes: nextMinute, seconds: nextSecond})
    }
  }

  preciseTick () {
    this.props.incrementTime()
  }

  finish () {
    console.log(this.state.timer)
    clearInterval(this.state.timer)
    clearInterval(this.state.preciseTimer)
    this.setState({timer: null})
    this.props.finish()
  }

  render () {
    let timerStyle = {
      color: this.props.state === typerState.ACTIVE ? 'black' : 'red'
    }

    return (
      <div>
        {this.props.state === typerState.ACTIVE || this.props.state === typerState.COUNTDOWN
          ? <p style={timerStyle}>{`${this.state.minutes}:${this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}`}</p>
          : <button onClick={this.startCountdown.bind(this)}>Start!</button>
        }
      </div>
    )
  }
}
