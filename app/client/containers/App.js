import React from 'react'
import {Link} from 'react-router'

const appProps = {
  style: {
    height: '100%', // Firefox
    minHeight: '100%', // Safari
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between', // header and footer at the extremes
    alignItems: 'stretch',
    backgroundColor: 'rgba(255, 255, 255, 0)', // placeholder
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
