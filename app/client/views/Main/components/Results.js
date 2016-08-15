import React from 'react'
import {Link} from 'react-router'
import {blue} from '../../../colors'

const statsProps = {
  style: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-start',
    marginTop: '20px'
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
      return (
        <div {...statsProps}>
          Speed: {this.props.wpm} WPM<br />
          Accuracy: {this.props.accuracy}<br /><br />
          <Link {...linkProps}>More stats</Link>
        </div>
      )
    } else {
      return (
        <div {...statsProps}>
          You ran out of time or left the page, so your stats weren't saved
        </div>
      )
    }
  }
}
