import React from 'react'

const statsProps = {
  style: {
    marginTop: '20px'
  }
}

export default class Results extends React.Component {
  render () {
    return <div {...statsProps}>{`WPM: ${this.props.wpm} Accuracy: ${this.props.accuracy}`}</div>
  }
}
