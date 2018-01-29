import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

const { Sider } = Layout

const CustomSider = ({ siderCollapsed }) =>
  <Sider
    collapsed={siderCollapsed}
    collapsible
    collapsedWidth={0}
    trigger={null}>
  </Sider>

CustomSider.propTypes = {
  siderCollapsed: PropTypes.bool.isRequired
}

export default CustomSider
