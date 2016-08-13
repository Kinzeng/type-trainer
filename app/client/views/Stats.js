import React from 'react'
import {Link} from 'react-router'

export default class Stats extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.setState({
      averageWPM: parseFloat(window.localStorage.getItem('averageWPM')),
      averageAcc: parseFloat(window.localStorage.getItem('averageAcc'))
    })
  }

  render () {
    if (!this.state.averageWPM) {
      return <div>You haven't typed any passages! Click <Link to='/'>here</Link> to type some.</div>
    }

    return (
      <div>
        Average overall WPM: {this.state.averageWPM.toFixed(1)}<br />
        Average overall accuracy: {this.state.averageAcc.toFixed(2)}%
      </div>
    )
  }
}
