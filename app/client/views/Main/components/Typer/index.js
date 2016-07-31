import React from 'react'
import TyperText from './TyperText'
import TyperInput from './TyperInput'
import {passages, COUNTDOWN, ACTIVE, DONE} from '../../../../constants/typer'

export default class Typer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {text: '', input: ''}
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.stage !== this.props.stage && nextProps.stage === COUNTDOWN) {
      // fetch new text here
      const text = passages[Math.floor(Math.random() * passages.length)]
      this.setState({text})
      this.props.setText(text)
    }
  }

  render () {
    const active = this.props.stage === ACTIVE
    const countdown = this.props.stage === COUNTDOWN
    const done = this.props.stage === DONE

    const inputProps = {
      active,
      done,
      text: this.state.text,
      finishTyping: this.props.finishTyping
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
