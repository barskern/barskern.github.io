import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Layout } from 'antd'
import { navigateTo } from 'gatsby-link'

import MenuToggler from '../components/MenuToggler'

const { Header } = Layout

const PageTitle = styled.h1`
  color: ${({theme}) => theme['text-color']};
  font-family: ${({theme}) => theme.custom.font.logo};
  white-space: nowrap;
  font-size: 2em;
  margin: 0;
  margin-left: 2em;
  cursor: pointer;
`

const CustomHeader = ({ siderCollapsed, toggleSider }) =>
  <Header>
    <MenuToggler
      siderCollapsed={siderCollapsed}
      toggleSider={toggleSider} />
    <PageTitle onClick={() => navigateTo('/')} >barskern</PageTitle>
  </Header>

CustomHeader.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
  toggleSider: PropTypes.func.isRequired
}

export default CustomHeader
