import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Layout } from 'antd'
import { navigateTo } from 'gatsby-link'

import MenuToggler from '../components/MenuToggler'

const { Header } = Layout

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.8em;
  background-color: ${({theme}) => theme.colors.secondary};
  box-shadow: 0px 0px 25px rgba(0,0,0,.4);
  z-index: 100;
`

const PageTitle = styled.h1`
  color: ${({theme}) => theme.colors.accent[0]};
  font-family: ${({theme}) => theme.font.special};
  white-space: nowrap;
  font-size: 2em;
  margin: 0;
  margin-left: 2em;
`

const CustomHeader = ({ siderCollapsed, toggleSider }) =>
  <StyledHeader>
    <MenuToggler
      siderCollapsed={siderCollapsed}
      toggleSider={toggleSider} />
    <PageTitle onClick={() => navigateTo('/')} >barskern</PageTitle>
  </StyledHeader>

CustomHeader.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
  toggleSider: PropTypes.func.isRequired
}

export default CustomHeader
