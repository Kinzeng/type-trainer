import React from 'react'

const appProps = {
  style: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
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
