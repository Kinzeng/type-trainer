import React from 'react'
import {Link} from 'react-router'
import BoxShadow from '../containers/BoxShadow'
import {orange} from '../colors'

const boxProps = {
  containerStyle: {
    marginTop: '40px'
  }
}

const linkProps = {
  to: '/',
  style: {
    color: orange()
  }
}

const tableProps = {
  style: {
    width: '100%'
  }
}

const tdProps = {
  style: {
    textAlign: 'center'
  }
}

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
    this.setState({stats: JSON.parse(window.localStorage.getItem('stats'))})
  }

  clearStats () {
    window.localStorage.removeItem('stats')
    this.setState({stats: null})
  }

  render () {
    if (!this.state.stats) {
      return (
        <BoxShadow {...boxProps}>
          You don't have any saved stats! Click <Link {...linkProps}>here</Link> to type a passage.
        </BoxShadow>
      )
    }

    const {num, averageWPM, averageAcc, last10WPM, last10Acc} = this.state.stats

    const list = []
    let wpmAve = 0
    let accAve = 0
    let count = 0
    for (let i = determineStart(num); count < last10WPM.length; i = (i + 1) % 10) {
      const wpm = last10WPM[i]
      const acc = last10Acc[i]

      wpmAve += wpm
      accAve += acc
      list.push(
        <tr key={i}>
          <td>{count + 1}.</td>
          <td {...tdProps}>{wpm.toFixed(1)}</td>
          <td {...tdProps}>{acc.toFixed(2)}%</td>
        </tr>
      )
      count++
    }

    wpmAve /= last10WPM.length
    accAve /= last10Acc.length
    const last10 = (
      <div>
        <table {...tableProps}>
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
      <BoxShadow {...boxProps}>
        Average overall WPM: {averageWPM.toFixed(1)}<br />
        Average overall accuracy: {averageAcc.toFixed(2)}%<br />
        <br />
        {last10}
        <br />
        <button onClick={this.clearStats.bind(this)}>Clear Stats</button>
      </BoxShadow>
    )
  }
}
