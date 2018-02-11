import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'graphql'
import moment from 'moment'

import { Header, Container } from 'semantic-ui-react'

const BlogPost = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  const { post } = data
  const { title } = post.frontmatter
  const { date } = post.fields
  const tabTitle = title || siteTitle

  return (
    <div>
      <Helmet title={tabTitle} />
      <Container text style={{ paddingTop: '20px' }}>
        <Header as='h1'>
          {title}
          <Header.Subheader>{moment(date).format('LL')}</Header.Subheader>
        </Header>
        <p text dangerouslySetInnerHTML={{ __html: post.html }} />
      </Container>
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
      }
    }
  }
`
