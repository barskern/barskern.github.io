import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Layout, Icon } from 'antd'

const { Header } = Layout

const Toggler = styled(Icon)`
position: absolute;
color: white;
font-size: 1.8em;
`

const CustomHeader = ({ siderCollapsed, toggleSider }) =>
  <Header>
    <Toggler
      type={siderCollapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={toggleSider}></Toggler>
  </Header>

CustomHeader.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
  toggleSider: PropTypes.func.isRequired
}

export default CustomHeader
