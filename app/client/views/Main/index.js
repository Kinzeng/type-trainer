import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import BoxShadow from '../../containers/BoxShadow'
import Welcome from './components/Welcome'
import Timer from './components/Timer'
import Typer from './components/Typer'
import Results from './components/Results'
import {startCountdown, startTyping, finishTyping, setText} from '../../redux/actions/creators/typer'
import {INIT, DONE} from '../../constants/typer'

const mainProps = {
  containerStyle: {
    alignSelf: 'center',
    width: '50%',
    minWidth: '500px',
    maxWidth: '800px',
    marginTop: '-40px'
  },
  contentStyle: {}
}

const viewProps = {
  style: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {text: '', time: 0, chars: 0}
  }

  // don't update if only the time changed
  shouldComponentUpdate (nextProps, nextState) {
    if (this.props !== nextProps) {
      return true
    }

    const keys = Object.keys(nextState)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (key !== 'time' && this.state[key] !== nextState[key]) {
        return true
      }
    }

    return false
  }

  finishTyping (saveStats) {
    this.props.finishTyping(this.props.text, this.state.time, this.state.chars + 1, saveStats)
    this.setState({time: 0, chars: 0})
  }

  incrementTime () {
    this.setState({time: this.state.time + 1})
  }

  incrementChars () {
    this.setState({chars: this.state.chars + 1})
  }

  render () {
    const welcomeProps = {
      startCountdown: this.props.startCountdown
    }

    const timerProps = {
      stage: this.props.stage,
      startCountdown: this.props.startCountdown,
      startTyping: this.props.startTyping,
      finishTyping: this.finishTyping.bind(this),
      incrementTime: this.incrementTime.bind(this)
    }

    const typerProps = {
      stage: this.props.stage,
      text: this.props.text,
      finishTyping: this.finishTyping.bind(this),
      setText: this.props.setText,
      incrementChars: this.incrementChars.bind(this)
    }

    const statsProps = {
      wpm: this.props.wpm,
      accuracy: this.props.accuracy
    }

    let view
    if (this.props.stage === INIT) {
      view = <Welcome {...welcomeProps} />
    } else {
      view = (
        <div {...viewProps}>
          <Timer {...timerProps} />
          <Typer {...typerProps} />
          {this.props.stage === DONE &&
            <Results {...statsProps} />
          }
        </div>
      )
    }

    return (
      <BoxShadow {...mainProps}>
        {view}
      </BoxShadow>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stage: state.typer.stage,
    text: state.typer.text,
    wpm: state.typer.wpm,
    accuracy: state.typer.accuracy
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startCountdown: bindActionCreators(startCountdown, dispatch),
    startTyping: bindActionCreators(startTyping, dispatch),
    finishTyping: bindActionCreators(finishTyping, dispatch),
    setText: bindActionCreators(setText, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
