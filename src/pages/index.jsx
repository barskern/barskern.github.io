import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'graphql'

import ProgrammingLanding from '../components/ProgrammingLanding'
import PostPreview from '../components/PostPreview'
import FadeInFromSide from '../hoc-components/FadeInFromSide'

import 'prismjs/components/prism-jsx.min' // Import jsx-language for prism

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
    const { name: authorName, nickname: authorNickname } = data.site.siteMetadata.author
    const authorAvatarURL = data.pageAuthorAvatarData.avatar.newSize.src
    const markdownNodes = data.posts.edges

    return (
      <div>
        <Helmet title={siteTitle} />

        <ProgrammingLanding
          authorName={authorName}
          authorNickname={authorNickname}
          authorAvatarURL={authorAvatarURL} />
        {markdownNodes.map(({ node }, index) =>
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
        name
        nickname
      }
    }
  }
  pageAuthorAvatarData: file(sourceInstanceName: { eq: "images"}, name: { eq: "olemartinruud"}) {
    avatar: childImageSharp {
      newSize: resize (width: 128, height: 128){
        src
      }
    }
  }
  posts: allMarkdownRemark(limit: 5, sort: { fields: [fields___date], order: DESC }) {
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
}
`
