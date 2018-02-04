import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Divider } from 'antd'
import graphql from 'graphql'

import CustomHeader from './Header'
import CustomFooter from './Footer'
import CustomSider from './Asider'

import 'typeface-roboto'
import '../css/prism-okaidia.css'

import './style.less'

const { Content } = Layout

class Template extends React.Component {
  constructor (props) {
    super(props)
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
    const { children, data } = this.props
    const { siderCollapsed } = this.state
    const { pageAuthor, pageAuthorAvatar } = data

    return (
      <Layout style={{
        width: '100vw',
        height: '100vh'
      }}>
        <CustomSider
          siderCollapsed={siderCollapsed}
        />
        <Layout style={{ width: '100vw' }}>
          <CustomHeader
            siderCollapsed={siderCollapsed}
            toggleSider={this.toggleSider.bind(this)} />
          <Content>{children()}</Content>
          <Divider />
          <CustomFooter
            authorInfo={pageAuthor}
            authorAvatar={pageAuthorAvatar} />
        </Layout>
      </Layout>
    )
  }
}

Template.propTypes = {
  children: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object,
  data: PropTypes.object
}

export default Template

export const query = graphql`
query TemplateData {
  pageAuthor: authorsJson(name: { eq: "Ole Martin Ruud"}) {
    ...authorInfo
  }
  pageAuthorAvatar: file(sourceInstanceName: { eq: "images"}, name: { eq: "olemartinruud"}) {
    ...authorAvatar
  }
}
`
