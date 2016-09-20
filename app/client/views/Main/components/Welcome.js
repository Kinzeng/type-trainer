import React from 'react'
import {Link} from 'react-router'
import {blue, orange} from '../../../colors'
import {randomInt} from '../../../utils'

const titleProps = {
  style: {
    marginTop: '0px',
    marginBottom: '20px'
  }
}

const textProps = {
  style: {
    lineHeight: '1.75em',
    marginTop: '0px',
    marginBottom: '20px'
  }
}

const signatureProps = {
  style: {
    textAlign: 'right',
    fontSize: '0.75em',
    margin: 0
  }
}

const LINK = 'https://github.com/Kinzeng'
const linkProps = {
  to: LINK,
  target: '_blank',
  style: {
    textDecoration: 'none',
    color: blue()
  }
}
const signatures = [
  <span>Created by one of the ten million <Link {...linkProps}>Kevin Zhangs</Link></span>,
  <span>Created by <Link {...linkProps}>Kevin Zhang #1028392</Link></span>,
  <span>Created by probably the fifth <Link {...linkProps}>Kevin Zhang</Link> you know</span>,
  <span>Created by <Link {...linkProps}>Kevin Zhang</Link> (ugh, not another Kevin Zhang)</span>,
  <span>Created by <Link {...linkProps}>Kevin Zhang</Link>. Not that Kevin Zhang, the other Kevin Zhang.</span>,
  <span>Created by yet another <Link {...linkProps}>Kevin Zhang</Link> (there are quite a few of us, ya know)</span>
]

export default class Welcome extends React.Component {
  render () {
    const startProps = {
      onClick: this.props.startCountdown,
      style: {
        cursor: 'pointer',
        color: orange()
      }
    }

    const infoProps = {
      to: '/info',
      style: {
        textDecoration: 'none',
        color: blue()
      }
    }

    // choose a random signature from the array
    const signature = signatures[randomInt(0, signatures.length)]

    return (
      <div>
        <h2 {...titleProps}>Welcome to Type Trainer!</h2>
        <p {...textProps}>
            This is a simple web application that helps you practice typing.
          You will be given a passage to type and you just try to type it as
          fast as you can once the countdown finishes. After each passage, your
          words per minute (WPM) and accuracy will be displayed. You can also
          check stats like your overall average speed and accuracy, averages
          for your last ten passages, and your personal&nbsp;record.
          <br /><br />
            Right now the passages are just random things that I typed up. They're
          pretty random and don't really mean anything, but I'll try to add
          more passages as soon as possible. In the meantime,&nbsp;enjoy!
          <br /><br />
          Click <span {...startProps}>here</span> or press enter to start
          or click <Link {...infoProps}>here</Link> for more info.
        </p>
        <p {...signatureProps}>{signature}</p>
      </div>
    )
  }
}
