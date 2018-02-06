import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'graphql'

import Landing from '../components/Landing'
import PostPreview from '../components/PostPreview'

class BlogIndex extends React.Component {
  render () {
    const { data } = this.props

    const siteTitle = data.site.siteMetadata.title
    const markdownNodes = data.posts.edges

    return (
      <div>
        <Helmet title={siteTitle} />
        <Landing amountOfStars={10} />
        {markdownNodes.map(({ node }) =>
          <PostPreview
            key={ node.fields.path }
            {...node.frontmatter}
            {...node.fields}
            excerpt={node.excerpt} />
        )}
      </div>
    )
  }
}

BlogIndex.propTypes = {
  data: PropTypes.object
}

export default BlogIndex

export const pageQuery = graphql`
query IndexQuery {
  site {
    siteMetadata {
      title
    }
  }
  posts: allMarkdownRemark(limit: 3, sort: { fields: [fields___date], order: DESC }) {
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
