import React from 'react'
import TyperText from './TyperText'
import TyperInput from './TyperInput'
import {passages, COUNTDOWN, ACTIVE, DONE} from '../../../../constants/typer'

const typerProps = {
  style: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  }
}

export default class Typer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {text: '', currentIndex: 0, textArray: [], nextWord: '', lastWord: false}
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.stage !== this.props.stage && nextProps.stage === COUNTDOWN) {
      const text = passages[Math.floor(Math.random() * passages.length)]
      const textArray = text.split(' ')
      this.setState({text, textArray, nextWord: textArray[0], lastWord: false, currentIndex: 0})
      this.props.setText(text)
    }
  }

  getNextWord () {
    const nextIndex = this.state.currentIndex + 1
    this.setState({currentIndex: nextIndex, nextWord: this.state.textArray[nextIndex]})
    if (nextIndex >= this.state.textArray.length - 1) {
      this.setState({lastWord: true})
    }
  }

  render () {
    const active = this.props.stage === ACTIVE
    const countdown = this.props.stage === COUNTDOWN
    const done = this.props.stage === DONE

    const textProps = {
      text: this.state.text,
      currentIndex: this.state.currentIndex
    }

    const inputProps = {
      active,
      done,
      lastWord: this.state.lastWord,
      nextWord: this.state.nextWord,
      getNextWord: this.getNextWord.bind(this),
      finishTyping: this.props.finishTyping
    }

    if (active || countdown || done) {
      return (
        <div {...typerProps}>
          <TyperText {...textProps} />
          <TyperInput {...inputProps} />
        </div>
      )
    } else {
      return <div />
    }
  }
}
