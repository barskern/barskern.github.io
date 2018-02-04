import React from 'react'
import PropTypes from 'prop-types'

const style = {
  display: 'block',
  fontFamily: '"Beyno", "monospace"',
  fontSize: '36px',
  cursor: 'pointer',
  paddingTop: '9px'
}

const Logo = (props) =>
  <div {...props} style={style}>
    barskern
  </div>

Logo.propTypes = {
  onClick: PropTypes.func
}

export default Logo
