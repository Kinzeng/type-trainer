import React from 'react'
import {Link} from 'react-router'

function determineStart (num) {
  if (num <= 10) {
    return 0
  } else {
    return num % 10
  }
}

export default class Stats extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.setState({
      num: parseInt(window.localStorage.getItem('num')),
      averageWPM: parseFloat(window.localStorage.getItem('averageWPM')),
      averageAcc: parseFloat(window.localStorage.getItem('averageAcc')),
      last10WPM: JSON.parse(window.localStorage.getItem('last10WPM')),
      last10Acc: JSON.parse(window.localStorage.getItem('last10Acc'))
    })
  }

  render () {
    if (!this.state.averageWPM) {
      return <div>You haven't typed any passages! Click <Link to='/'>here</Link> to type some.</div>
    }

    const list = []
    let wpmAve = 0
    let accAve = 0
    let count = 0
    for (let i = determineStart(this.state.num); count < this.state.last10WPM.length; i = (i + 1) % 10) {
      const wpm = this.state.last10WPM[i]
      const acc = this.state.last10Acc[i]

      wpmAve += wpm
      accAve += acc
      list.push(
        <tr key={i}>
          <td>{count + 1}.</td>
          <td>{wpm.toFixed(1)}</td>
          <td>{acc.toFixed(2)}%</td>
        </tr>
      )
      count++
    }

    wpmAve /= this.state.last10WPM.length
    accAve /= this.state.last10Acc.length
    const last10 = (
      <div>
        <table>
          <thead>
            <tr>
              <th />
              <th>WPM</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
        <div key='averages'>
          <br />
          Average last 10 WPM: {wpmAve.toFixed(1)}<br />
          Average last 10 accuracy: {accAve.toFixed(2)}%
        </div>
      </div>
    )

    return (
      <div>
        Average overall WPM: {this.state.averageWPM.toFixed(1)}<br />
        Average overall accuracy: {this.state.averageAcc.toFixed(2)}%<br />
        <br />
        {last10}
      </div>
    )
  }
}
