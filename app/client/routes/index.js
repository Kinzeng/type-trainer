import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import App from '../containers/App'

import Main from '../views/Main'
import Stats from '../views/Stats'

export default (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Main} />
      <Route path='/stats' component={Stats} />
    </Route>
  </Router>
)
