import React from 'react'
import {randomInt} from '../../../utils'
import {tips} from '../../../constants/typer'

const tipProps = {
  style: {
    margin: '0 0 10px',
    fontSize: '0.75em'
  }
}

export default class Tips extends React.Component {
  componentWillMount () {
    // pick a random tip from the arry of tips in constants
    this.tip = tips[randomInt(0, tips.length)]
  }

  render () {
    return <div {...tipProps}>Tip: {this.tip}</div>
  }
}
