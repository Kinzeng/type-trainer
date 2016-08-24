import React from 'react'
import {background} from '../colors'

const appProps = {
  style: {
    boxSizing: 'border-box',
    minHeight: '100%',
    minWidth: '1000px',
    padding: '2.5% 50px',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: background(),
    overflow: 'hidden'
  }
}

// the main app component that is rendered on every page
// styles the background
export default class App extends React.Component {
  render () {
    return (
      <div {...appProps}>
        {this.props.children}
      </div>
    )
  }
}
