import React from 'react'

const statsProps = {
  style: {
    marginTop: '20px'
  }
}

export default class Results extends React.Component {
  render () {
    if (this.props.wpm && this.props.accuracy) {
      return <div {...statsProps}>{`WPM: ${this.props.wpm} Accuracy: ${this.props.accuracy}`}</div>
    } else {
      return (
        <div {...statsProps}>
          You ran out of time or left the page, so your stats weren't saved
        </div>
      )
    }
  }
}
