import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import CustomHeader from './Header'
import CustomFooter from './Footer'
import CustomSider from './Asider'

import 'typeface-roboto'
import '../css/prism-okaidia.css'

import './style.less'

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
      <Layout style={{
        width: '100vw',
        height: '100vh'
      }}>
        <CustomSider
          siderCollapsed={siderCollapsed}
        />
        <Layout style={{ overflowX: 'hidden' }}>
          <CustomHeader
            siderCollapsed={siderCollapsed}
            toggleSider={this.toggleSider.bind(this)} />
          <Content style={{ width: '100vw' }}>{children()}</Content>
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
