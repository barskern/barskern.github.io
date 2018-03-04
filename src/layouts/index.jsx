import React from 'react'
import PropTypes from 'prop-types'
import graphql from 'graphql'

import '../css/prism-solarized.css'
import '../../semantic/dist/semantic.min.css'

import styles from './styles.sass'

import Footer from './Footer'

class Template extends React.Component {
  render () {
    const { children, data } = this.props
    const { pageAuthorAvatarData } = data
    const { pageAuthor } = data.site.siteMetadata

    return (
      <div className={styles.template}>
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
        ...FooterAuthorInfo
      }
    }
  }
  pageAuthorAvatarData: file(sourceInstanceName: { eq: "images"}, name: { eq: "olemartinruud"}) {
    ...FooterAuthorAvatarData
  }
}
`
