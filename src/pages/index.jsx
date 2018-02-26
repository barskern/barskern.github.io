import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'graphql'

import ProgrammingLanding from '../components/ProgrammingLanding'
import PostPreview from '../components/PostPreview'
import ProjectPreview from '../components/ProjectPreview'
import FadeInFromSide from '../hoc-components/FadeInFromSide'

import 'prismjs/components/prism-jsx.min' // Import jsx-language for prism
import { Divider } from 'semantic-ui-react'

class Homepage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showPostPreviews: false
    }

    setTimeout(this.setState.bind(this, { showPostPreviews: true }), 300) // Add delay to optimize performace
  }
  render () {
    const { data } = this.props
    const { showPostPreviews } = this.state

    const siteTitle = data.site.siteMetadata.title
    const { authorName, authorNickname } = data.site.siteMetadata.author
    const authorAvatarURL = data.pageAuthorAvatarData.avatar.newSize.src
    const postNodes = data.posts.edges
    const projectNodes = data.projects.edges

    return (
      <div>
        <Helmet title={siteTitle} />

        <ProgrammingLanding
          authorName={authorName}
          authorNickname={authorNickname}
          authorAvatarURL={authorAvatarURL} />

        <Divider hidden />

        {postNodes.map(({ node }, index) =>
          <FadeInFromSide
            key={node.fields.path}
            show={showPostPreviews}
            fadeFrom={index % 2 === 0 ? 'left' : 'right'}>
            <PostPreview
              {...node.frontmatter}
              {...node.fields}
              excerpt={node.excerpt} />
          </FadeInFromSide>
        )}

        <Divider hidden section />

        {projectNodes.map(({ node }, index) =>
          <FadeInFromSide
            key={node.link}
            show={showPostPreviews}
            fadeFrom={index % 2 === 0 ? 'left' : 'right'}>
            <ProjectPreview {...node} />
          </FadeInFromSide>
        )}
      </div>
    )
  }
}

Homepage.propTypes = {
  data: PropTypes.object
}

export default Homepage

export const pageQuery = graphql`
query IndexQuery {
  site {
    siteMetadata {
      title
      author {
        authorName: name
        authorNickname: nickname
      }
    }
  }
  pageAuthorAvatarData: file(sourceInstanceName: { eq: "images"}, name: { eq: "olemartinruud"}) {
    avatar: childImageSharp {
      newSize: resize (width: 256, height: 256){
        src
      }
    }
  }
  posts: allMarkdownRemark(limit: 4, sort: { fields: [fields___date], order: DESC }) {
    edges {
      node {
        excerpt
        fields {
          path
          date
        }
        frontmatter {
          title
          tags
        }
      }
    }
  }
  projects: allProjectsJson(limit: 4) {
    edges {
      node {
        title
        thumbnailURL
        link
        description
        tags
      }
    }
  }
}
`
