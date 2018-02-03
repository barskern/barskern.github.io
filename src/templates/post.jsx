import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'graphql'
import Link from 'gatsby-link'

const BlogPost = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  const { post } = data

  const { title, author } = post.frontmatter
  const { path, date } = post.fields
  const tabTitle = title || siteTitle

  return (
    <div>
      <Helmet title={tabTitle} />
      <Link to={path}>
        <h1>{title}</h1>
      </Link>
      <small>
        {date} {author}
      </small>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

BlogPost.propTypes = {
  data: PropTypes.object
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByPath($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    post: markdownRemark(id: { eq: $id }) {
      html
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
`
