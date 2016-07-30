import React from 'react'
import Timer from './components/Timer'
import Typer from './components/Typer'
import Stats from './components/Stats'

export const typerState = {
  INIT: 'init',
  ACTIVE: 'active',
  COUNTDOWN: 'countdown',
  DONE: 'done'
}

const mainProps = {
  style: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

function calculateWPM (text, time) {
  // console.log(text.length, time)
  return (text.length / 5) / (time / 6000)
}

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {typerState: typerState.INIT, text: '', time: 0}
  }

  startCountdown () {
    this.setState({typerState: typerState.COUNTDOWN})
  }

  start () {
    this.setState({typerState: typerState.ACTIVE})
  }

  finish () {
    console.log('finish')
    this.setState({typerState: typerState.DONE, wpm: calculateWPM(this.state.text, this.state.time), text: '', time: 0})
  }

  setText (text) {
    this.setState({text})
  }

  incrementTime () {
    this.setState({time: this.state.time + 1})
  }

  render () {
    const timerProps = {
      state: this.state.typerState,
      startCountdown: this.startCountdown.bind(this),
      start: this.start.bind(this),
      finish: this.finish.bind(this),
      incrementTime: this.incrementTime.bind(this)
    }

    const typerProps = {
      state: this.state.typerState,
      finish: this.finish.bind(this),
      setText: this.setText.bind(this)
    }

    const statsProps = {
      wpm: this.state.wpm
    }

    return (
      <div {...mainProps}>
        <Timer {...timerProps} />
        <Typer {...typerProps} />
        {this.state.typerState === typerState.DONE &&
          <Stats {...statsProps} />
        }
      </div>
    )
  }
}
