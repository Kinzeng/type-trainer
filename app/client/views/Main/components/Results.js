import React from 'react'
import {Link} from 'react-router'
import {blue} from '../../../colors'

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
      // if the user finished typing a passage

      return (
        <div {...resultsProps}>
          <div {...statsProps}>
            <p {...statsTextProps}>Speed: {this.props.wpm} WPM</p>
            <p {...statsTextProps}>Accuracy: {this.props.accuracy}</p>
          </div>
          <Link {...linkProps}>More stats</Link>
        </div>
      )
    } else {
      // if the user ran out of time or left the page
      return (
        <div {...resultsProps}>
          You ran out of time or left the page, so your stats weren't saved
        </div>
      )
    }
  }
}
