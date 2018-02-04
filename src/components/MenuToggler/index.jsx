import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

import styles from './style.less'

const MenuToggler = (props) => {
  const altProps = {...props, className: `${props.className} ${styles['menu-toggler']}`}
  const { isMenuClosed, onClick, className } = altProps

  return (
    <div className={className} onClick={onClick}>
      <Icon className={styles['menu-toggler--icon']} type='left'/>
      { !isMenuClosed && <Icon className={styles['menu-toggler--icon']} type='close'/> }
      <Icon className={styles['menu-toggler--icon']} type='right'/>
    </div>
  )
}

MenuToggler.propTypes = {
  isMenuClosed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default MenuToggler
