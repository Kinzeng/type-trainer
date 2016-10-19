import React from 'react'
import {Link} from 'react-router'
import {blue, orange} from '../../../colors'

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
    margin: '0 0 14px'
  }
}

const statsTextProps = {
  style: {
    margin: 0
  }
}

const actionsProps = {
  style: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center'
  }
}

const linkProps = {
  to: '/stats',
  style: {
    marginRight: '10px',
    alignSelf: 'center',
    color: blue(),
    textDecoration: 'none'
  }
}

const startProps = {
  style: {
    marginLeft: '10px',
    color: orange(),
    cursor: 'pointer'
  }
}

export default class Results extends React.Component {
  render () {
    startProps.onClick = this.props.startCountdown

    if (this.props.wpm && this.props.accuracy) {
      // if the user finished typing a passage
      return (
        <div {...resultsProps}>
          <table {...statsProps}>
            <tbody>
              <tr><td>Speed:</td><td>{this.props.wpm} WPM</td></tr>
              <tr><td>Accuracy:</td><td>{this.props.accuracy}</td></tr>
              <tr><td>Potential Speed:</td><td>{this.props.potentialWPM} WPM</td></tr>
            </tbody>
          </table>
          <div {...actionsProps}>
            <Link {...linkProps}>More stats</Link>
            <div {...startProps}>Another one!</div>
          </div>
        </div>
      )
    } else {
      // if the user ran out of time or left the page
      return (
        <div {...resultsProps}>
          <p>You ran out of time or left the page, so your stats weren't saved</p>
          <div {...startProps}>Another one!</div>
        </div>
      )
    }
  }
}
