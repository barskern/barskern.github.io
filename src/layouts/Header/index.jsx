import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { navigateTo } from 'gatsby-link'

import MenuToggler from '../../components/MenuToggler'
import Logo from '../../components/Logo'

const { Header } = Layout

const CustomHeader = ({ siderCollapsed, toggleSider }) =>
  <Header
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
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
