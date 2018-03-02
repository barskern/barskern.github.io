import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'

import styles from './styles.sass'

import { Transition } from 'react-transition-group'

class SkewedHoverLink extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isHovered: false
    }
  }

  handleMouseEnter (e) {
    this.setState({ isHovered: true })
  }

  handleMouseLeave (e) {
    this.setState({ isHovered: false })
  }

  render () {
    const { skewAmount, side, to, children, show } = this.props
    const { isHovered } = this.state

    const mult = side === 'left' ? 1 : -1

    const transform = `skewX(${skewAmount * mult}deg)`

    const exitOffset = show ? 100 : 120
    const enterOffset = 95

    const transitionStyle = {
      'entering': { transform: `${transform} translateX(${enterOffset * -mult}%)` },
      'entered': { transform: `${transform} translateX(${enterOffset * -mult}%)` },
      'exiting': { transform: `${transform} translateX(${exitOffset * -mult}%)` },
      'exited': { transform: `${transform} translateX(${exitOffset * -mult}%)` }
    }

    const transformChild = {
      ...(
        side === 'left'
          ? { top: '40px', right: '-10px' }
          : { top: '40px', left: '-10px' }
      ),
      transform: `skewX(${skewAmount * -mult}deg) rotateZ(${2 * skewAmount * mult}deg)`
    }

    return (
      <Transition in={!!isHovered} timeout={100} appear>
        {state =>
          <div
            className={styles.link}
            style={{transform, ...transitionStyle[state]}}
            onClick={() => navigateTo(to)}
            onMouseEnter={this.handleMouseEnter.bind(this)}
            onMouseLeave={this.handleMouseLeave.bind(this)}>
            <span className={styles['link-text']} style={transformChild}>{children}</span>
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
