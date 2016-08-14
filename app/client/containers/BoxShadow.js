import React from 'react'
import {shadow, cardBackground} from '../colors'

const defaultContainerStyle = {
  backgroundColor: 'white',
  boxShadow: `0px 1px 5px 5px ${shadow(0.3)}`,
  borderRadius: '10px',
  overflow: 'hidden'
}

const defaultContentStyle = {
  padding: '40px',
  backgroundColor: cardBackground()
}

export default class BoxShadow extends React.Component {
  render () {
    const containerStyle = {
      ...defaultContainerStyle,
      ...this.props.containerStyle
    }

    const contentStyle = {
      ...defaultContentStyle,
      ...this.props.contentStyle
    }

    return <div style={containerStyle}><div style={contentStyle}>{this.props.children}</div></div>
  }
}
