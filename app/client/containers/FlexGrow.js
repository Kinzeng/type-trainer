import React from 'react'

const defaultContainerStyle = {
  flexGrow: 1
}

export default class FlexGrow extends React.Component {
  render () {
    const containerStyle = {
      ...defaultContainerStyle,
      ...this.props.style
    }

    return (
      <div style={containerStyle}>
        {this.props.children}
      </div>
    )
  }
}
