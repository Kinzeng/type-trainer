import React from 'react'

export default class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  startCountdown () {
    this.setState({minutes: 0, seconds: 3})
    const timer = setInterval(() => {
      const nextSecond = this.state.seconds - 1
      if (nextSecond < 0) {
        clearInterval(timer)
        this.start()
      } else {
        this.setState({seconds: nextSecond})
      }
    }, 1000)
    this.props.startCountdown()
  }

  start () {
    this.setState({minutes: 1, seconds: 0})
    const timer = setInterval(this.tick.bind(this), 1000)
    this.setState({timer})
    this.props.start()
  }

  tick () {
    let nextMinute = this.state.minutes
    let nextSecond = this.state.seconds - 1
    if (nextSecond < 0) {
      nextMinute -= 1
      nextSecond = 59
    }

    if (nextMinute < 0) {
      this.finish()
    } else {
      this.setState({minutes: nextMinute, seconds: nextSecond})
    }
  }

  finish () {
    clearInterval(this.state.timer)
    this.setState({timer: null})
    this.props.finish()
  }

  render () {
    return (
      <div>
        {this.props.active || this.props.countdown
          ? <p>{`${this.state.minutes}:${this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}`}</p>
          : <button onClick={this.startCountdown.bind(this)}>Start!</button>
        }
      </div>
    )
  }
}
