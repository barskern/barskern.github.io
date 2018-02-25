import React from 'react'
import PropTypes from 'prop-types'

import { Transition } from 'react-transition-group'

const FadeInFromSide = ({ show, duration, easing, children, fadeFrom, offset }) => {
  const styleTransition = {
    'entering': { 'opacity': 1 },
    'entered': { 'opacity': 1 },
    'exiting': { 'opacity': 0 },
    'exited': { 'opacity': 0 }
  }
  styleTransition['entering'][`${fadeFrom}`] = '0px'
  styleTransition['entered'][`${fadeFrom}`] = '0px'
  styleTransition['exiting'][`${fadeFrom}`] = `-${offset}px`
  styleTransition['exited'][`${fadeFrom}`] = `-${offset}px`

  return (
    <Transition in={!!show} timeout={duration} appear>
      {state =>
        <div style={{
          position: 'relative',
          transition: `${fadeFrom} ${duration}ms ${easing}, opacity ${duration / 2}ms ${easing}`,
          ...styleTransition[state]
        }}>
          {children}
        </div>
      }
    </Transition>
  )
}

FadeInFromSide.propTypes = {
  show: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  easing: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.element), PropTypes.element ]),
  fadeFrom: PropTypes.oneOf([ 'left', 'right', 'top', 'bottom' ]),
  offset: PropTypes.number
}

FadeInFromSide.defaultProps = {
  duration: 200,
  easing: 'ease-in-out',
  fadeFrom: 'left',
  offset: 300
}

export default FadeInFromSide
