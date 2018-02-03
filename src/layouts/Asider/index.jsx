import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

const { Sider } = Layout

const CustomSider = ({ siderCollapsed }) =>
  <Sider
    collapsed={siderCollapsed}
    collapsible={true}
    collapsedWidth={0}
    trigger={null}
  />

CustomSider.propTypes = {
  siderCollapsed: PropTypes.bool
}

export default CustomSider
