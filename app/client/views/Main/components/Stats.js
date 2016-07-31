import React from 'react'

export default class Stats extends React.Component {
  render () {
    return <div>{`WPM: ${this.props.wpm} Accuracy: ${this.props.accuracy}`}</div>
  }
}
