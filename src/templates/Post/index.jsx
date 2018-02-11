import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'graphql'

import { Header } from 'semantic-ui-react'

const BlogPost = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  const { post } = data
  const { title, author } = post.frontmatter
  const { date } = post.fields
  const tabTitle = title || siteTitle

  return (
    <div>
      <Helmet title={tabTitle} />
      <Header as='h1'>
        {title}
        <Header.Subheader>{date} written by {author}</Header.Subheader>
      </Header>
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
        date
      }
      frontmatter {
        title
        author
      }
    }
  }
`
