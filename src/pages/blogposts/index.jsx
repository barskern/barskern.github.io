import React from 'react'
import PropTypes from 'prop-types'
import graphql from 'graphql'

import styles from './styles.sass'

import { navigateTo } from 'gatsby-link'
import { Container, Header, Card, Search, Label, Divider, Icon } from 'semantic-ui-react'

import PostPreview from '../../components/PostPreview'

class Blogposts extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filterIsLoading: false,
      searchbarValue: '',
      tagsSelected: new Set()
    }
  }

  handleTagClick (e, { children }) {
    this.setState(({ tagsSelected }) => ({
      tagsSelected: new Set(
        tagsSelected.delete(children)
          ? tagsSelected
          : tagsSelected.add(children)
      )
    }))
  }

  handleInputChange (e, { value }) {
    this.setState({
      searchbarValue: value,
      filterIsLoading: value.length > 0
    })
    setTimeout(() => this.setState({ filterIsLoading: false }), 300)
  }

  render () {
    const { data } = this.props
    const { tagsSelected, searchbarValue, filterIsLoading } = this.state

    // Flattens node object so that all info about a blogpost is in a flat object
    const allBlogposts = data.blogposts.edges
      .map(({ node }) => ({ id: node.id, ...node.fields, ...node.frontmatter }))

    // Gets all possible tags from all blogposts
    const allTags = Array.from(
      allBlogposts.reduce(
        (tags, blogpost) =>
          blogpost.tags.reduce((tags, tag) => tags.add(tag), tags),
        new Set()
      )
    )

    const blogposts = allBlogposts
      // Filter based on tags
      .filter(blogpost =>
        tagsSelected.length === 0 ||
        Array.from(tagsSelected)
          .every(selectedTag => blogpost.tags.some(tag => tag === selectedTag))
      )
      // Filter based on search word
      .filter(blogpost =>
        searchbarValue.length === 0 ||
        blogpost.title.toLowerCase().includes(searchbarValue.toLowerCase()) ||
        blogpost.tags.some(tag => tag.includes(searchbarValue.toLowerCase()))
      )

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
        <div className={styles['filter']}>
          <Search
            size='big'
            showNoResults={false}
            loading={filterIsLoading}
            onSearchChange={this.handleInputChange.bind(this)}
            value={searchbarValue}
          />
          <Divider hidden />
          <Label.Group size='large'>
            {allTags.map(tag =>
              <Label
                as='a'
                key={tag}
                basic={true}
                color={tagsSelected.has(tag) ? 'blue' : 'grey'}
                onClick={this.handleTagClick.bind(this)}
              >
                {tag}
              </Label>
            )}
          </Label.Group>
        </div>
        <Divider hidden />
        <Card.Group centered stackable itemsPerRow={2} style={{ padding: '1em 0em' }}>
          {blogposts.map(blogpost =>
            <PostPreview
              key={blogpost.id}
              {...blogpost} />
          )}
        </Card.Group>
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
