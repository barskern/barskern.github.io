import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import CustomHeader from './Header'
import CustomSider from './Sider'
import CustomFooter from './Footer'

import 'typeface-roboto'
import '../css/prism-okaidia.css'

const { Content } = Layout

class Template extends React.Component {
  constructor () {
    super()
    this.state = {
      siderCollapsed: true
    }
  }
  toggleSider () {
    this.setState((prevState, props) => {
      return { siderCollapsed: !prevState.siderCollapsed }
    })
  }

  render () {
    const { children } = this.props
    const { siderCollapsed } = this.state

    return (
      <Layout>
        <CustomSider
          siderCollapsed={siderCollapsed} />
        <Layout>
          <CustomHeader
            siderCollapsed={siderCollapsed}
            toggleSider={this.toggleSider.bind(this)} />
          <Content>{children()}</Content>
          <CustomFooter />
        </Layout>
      </Layout>
    )
  }
}

Template.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object
}

export default Template
