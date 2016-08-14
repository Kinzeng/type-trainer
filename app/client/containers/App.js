import React from 'react'
import {background} from '../colors'

const appProps = {
  style: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: background(),
    fontFamily: 'sans-serif'
  }
}

export default class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div {...appProps}>
        {this.props.children}
      </div>
    )
  }
}
