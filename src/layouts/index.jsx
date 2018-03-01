import React from 'react'
import PropTypes from 'prop-types'
import graphql from 'graphql'

import '../css/prism-solarized.css'
import '../css/semantic-ui-yeti.min.css'
import style from './style.sass'

import Footer from './Footer'

class Template extends React.Component {
  render () {
    const { children, data } = this.props
    const { pageAuthorAvatarData } = data
    const { pageAuthor } = data.site.siteMetadata

    return (
      <div className={style.template}>
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
