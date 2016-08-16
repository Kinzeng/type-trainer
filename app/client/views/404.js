import React from 'react'
import {Link} from 'react-router'
import {blue, gray} from '../colors'

const notFoundProps = {
  style: {
    width: '50%',
    fontSize: '2.5em',
    color: gray(0.7)
  }
}

const linkProps = {
  to: '/',
  style: {
    textDecoration: 'none',
    color: blue()
  }
}

export default (props) => {
  return (
    <div {...notFoundProps}>
      <p>
        Oops! Seems like there's nothing here.
        Click <Link {...linkProps}>here</Link> to go to the&nbsp;homepage.
      </p>
    </div>
  )
}
