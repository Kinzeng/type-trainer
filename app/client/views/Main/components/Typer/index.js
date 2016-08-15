import React from 'react'
import TyperText from './TyperText'
import TyperInput from './TyperInput'
import {randomInt} from '../../../../utils'
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
    this.state = {text: props.text || '', currentIndex: 0, textArray: [], nextWord: '', lastWord: false}
  }

  componentWillMount () {
    if (this.props.text) {
      this.setState({text: this.props.text})
    } else {
      this.selectText()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.stage !== this.props.stage && nextProps.stage === COUNTDOWN) {
      this.selectText()
    }
  }

  selectText () {
    const stats = JSON.parse(window.localStorage.getItem('stats')) || {sagaProgress: -1}
    const {sagaProgress} = stats

    let index = randomInt(0, passages.length)

    if (index >= 0 && index <= 7) { // if a saga passage is chosen
      if (sagaProgress < 7) { // select the next saga passage
        index = sagaProgress + 1
      } else { // 10% chance to type a saga passage again, otherwise choose a different one
        const chance = Math.random()
        console.log(chance)
        if (chance > 0.5) {
          index = randomInt(8, passages.length)
        }
      }
    }

    const text = passages[index].replace(/\r?\n|\r/g, ' ')
    const textArray = text.split(' ')
    this.setState({text, textArray, textIndex: index, nextWord: textArray[0], lastWord: false, currentIndex: 0})
    this.props.setText(text)
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
      done,
      text: this.state.text,
      currentIndex: this.state.currentIndex
    }

    const inputProps = {
      stage: this.props.stage,
      textIndex: this.state.textIndex,
      lastWord: this.state.lastWord,
      nextWord: this.state.nextWord,
      getNextWord: this.getNextWord.bind(this),
      finishTyping: this.props.finishTyping,
      incrementChars: this.props.incrementChars
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
