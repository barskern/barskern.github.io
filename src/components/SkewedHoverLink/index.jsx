import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'

import { Transition } from 'react-transition-group'

const style = {
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: '#4f4f45',
  cursor: 'pointer'
}

const styleChild = {
  position: 'absolute',
  color: '#fff'
}

class SkewedHoverLink extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isExpanded: false
    }
  }

  handleMouseEnter (e) {
    this.setState({ isExpanded: true })
  }

  handleMouseLeave (e) {
    this.setState({ isExpanded: false })
  }

  render () {
    const { skewAmount, side, to, children, show } = this.props
    const { isExpanded } = this.state

    const baseTransform = `skewX(${skewAmount}deg)`
    const fullStyle = {
      ...style,
      transform: `${baseTransform}`,
      transition: 'transform 200ms ease-in-out'
    }

    const exitOffset = show ? 100 : 120
    const enterOffset = 95

    const transitionStyle = {
      'entering': { transform: `${baseTransform} translateX(${enterOffset * (side === 'left' ? -1 : 1)}%)` },
      'entered': { transform: `${baseTransform} translateX(${enterOffset * (side === 'left' ? -1 : 1)}%)` },
      'exiting': { transform: `${baseTransform} translateX(${exitOffset * (side === 'left' ? -1 : 1)}%)` },
      'exited': { transform: `${baseTransform} translateX(${exitOffset * (side === 'left' ? -1 : 1)}%)` }
    }

    const fullStyleChild = {
      ...styleChild,
      ...(
        side === 'left'
          ? { top: '40px', right: '-10px' }
          : { bottom: '26px', left: '-10px' }
      ),
      fontSize: '16px',
      transform: `skewX(${-skewAmount}deg) rotateZ(${2 * skewAmount}deg)`
    }

    return (
      <Transition in={!!isExpanded} timeout={100} apper>
        {state =>
          <div style={{...fullStyle, ...transitionStyle[state]}}
            onClick={() => navigateTo(to)}
            onMouseEnter={this.handleMouseEnter.bind(this)}
            onMouseLeave={this.handleMouseLeave.bind(this)}>
            <span style={fullStyleChild}>{children}</span>
          </div>
        }
      </Transition>
    )
  }
}

SkewedHoverLink.defaultProps = {
  skewAmount: -30,
  side: 'left',
  children: '',
  show: false
}

SkewedHoverLink.propTypes = {
  show: PropTypes.bool,
  skewAmount: PropTypes.number,
  side: PropTypes.oneOf([ 'left', 'right' ]),
  to: PropTypes.string.isRequired,
  children: PropTypes.string
}

export default SkewedHoverLink
