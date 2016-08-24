import React from 'react'
import {white, green, red} from '../../../../colors'

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
    // render the chosen text in a series of p tags
    const text = this.props.textArray.map((word, index) => {
      let color
      if (!this.props.done && index === this.props.currentIndex) {
        // display the current word in green
        color = green()
      } else if (this.props.longTypo) {
        // display all the other words in red if the user has a long typo
        color = red()
      } else {
        // otherwise render all other words in white
        color = white()
      }

      let style = {
        marginRight: '5px',
        marginTop: '0px',
        color
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
