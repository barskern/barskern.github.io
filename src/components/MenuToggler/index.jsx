import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

const style = {
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'color 100ms ease-in-out',
  margin: '0 10px'
}

const styleHovered = {
  color: '#eee'
}

const styleIcon = {
  fontSize: '2.5em',
  verticalAlign: 'middle'
}

class MenuToggler extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isHovered: false
    }
  }
  handleMouseEnter () {
    this.setState((prev) => ({...prev, isHovered: true}))
  }

  handleMouseLeave () {
    this.setState((prev) => ({...prev, isHovered: false}))
  }

  render () {
    const { isMenuClosed, onClick } = this.props
    const { isHovered } = this.state

    const currentStyle = Object.assign({}, style, isHovered && styleHovered)

    return (
      <div
        style={currentStyle}
        onClick={onClick}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}>
        <Icon style={styleIcon} type='left'/>
        { !isMenuClosed && <Icon style={styleIcon} type='close'/> }
        <Icon style={styleIcon} type='right'/>
      </div>
    )
  }
}

MenuToggler.propTypes = {
  isMenuClosed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MenuToggler
