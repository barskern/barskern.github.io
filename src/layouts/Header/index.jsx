import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { navigateTo } from 'gatsby-link'

import MenuToggler from '../../components/MenuToggler'
import Logo from '../../components/Logo'

const { Header } = Layout

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 6
}

const CustomHeader = ({ siderCollapsed, toggleSider }) =>
  <Header
    style={style}>
    <MenuToggler
      isMenuClosed={siderCollapsed}
      onClick={toggleSider} />
    <Logo
      onClick={() => navigateTo('/')} />
  </Header>

CustomHeader.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
  toggleSider: PropTypes.func.isRequired
}

export default CustomHeader
