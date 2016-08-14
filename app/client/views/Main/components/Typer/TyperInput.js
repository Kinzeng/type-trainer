import React from 'react'
import {COUNTDOWN, ACTIVE, DONE} from '../../../../constants/typer'
import {red, inputBackground, white, black, shadow} from '../../../../colors'

export default class TyperInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {inputValue: ''}
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
        this.props.finishTyping(true)
      } else if (e.target.value === this.props.nextWord + ' ') {
        this.setState({inputValue: ''})
        this.props.getNextWord()
      } else {
        this.setState({inputValue: e.target.value})
      }
    }
  }

  render () {
    const correct = (this.props.nextWord + ' ').startsWith(this.state.inputValue)
    const backgroundColor = inputBackground()
    const color = correct ? white() : red()

    const inputProps = {
      value: this.state.inputValue,
      onChange: this.onChange.bind(this),
      autoFocus: true,
      ref: (ref) => { this.input = ref },
      style: {
        width: '100%',
        color,
        backgroundColor,
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
