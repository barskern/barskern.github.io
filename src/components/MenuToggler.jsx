import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'antd'

const Toggler = styled.div`
  height: 1.8em;
  display: flex;
  cursor: pointer;
`

const MenuToggler = ({ siderCollapsed, toggleSider }) =>
  <Toggler onClick={toggleSider}>
    <Icon type='left'/>
    { !siderCollapsed && <Icon type='close'/> }
    <Icon type='right'/>
  </Toggler>

MenuToggler.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
  toggleSider: PropTypes.func.isRequired
}

export default MenuToggler
