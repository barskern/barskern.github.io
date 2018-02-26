import React from 'react'
import PropTypes from 'prop-types'
import graphql from 'graphql'

import Footer from './Footer'

import 'typeface-roboto'

import '../css/prism-solarized.css'
import 'semantic-ui-css/semantic.min.css'
import './style.css'

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '100vh',
  overflow: 'hidden'
}

class Template extends React.Component {
  render () {
    const { children, data } = this.props
    const { pageAuthorAvatarData } = data
    const { pageAuthor } = data.site.siteMetadata

    return (
      <div style={style}>
        <div>{children()}</div>
        <Footer
          authorInfo={pageAuthor}
          authorAvatarData={pageAuthorAvatarData} />
      </div>
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
