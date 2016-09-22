import React from 'react'
// import {findDOMNode} from 'react-dom'
import {COUNTDOWN, ACTIVE, DONE} from '../../../../constants/typer'
import {red, inputBackground, white, shadow} from '../../../../colors'

export default class TyperInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {inputValue: '', numWrong: 0}
  }

  componentWillReceiveProps (nextProps) {
    // focus and clear the input when the stage is countdown or active
    if (this.props.stage !== nextProps.stage && (nextProps.stage === ACTIVE ||
        nextProps.stage === COUNTDOWN)) {
      this.setState({inputValue: ''})
    }
  }

  onChange (e) {
    // only allow the input to change if the typer is active
    if (this.props.stage === ACTIVE) {
      const newValue = e.target.value

      // increment number of chars typed if the user typed a new char
      // (don't count it if the user is just deleting characters)
      if (this.state.inputValue.length < newValue.length) {
        this.props.incrementChars()
      }

      if (this.props.lastWord && newValue === this.props.nextWord) {
        // if this is the last word and the user matched the word, finish typing
        this.setState({inputValue: ''})
        this.props.finishTyping(true, this.props.textIndex)
      } else if (newValue === this.props.nextWord + ' ') {
        // otherwise get the next word if the user matched the word
        this.setState({inputValue: ''})
        this.props.getNextWord()
      } else if (!(this.props.nextWord + ' ').startsWith(newValue)) {
        // if the user has a typo, increment number of wrong characters and set the input occordingly
        const numWrong = this.state.numWrong + 1
        this.setState({
          numWrong,
          inputValue: newValue
        })

        // if the number of wrong characters is high enough, call the redux action passed in
        if (numWrong === 15) {
          this.props.showLongTypo()
        }
      } else { // otherwise clear the long typo and reset the number of wrong characters
        this.props.clearLongTypo()
        this.setState({
          numWrong: 0,
          inputValue: newValue
        })
      }
    }
  }

  onKeyDown (e) {
    // prevent input from being blurred if the user hits tab
    if (e.keyCode === 9) {
      e.preventDefault()
    }
  }

  // prevent input from being blurred
  onBlur (e) {
    e.target.focus()
  }

  render () {
    // turn the input text red if the user has a typo
    const color = this.props.stage === DONE
                    ? 'transparent'
                    : this.state.numWrong === 0
                      ? white()
                      : red()

    const inputProps = {
      value: this.state.inputValue,
      onChange: this.onChange.bind(this),
      onBlur: this.onBlur.bind(this),
      onKeyDown: this.onKeyDown.bind(this),
      autoFocus: true,
      ref: (ref) => { this.input = ref },
      style: {
        boxSizing: 'border-box',
        padding: '4px',
        width: '100%',
        outline: 'none',
        border: 'none',
        color,
        backgroundColor: inputBackground(),
        fontSize: '2em',
        boxShadow: `inset 0px 0px 10px 4px ${shadow(0.5)}`
      }
    }

    return <input {...inputProps} />
  }
}
