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
        <Landing
          charInterval={60}
          text="const a = 1\nconst b = 10\nconst c = a + b\n\nfunction a (hello) {\n  console.log(hello)\n}\n\na('ole')\n\nconst reg = /\w+/" />

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
