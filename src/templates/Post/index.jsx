import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'graphql'
import moment from 'moment'

import { navigateTo } from 'gatsby-link'
import { Header, Container, Divider, Icon, List, Image } from 'semantic-ui-react'

const BlogPost = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  const { post, iconFile } = data
  const icon = (iconFile && iconFile.child.res.src) || ''
  const { title, tags } = post.frontmatter
  const { date } = post.fields
  const tabTitle = `${title} | ${siteTitle}` || siteTitle

  return (
    <div>
      <Helmet title={tabTitle} />
      <Container text style={{ position: 'relative' }}>
        <Icon
          name='home'
          size='big'
          link
          style={{ position: 'absolute', right: 0, top: '14px' }}
          onClick={() => navigateTo('/')} />
        <Divider hidden fitted />
        <Divider hidden />
        <Header as='h1' style={{ fontSize: '2.3em' }}>
          {title}
          <Header.Subheader>
            {moment(date).format('LL')}
            <List horizontal floated='right'>
              {tags.map(tag =>
                <List.Item key={tag}>{tag}</List.Item>
              )}
            </List>
          </Header.Subheader>
        </Header>

        <Image size='small' spaced src={icon} floated="right" />
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
  query BlogPostByPath($id: String!, $icon: String) {
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
        tags
        icon
      }
    }
    iconFile: file(name: { eq: $icon }, sourceInstanceName: { eq: "images" }) {
      child: childImageSharp {
        res: resolutions(width: 256, height: 256) {
          src
        }
      }
    }
  }
`
