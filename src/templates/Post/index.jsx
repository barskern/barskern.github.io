import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'graphql'
import moment from 'moment'

import { navigateTo } from 'gatsby-link'
import { Header, Container, Divider, Icon } from 'semantic-ui-react'

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
        <Icon
          name='home'
          size='huge'
          link
          style={{ position: 'absolute', right: '20px', top: '20px' }}
          onClick={() => navigateTo('/')} />
        <Header as='h1'>
          {title}
          <Header.Subheader>{moment(date).format('LL')}</Header.Subheader>
        </Header>
        <p dangerouslySetInnerHTML={{ __html: post.html }} />
        <Divider hidden />
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
