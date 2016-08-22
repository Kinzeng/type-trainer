import React from 'react'
import {COUNTDOWN, ACTIVE, DONE} from '../../../../constants/typer'
import {red, inputBackground, white, shadow} from '../../../../colors'

export default class TyperInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {inputValue: '', correct: true, numWrong: 0}
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.stage !== nextProps.stage &&
       (nextProps.stage === ACTIVE || nextProps.stage === COUNTDOWN)) {
      this.setState({inputValue: ''})
      this.input.focus()
    }
  }

  onChange (e) {
    if (this.props.stage === ACTIVE) {
      if (this.state.inputValue.length < e.target.value.length) {
        this.props.incrementChars()
      }

      if (this.props.lastWord && e.target.value === this.props.nextWord) {
        this.setState({inputValue: ''})
        this.props.finishTyping(true, this.props.textIndex)
      } else if (e.target.value === this.props.nextWord + ' ') {
        this.setState({inputValue: ''})
        this.props.getNextWord()
      } else if (!(this.props.nextWord + ' ').startsWith(e.target.value)) {
        const numWrong = this.state.numWrong + 1
        this.setState({
          correct: false,
          numWrong,
          inputValue: e.target.value
        })

        if (numWrong === 10) {
          this.props.showLongTypo()
        }
      } else {
        this.props.clearLongTypo()
        this.setState({
          correct: true,
          numWrong: 0,
          inputValue: e.target.value
        })
      }
    }
  }

  render () {
    console.log(this.state.numWrong)
    const color = this.state.correct ? white() : red()

    const inputProps = {
      value: this.state.inputValue,
      onChange: this.onChange.bind(this),
      autoFocus: true,
      ref: (ref) => { this.input = ref },
      style: {
        width: '100%',
        color,
        backgroundColor: inputBackground(),
        fontSize: '2em',
        outline: 'none',
        border: 'none',
        padding: '4px',
        boxShadow: `inset 0px 0px 10px 4px ${shadow(0.5)}`
      },
      disabled: this.props.stage === DONE
    }

    return <input {...inputProps} />
  }
}
