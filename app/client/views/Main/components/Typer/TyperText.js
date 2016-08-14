import React from 'react'
import {white, green} from '../../../../colors'

const textProps = {
  style: {
    height: 'auto',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: '1.5em'
  }
}

export default class TyperText extends React.Component {
  render () {
    const textArray = this.props.text.split(' ')
    const text = textArray.map((word, index) => {
      let style = {
        marginRight: '5px',
        marginTop: '0px',
        color: !this.props.done && index === this.props.currentIndex ? green() : white()
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
