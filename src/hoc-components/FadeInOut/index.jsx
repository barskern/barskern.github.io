import React from 'react'
import PropTypes from 'prop-types'

import { Transition } from 'react-transition-group'

const styleTransition = {
  'entering': { 'opacity': 1 },
  'entered': { 'opacity': 1 },
  'exited': { 'opacity': 0 },
  'exiting': { 'opacity': 0 }
}

const FadeInOut = ({ show, duration, easing, children }) =>
  <Transition in={!!show} timeout={duration}>
    {state =>
      <div style={{
        transition: `opacity ${duration}ms ${easing}`,
        ...styleTransition[state]
      }}>
        {children}
      </div>
    }
  </Transition>

FadeInOut.propTypes = {
  show: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  easing: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.element), PropTypes.element ])
}

FadeInOut.defaultProps = {
  duration: 200,
  easing: 'ease-in-out'
}

export default FadeInOut
