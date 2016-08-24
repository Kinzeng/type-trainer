import React from 'react'
import {Link} from 'react-router'
import BoxShadow from '../containers/BoxShadow'
import {red, orange} from '../colors'

const boxProps = {
  containerStyle: {
    // marginTop: '40px'
  },
  contentStyle: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center'
  }
}

const linkProps = {
  to: '/',
  style: {
    textDecoration: 'none',
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

// determine the first passage stats at the top based on the number of passages typed
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
    this.state = {stats: null, confirmed: false}
  }

  componentWillMount () {
    this.setState({stats: JSON.parse(window.localStorage.getItem('stats'))})
  }

  clearStats () {
    if (!this.state.confirmed) {
      // don't clear the stats unless the user clicks the button twice
      this.setState({confirmed: true})
    } else {
      // clear stats in localStorage and the state
      window.localStorage.removeItem('stats')
      this.setState({stats: null, confirmed: false})
    }
  }

  render () {
    if (!this.state.stats) {
      return (
        <BoxShadow containerStyle={boxProps.containerStyle}>
          You don't have any saved stats! Click <Link {...linkProps}>here</Link> to type a passage.
        </BoxShadow>
      )
    }

    const clearStatsProps = {
      onClick: this.clearStats.bind(this),
      style: {
        color: red(),
        cursor: 'pointer'
      }
    }

    const {num, averageWPM, averageAcc, personalRecord, last10WPM, last10Acc} = this.state.stats

    const list = []
    let wpmAve = 0
    let accAve = 0
    let count = 0
    // display the last ten passages in order of oldest to newest
    // the last10 arrays are rotating arrays
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
        <br />
        <table {...tableProps}>
          <tbody>
            <tr><td>Average speed:</td><td>{wpmAve.toFixed(1)} WPM</td></tr>
            <tr><td>Average accuracy:</td><td>{accAve.toFixed(2)}%</td></tr>
          </tbody>
        </table>
      </div>
    )

    return (
      <BoxShadow {...boxProps}>
        <Link {...linkProps}>Type another passage</Link>
        <br />
        <span style={{fontWeight: 'bold'}}>Overall Stats</span>
        <br />
        <table {...tableProps}>
          <tbody>
            <tr><td>Average speed:</td><td>{averageWPM.toFixed(1)} WPM</td></tr>
            <tr><td>Average accuracy:</td><td>{averageAcc.toFixed(2)}%</td></tr>
            <tr><td>Personal record:</td><td>{personalRecord.toFixed(1)} WPM</td></tr>
          </tbody>
        </table>
        <br />
        <span style={{fontWeight: 'bold'}}>Last ten passages</span>
        <br />
        {last10}
        <br /><br />
        <span {...clearStatsProps}>{this.state.confirmed ? 'Are you sure?' : 'Clear Stats'}</span>
      </BoxShadow>
    )
  }
}
