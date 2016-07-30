import React from 'react'
import Timer from './components/Timer'
import Typer from './components/Typer'

const mainProps = {
  style: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {active: false, countdown: false}
  }

  startCountdown () {
    this.setState({countdown: true})
  }

  start () {
    this.setState({active: true, countdown: false})
  }

  finish () {
    this.setState({active: false})
  }

  render () {
    const timerProps = {
      active: this.state.active,
      countdown: this.state.countdown,
      startCountdown: this.startCountdown.bind(this),
      start: this.start.bind(this),
      finish: this.finish.bind(this)
    }

    const typerProps = {
      active: this.state.active,
      countdown: this.state.countdown,
      done: this.state.done
    }

    return (
      <div {...mainProps}>
        <Timer {...timerProps} />

        <Typer {...typerProps} />
      </div>
    )
  }
}
