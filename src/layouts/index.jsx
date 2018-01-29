import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import { Layout } from 'antd'
import theme from '../theme.js'

import '../css/prism-okaidia.css'

import CustomHeader from './Header'
import CustomSider from './Sider'
import CustomFooter from './Footer'

import 'typeface-roboto'
import BeynoFontOFT from '../fonts/BEYNO.otf'

injectGlobal`
  @font-face {
    font-family: Beyno;
    src: url('${BeynoFontOFT}') format('opentype');
  }
`

const { Content } = Layout

const RootLayout = styled(Layout)`
  height: 100vh;
  width: 100vw;
`

const MainLayout = styled(Layout)`
  box-shadow: 0px 0px 25px rgba(0,0,0,.4);
  z-index: 10;
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
          <MainLayout>
            <CustomHeader
              siderCollapsed={siderCollapsed}
              toggleSider={this.toggleSider.bind(this)} />
            <Content>{children()}</Content>
            <CustomFooter />
          </MainLayout>
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
