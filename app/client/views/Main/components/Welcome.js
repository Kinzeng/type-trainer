import React from 'react'
import {orange} from '../../../colors'

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

const signatures = [
  'Created by one of the ten million Kevin Zhangs',
  'Created by Kevin Zhang #1028392',
  'Created by probably the fifth Kevin Zhang you know',
  'Created by Kevin Zhang (ugh, not another Kevin Zhang)',
  'Created by Kevin Zhang. Not that Kevin Zhang, the other Kevin Zhang.',
  'Created by Kevin Zhang (there are quite a few of us, ya know)'
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
          for your last ten passages, and your personal record.
          <br /><br />
            Right now there is one series of passages that tell a story along with
          other random things that don't really mean anything. I'll try to add more
          passages as soon as possible, but in the meantime,&nbsp;enjoy!
          <br /><br />
          Click <span {...spanProps}>here</span> to start!
        </p>
        <p style={signatureStyle}>{signature}</p>
      </div>
    )
  }
}
