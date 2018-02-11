import React from 'react'
import PropTypes from 'prop-types'
import graphql from 'graphql'

import CustomFooter from './Footer'

import 'typeface-roboto'
import '../css/prism-okaidia.css'

import './style.css'
import 'semantic-ui-css/semantic.min.css'

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100vw',
  height: '100vh'
}

class Template extends React.Component {
  render () {
    const { children, data } = this.props
    const { pageAuthorAvatarData } = data
    const { pageAuthor } = data.site.siteMetadata

    return (
      <div style={style}>
        <div>{children()}</div>
        <CustomFooter
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
