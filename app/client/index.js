import React from 'react'
import {render} from 'react-dom'
import routes from './routes'

class Root extends React.Component {
  render () {
    return (
      routes
    )
  }
}

render(<Root />, document.getElementById('app'))
