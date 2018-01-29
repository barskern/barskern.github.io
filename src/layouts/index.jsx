import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'
import { Layout, Icon } from 'antd'
import theme from '../theme.js'

import '../css/prism-okaidia.css'
import 'typeface-roboto'

const { Header, Content, Footer, Sider } = Layout

const Toggler = styled(Icon)`
  color: white;
  font-size: 1.8em;
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
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Sider
            collapsed={this.state.siderCollapsed}
            collapsible
            collapsedWidth={0}
            trigger={null}></Sider>
          <Layout>
            <Header>
              <Toggler
                type={this.state.siderCollapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggleSider.bind(this)}></Toggler>
            </Header>
            <Content>{children()}</Content>
            <Footer></Footer>
          </Layout>
        </Layout>
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
