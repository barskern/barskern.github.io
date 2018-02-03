import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.less'

const Logo = (props) => {
  const altProps = {...props, className: `${props.className} ${styles['logo']}`}
  return (<div {...altProps}>barskern</div>)
}

Logo.propTypes = {
  className: PropTypes.string
}

export default Logo
