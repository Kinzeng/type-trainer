import React from 'react'

const defaultContainerProps = {
  tabIndex: 1
}

// focuses the container when the component mounts
// main use is to allow the container to listen for key input,
// but it can be used for any function that requires focus
export default class KeyListener extends React.Component {
  componentDidMount () {
    this.container.focus()
  }

  render () {
    const containerProps = {...defaultContainerProps, ...this.props}
    containerProps.ref = (ref) => { this.container = ref }

    return (
      <div {...containerProps}>
        {this.props.children}
      </div>
    )
  }
}
