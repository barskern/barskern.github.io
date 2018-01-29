import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Layout } from 'antd'

const { Sider } = Layout

const StyledSider = styled(Sider)`
  background-color: ${({theme}) => theme.colors.secondary};
`

const CustomSider = ({ siderCollapsed }) =>
  <StyledSider
    collapsed={siderCollapsed}
    collapsible
    collapsedWidth={0}
    trigger={null}>
  </StyledSider>

CustomSider.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired
}

export default CustomSider
