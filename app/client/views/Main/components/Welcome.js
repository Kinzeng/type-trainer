import React from 'react'
import {blue, orange} from '../../../colors'

const titleStyle = {
  marginTop: '0px',
  marginBottom: '20px'
}

const textStyle = {
  lineHeight: '30px',
  marginTop: '0px',
  marginBottom: '20px'
}

const signatureStyle = {
  textAlign: 'right',
  fontSize: '0.75em',
  margin: 0
}

const LINK = 'https://github.com/Kinzeng'
const linkProps = {
  href: LINK,
  target: '_blank',
  style: {
    textDecoration: 'none',
    color: blue()
  }
}
const signatures = [
  <span>Created by one of the ten million <a {...linkProps}>Kevin Zhangs</a></span>,
  <span>Created by <a {...linkProps}>Kevin Zhang #1028392</a></span>,
  <span>Created by probably the fifth <a {...linkProps}>Kevin Zhang</a> you know</span>,
  <span>Created by <a {...linkProps}>Kevin Zhang</a> (ugh, not another Kevin Zhang)</span>,
  <span>Created by <a {...linkProps}>Kevin Zhang</a>. Not that Kevin Zhang, the other Kevin Zhang.</span>,
  <span>Created by <a {...linkProps}>Kevin Zhang</a> (there are quite a few of us, ya know)</span>
]

export default class Welcome extends React.Component {
  render () {
    const spanProps = {
      onClick: this.props.startCountdown,
      style: {
        cursor: 'pointer',
        color: orange()
      }
    }

    const index = Math.floor(Math.random() * signatures.length)
    const signature = signatures[index]

    return (
      <div>
        <h2 style={titleStyle}>Welcome to Type Trainer!</h2>
        <p style={textStyle}>
            This is a simple web application that helps you practice typing.
          You will be given a passage to type and you just try to type it as
          fast as you can once the countdown finishes. After each passage, your
          words per minute (WPM) and accuracy will be displayed. You can also
          check stats like your overall average speed and accuracy, averages
          for your last ten passages, and your personal&nbsp;record.
          <br /><br />
            Right now there is one series of passages that tell a story along with
          other random passages that don't really mean anything. I'll try to add
          more passages as soon as possible, but in the meantime,&nbsp;enjoy!
          <br /><br />
          Click <span {...spanProps}>here</span> to start!
        </p>
        <p style={signatureStyle}>{signature}</p>
      </div>
    )
  }
}
