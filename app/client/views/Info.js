import React from 'react'
import {Link} from 'react-router'
import BoxShadow from '../containers/BoxShadow'
import {blue, green} from '../colors'

const infoProps = {
  containerStyle: {
    alignSelf: 'center',
    width: '50%',
    minWidth: '500px',
    maxWidth: '800px'
  },
  contentStyle: {}
}

const textProps = {
  style: {
    lineHeight: '1.75em',
    marginTop: '0px',
    marginBottom: '20px'
  }
}

const backProps = {
  to: '/',
  style: {
    textDecoration: 'none',
    color: blue()
  }
}

const dvorakProps = {
  to: 'https://en.wikipedia.org/wiki/Dvorak_Simplified_Keyboard',
  target: '_blank',
  style: {
    textDecoration: 'none',
    color: blue()
  }
}

const typeracerProps = {
  to: 'http://play.typeracer.com/',
  target: '_blank',
  style: {
    textDecoration: 'none',
    color: blue()
  }
}

const reactProps = {
  to: 'https://facebook.github.io/react/',
  target: '_blank',
  style: {
    textDecoration: 'none',
    color: blue()
  }
}

const reduxProps = {
  to: 'http://redux.js.org/',
  target: '_blank',
  style: {
    textDecoration: 'none',
    color: blue()
  }
}

const githubProps = {
  to: 'https://github.com/Kinzeng/type-trainer',
  target: '_blank',
  style: {
    textDecoration: 'none',
    color: blue()
  }
}

const emailProps = {
  href: 'mailto:zhang4444@gmail.com',
  style: {
    textDecoration: 'none',
    color: green()
  }
}

export default class Info extends React.Component {
  render () {
    return (
      <BoxShadow {...infoProps}>
        <Link {...backProps}>Back to home page</Link>
        {/**
        <h1>Type Trainer Help</h1>
        <p {...textProps}>

        </p>
        **/}
        <h1>About Me</h1>
        <p {...textProps}>
          I'm just a college student studying computer science at New York University,
          and I recently switched to the <Link {...dvorakProps}>Dvorak keyboard layout</Link> so
          I found myself spending a lot of time on <Link {...typeracerProps}>typeracer.com</Link>.
          I figured it would be a fun project to make an app that mimicked typeracer using my
          knowledge of <Link {...reactProps}>React</Link> and <Link {...reduxProps}>Redux</Link>,
          especially since I get to fit the app to my own aesthetic tastes (I think typeracer's
          design and colors leave a lot to be desired). If you're interested in the source code
          for this project, it is available on my <Link {...githubProps}>github</Link>. If you have
          any questions or comments, feel free to email me at <a {...emailProps}>zhang4444@gmail.com</a> and
          I'll get back to you as soon as I can!
        </p>
      </BoxShadow>
    )
  }
}
