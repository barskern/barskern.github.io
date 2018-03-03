import React from 'react'
import PropTypes from 'prop-types'

import { Container, Header, Card, Search, Label } from 'semantic-ui-react'

import PostPreview from '../../components/PostPreview'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider'

class Blogposts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: {
        isLoading: false,
        value: '',
        tagIsActive: {}
      }
    }
  }

  handleTagClick (e, { tagID }) {
    this.setState(prevState =>
      ({
        filter: {
          ...prevState.filter,
          tagIsActive: {
            ...prevState.filter.tagIsActive,
            [tagID]: prevState.filter.tagIsActive[tagID] !== undefined ? !prevState.filter.tagIsActive[tagID] : true
          }
        }
      })
    )
  }

  handleInputChange (e, { value }) {
    this.setState(prevState =>
      ({
        filter: {
          value,
          isLoading: value.length > 0
        }
      })
    )
    setTimeout(() => this.setState(prevState => ({ filter: { ...prevState.filter, isLoading: false } })), 300)
  }

  render () {
    const { data } = this.props
    const { filter } = this.state

    // Flattens node object so that all info about a blogpost is in a flat object
    const allBlogposts = data.blogposts.edges
      .map(({ node }) => ({id: node.id, excerpt: node.excerpt, ...node.fields, ...node.frontmatter}))

    const blogposts = allBlogposts
      // Filter based on tags
      .filter(blogpost =>
        Object.keys(filter.tagIsActive)
          .every(tag => !filter.tagIsActive[tag]) ||
        Object.keys(filter.tagIsActive)
          .filter(tag => filter.tagIsActive[tag])
          .map(activeTag => blogpost.tags.some(tag => tag === activeTag))
          .some(hasTag => hasTag)
      )
      // Filter based on search word
      .filter(blogpost =>
        filter.value.length < 1 ||
        blogpost.title.includes(filter.value) ||
        blogpost.tags.some(tag => tag.includes(filter.value))
      )

    // Gets all possible tags from all blogposts
    const allTags = allBlogposts.reduce((tags, blogpost) => {
      blogpost.tags.forEach(tag => {
        tags[tag] = (tags[tag] === undefined ? [blogpost.id] : [...tags[tag], blogpost.id])
      })
      return tags
    }, {})

    return (
      <Container>
        <Divider hidden />
        <Header as='h1' textAlign='center'>Blogposts</Header>
        <Divider hidden />
        <Search
          fluid
          size='big'
          showNoResults={false}
          loading={filter.isLoading}
          onSearchChange={this.handleInputChange.bind(this)}
          value={filter.value}
        />
        <Divider hidden />
        <Label.Group>
          {Object.keys(allTags).map(tag =>
            <Label
              tagID={tag}
              as='a'
              key={tag}
              basic={!filter.tagIsActive[tag]}
              color='grey'
              onClick={this.handleTagClick.bind(this)}>
              {tag}
            </Label>
          )}
        </Label.Group>
        <Divider hidden />
        <Card.Group centered stackable itemsPerRow={1} style={{ padding: '1em 0em' }}>
          {blogposts.map(blogpost =>
            <PostPreview
              key={blogpost.id}
              {...blogpost} />
          )}
        </Card.Group>
        <Divider hidden />
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
