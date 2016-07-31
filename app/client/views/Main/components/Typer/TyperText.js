import React from 'react'

const textProps = {
  style: {
    height: 'auto',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: '18px'
  }
}

export default class TextBlock extends React.Component {
  render () {
    const textArray = this.props.text.split(' ')
    const text = textArray.map((word, index) => {
      let style = {
        marginRight: '5px',
        color: index === this.props.currentIndex ? 'green' : 'black'
      }

      return <p key={index} style={style}>{word}</p>
    })
    return (
      <div {...textProps}>
        {text}
      </div>
    )
  }
}
