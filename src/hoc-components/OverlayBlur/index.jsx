import React from 'react'
import PropTypes from 'prop-types'

import { Transition } from 'react-transition-group'

const OverlayBlur = ({ show, duration, easing, children, blurAmount }) => {
  const styleTransition = {
    'entering': { 'filter': `blur(${blurAmount}px)` },
    'entered': { 'filter': `blur(${blurAmount}px)` },
    'exited': { 'filter': `blur(0.3px)` }, // Weird bug makes starting at 0 cause a jump, hence start at 0.3px
    'exiting': { 'filter': `blur(0.3px)` }
  }
  return (
    <Transition in={!!show} timeout={duration}>
      {state =>
        <div style={{
          transition: `filter ${duration}ms ${easing}`,
          width: '100%',
          height: '100%',
          ...styleTransition[state]
        }}>
          {children}
        </div>
      }
    </Transition>
  )
}

OverlayBlur.propTypes = {
  show: PropTypes.bool.isRequired,
  blurAmount: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.element), PropTypes.element ])
}

OverlayBlur.defaultProps = {
  blurAmount: 2,
  duration: 200,
  easing: 'ease-in-out'
}

export default OverlayBlur
