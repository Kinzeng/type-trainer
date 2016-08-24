import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './redux/reducers'
import routes from './routes'

class Root extends React.Component {
  componentWillMount () {
    this.store = createStore(rootReducer, {})
  }

  render () {
    // pass down the redux stare through the Provider
    // allows connect to pass in needed parts of the store as props
    return (
      <Provider store={this.store}>
        {routes}
      </Provider>
    )
  }
}

render(<Root />, document.getElementById('app'))
