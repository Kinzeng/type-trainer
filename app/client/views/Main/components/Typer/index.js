import React from 'react'
import TyperText from './TyperText'
import TyperInput from './TyperInput'
import {randomInt} from '../../../../utils'
import {passages, COUNTDOWN, ACTIVE, DONE, SAGA_LENGTH} from '../../../../constants/typer'

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
    // choose a new passage when first mounting the component
    this.selectText()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.stage !== this.props.stage && nextProps.stage === COUNTDOWN) {
      // choose a new passage when the stage is switching to countdown
      this.selectText()
    } else if (nextProps.stage !== this.props.stage && nextProps.stage === DONE) {
      this.props.container.focus()
    }
  }

  selectText () {
    const stats = JSON.parse(window.localStorage.getItem('stats')) || {sagaProgress: -1}
    const {sagaProgress} = stats

    // select a random passage in the passages
    let index = randomInt(0, passages.length)

    if (index < SAGA_LENGTH) {
      // if a saga passage is chosen
      if (sagaProgress < SAGA_LENGTH - 1) {
        // select the next saga passage if the user hasn't finished the saga
        index = sagaProgress + 1
      } else if (Math.random() > 0.5) {
        // make the saga text less likely to appear after they've completed it
        index = randomInt(SAGA_LENGTH, passages.length)
      }
    }

    // replace any newlines in the text that were used for readability in the constants file
    const text = passages[index].replace(/\r?\n|\r/g, ' ')
    const textArray = text.split(' ')
    this.setState({
      text,
      textArray,
      textIndex: index,
      nextWord: textArray[0],
      lastWord: false,
      currentIndex: 0
    })

    // set the text in the redux state
    this.props.setText(text)
  }

  // get the next word that the user should type
  getNextWord () {
    const nextIndex = this.state.currentIndex + 1
    this.setState({currentIndex: nextIndex, nextWord: this.state.textArray[nextIndex]})
    if (nextIndex >= this.state.textArray.length - 1) {
      this.setState({lastWord: true})
    }
  }

  render () {
    const countdown = this.props.stage === COUNTDOWN
    const active = this.props.stage === ACTIVE
    const done = this.props.stage === DONE

    // only render the typer components if the stage is countdown, active, or done
    if (!(countdown || active || done)) {
      return <div />
    }

    const textProps = {
      done,
      longTypo: this.props.longTypo,
      textArray: this.state.textArray,
      currentIndex: this.state.currentIndex
    }

    const inputProps = {
      stage: this.props.stage,
      textIndex: this.state.textIndex,
      lastWord: this.state.lastWord,
      nextWord: this.state.nextWord,
      getNextWord: this.getNextWord.bind(this),
      showLongTypo: this.props.showLongTypo,
      clearLongTypo: this.props.clearLongTypo,
      finishTyping: this.props.finishTyping,
      incrementChars: this.props.incrementChars
    }

    if (countdown || active || done) {
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
