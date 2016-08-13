import React from 'react'
import {COUNTDOWN, ACTIVE} from '../../../../constants/typer'

export default class TyperInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {inputValue: ''}
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.stage !== nextProps.stage &&
       (nextProps.stage === ACTIVE || nextProps.stage === COUNTDOWN)) {
      console.log(this.props.stage, nextProps.stage)
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
        this.props.finishTyping()
      } else if (e.target.value === this.props.nextWord + ' ') {
        this.setState({inputValue: ''})
        this.props.getNextWord()
      } else {
        this.setState({inputValue: e.target.value})
      }
    }
  }

  render () {
    const inputProps = {
      value: this.state.inputValue,
      onChange: this.onChange.bind(this),
      autoFocus: true,
      ref: (ref) => { this.input = ref },
      style: {
        width: '100%',
        backgroundColor: (this.props.nextWord + ' ').startsWith(this.state.inputValue) ? 'white' : 'rgb(255,125,125)',
        fontSize: '18px'
      }
    }

    return <input {...inputProps} />
  }
}
