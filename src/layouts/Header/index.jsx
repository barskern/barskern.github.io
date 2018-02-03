import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import Link from 'gatsby-link'

import MenuToggler from '../../components/MenuToggler'

const { Header } = Layout

const CustomHeader = ({ siderCollapsed, toggleSider }) =>
  <Header>
    <MenuToggler
      siderCollapsed={siderCollapsed}
      toggleSider={toggleSider} />
    <Link to='/'>
      <h1>barskern</h1>
    </Link>
  </Header>

CustomHeader.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired,
  toggleSider: PropTypes.func.isRequired
}

export default CustomHeader
