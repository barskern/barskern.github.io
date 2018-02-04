import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

const { Sider } = Layout

const style = {
  position: 'absolute',
  height: '100vh',
  zIndex: 5
}

const CustomSider = ({ siderCollapsed }) =>
  <Sider
    style={style}
    collapsed={siderCollapsed}
    collapsible={true}
    collapsedWidth={0}
    trigger={null}
  />

CustomSider.propTypes = {
  siderCollapsed: PropTypes.bool
}

export default CustomSider
