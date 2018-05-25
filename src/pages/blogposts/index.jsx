import React from 'react'
import PropTypes from 'prop-types'
import graphql from 'graphql'

import { navigateTo } from 'gatsby-link'
import { Container, Header, Divider, Icon } from 'semantic-ui-react'

import PostPreview from '../../components/PostPreview'
import FilterCards from '../../components/FilterCards'

class Blogposts extends React.Component {
  render () {
    const { data } = this.props

    // Flattens node object so that all info about a blogpost is in a flat object
    const allBlogposts = data.blogposts.edges
      .map(({ node }) => ({ id: node.id, ...node.fields, ...node.frontmatter }))

    return (
      <Container style={{ position: 'relative' }}>
        <Icon
          name='home'
          size='big'
          link
          style={{ position: 'absolute', right: 0, top: '14px' }}
          onClick={() => navigateTo('/')} />
        <Divider hidden fitted />
        <Header as='h1' textAlign='center' style={{ fontSize: '3.6em' }}>Blogposts</Header>
        <Divider hidden />
        <FilterCards entries={allBlogposts} Preview={PostPreview} />
      </Container>
    )
  }
}

Blogposts.propTypes = {
  data: PropTypes.object
}

export default Blogposts

export const query = graphql`
query Blogposts {
  blogposts: allMarkdownRemark(limit: 1000, sort: { fields: [fields___date], order: DESC }) {
    edges {
      node {
        id
        fields {
          path
          date
        }
        frontmatter {
          title
          tags
          description
        }
      }
    }
  }
}
`
