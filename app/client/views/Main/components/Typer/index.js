import React from 'react'
import TyperText from './TyperText'
import TyperInput from './TyperInput'
import {typerState} from '../..'

let i = 0

export default class Typer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {text: '', input: ''}
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.state !== this.props.state && nextProps.state === typerState.COUNTDOWN) {
      // fetch new text here
      const text = 'Hey this is a test text. Try to type it as fast as you can. ' + i++
      this.setState({text})
      this.props.setText(text)
    }
  }

  render () {
    const active = this.props.state === typerState.ACTIVE
    const countdown = this.props.state === typerState.COUNTDOWN
    const done = this.props.state === typerState.DONE

    const inputProps = {
      active,
      done,
      text: this.state.text,
      finish: this.props.finish
    }

    if (active || countdown || done) {
      return (
        <div>
          <TyperText text={this.state.text} />
          <TyperInput {...inputProps} />
        </div>
      )
    } else {
      return <div />
    }
  }
}
