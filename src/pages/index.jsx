import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import PostPreview from './../components/PostPreview'
import { graphql } from 'graphql'

class BlogIndex extends React.Component {
  render () {
    const { data } = this.props

    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <div>
        <Helmet title={siteTitle} />
        {posts.map(({ node: post }) => {
          const postProps = {
            ...post.frontmatter,
            ...post.fields,
            ...post
          }

          return (<PostPreview key={ postProps.path } {...postProps} />)
        })}
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
    allMarkdownRemark {
      edges {
        node {
          excerpt
          fields {
            path
            date
          }
          frontmatter {
            title
            author
          }
        }
      }
    }
  }
`
