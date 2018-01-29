import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'antd'

const Toggler = styled.div`
  height: 1.8em;
  display: flex;
`

const StyledIcon = styled(Icon)`
  display: block;
  color: ${({theme}) => theme.colors.accent[2]};
  font-size: 1.8em;
`

const MenuToggler = ({ siderCollapsed, toggleSider }) =>
  <Toggler onClick={toggleSider}>
    <StyledIcon type='left'/>
    { !siderCollapsed && <StyledIcon type='close'/> }
    <StyledIcon type='right'/>
  </Toggler>

MenuToggler.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
  toggleSider: PropTypes.func.isRequired
}

export default MenuToggler
