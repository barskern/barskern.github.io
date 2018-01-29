import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import { Layout } from 'antd'
import theme from '../theme.js'

import '../css/prism-okaidia.css'
import 'typeface-roboto'

import CustomHeader from './header'
import CustomSider from './sider'
import CustomFooter from './footer'

const { Content } = Layout

const RootLayout = styled(Layout)`
  height: 100vh;
  width: 100vw;
`

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
      <ThemeProvider theme={theme}>
        <RootLayout>
          <CustomSider
            siderCollapsed={siderCollapsed} />
          <Layout>
            <CustomHeader
              siderCollapsed={siderCollapsed}
              toggleSider={this.toggleSider.bind(this)} />
            <Content>{children()}</Content>
            <CustomFooter />
          </Layout>
        </RootLayout>
      </ThemeProvider>
    )
  }
}

Template.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object
}

export default Template
