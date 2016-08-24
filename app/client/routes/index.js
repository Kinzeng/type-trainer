import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import App from '../containers/App'

import Main from '../views/Main'
import Stats from '../views/Stats'
import NotFound from '../views/404'

// returns the react-router routes to display the views client side
export default (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Main} />
      <Route path='/stats' component={Stats} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
)
