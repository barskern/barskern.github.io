import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import graphql from 'graphql'

import CustomHeader from './Header'
import CustomFooter from './Footer'
import CustomSider from './Asider'

import 'typeface-roboto'
import '../css/prism-okaidia.css'

import './style.less'

const { Content } = Layout

const style = {
  width: '100vw',
  height: '100vh'
}

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
    const { pageAuthorAvatarData } = data
    const { pageAuthor } = data.site.siteMetadata

    return (
      <Layout style={style}>
        <CustomHeader
          siderCollapsed={siderCollapsed}
          toggleSider={this.toggleSider.bind(this)} />
        <Layout>
          <Layout>
            <Content>{children()}</Content>
            <CustomFooter
              authorInfo={pageAuthor}
              authorAvatarData={pageAuthorAvatarData} />
          </Layout>
          <CustomSider
            siderCollapsed={siderCollapsed} />
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
  site {
    siteMetadata {
      pageAuthor: author {
        ...authorInfo
      }
    }
  }
  pageAuthorAvatarData: file(sourceInstanceName: { eq: "images"}, name: { eq: "olemartinruud"}) {
    ...authorAvatarData
  }
}
`
