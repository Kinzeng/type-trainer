import React from 'react'
import {Link} from 'react-router'
import {blue} from '../../../colors'
import {randomInt} from '../../../utils'
import {tips} from '../../../constants/typer'

const resultsProps = {
  style: {
    marginTop: '20px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center'
  }
}

const statsProps = {
  style: {
    margin: '0 0 10px',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start'
  }
}

const statsTextProps = {
  style: {
    margin: 0
  }
}

const tipProps = {
  style: {
    margin: '0 0 10px',
    fontSize: '0.75em'
  }
}

const linkProps = {
  to: '/stats',
  style: {
    alignSelf: 'center',
    color: blue(),
    textDecoration: 'none'
  }
}

export default class Results extends React.Component {
  render () {
    if (this.props.wpm && this.props.accuracy) {
      const tip = tips[randomInt(0, tips.length)]
      return (
        <div {...resultsProps}>
          <div {...statsProps}>
            <p {...statsTextProps}>Speed: {this.props.wpm} WPM</p>
            <p {...statsTextProps}>Accuracy: {this.props.accuracy}</p>
          </div>
          <p {...tipProps}>Tip: {tip}</p>
          <Link {...linkProps}>More stats</Link>
        </div>
      )
    } else {
      return (
        <div {...resultsProps}>
          You ran out of time or left the page, so your stats weren't saved
        </div>
      )
    }
  }
}
