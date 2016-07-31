import React from 'react'

export default class TyperInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {inputValue: ''}
  }

  onChange (e) {
    if (this.props.active) {
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
      style: {
        width: '100%',
        backgroundColor: (this.props.nextWord + ' ').startsWith(this.state.inputValue) ? 'white' : 'rgb(255,125,125)',
        fontSize: '18px'
      }
    }

    return <input {...inputProps} />
  }
}
