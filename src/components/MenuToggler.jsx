import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

const MenuToggler = ({ siderCollapsed, toggleSider }) =>
  <div onClick={toggleSider}>
    <Icon type='left'/>
    { !siderCollapsed && <Icon type='close'/> }
    <Icon type='right'/>
  </div>

MenuToggler.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
  toggleSider: PropTypes.func.isRequired
}

export default MenuToggler
