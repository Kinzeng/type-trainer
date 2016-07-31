import React from 'react'

export default class TyperInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {inputValue: ''}
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.done) {
      this.setState({inputValue: ''})
    }
  }

  onChange (e) {
    if (this.props.active) {
      if (e.target.value === this.props.text) {
        this.setState({inputValue: ''})
        this.props.finishTyping()
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
        width: '100%'
      }
    }

    return <textarea {...inputProps} />
  }
}
