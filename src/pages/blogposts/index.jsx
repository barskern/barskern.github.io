import React from 'react'
import PropTypes from 'prop-types'
import graphql from 'graphql'

import styles from './styles.sass'

import { Container, Header, Card, Search, Label, Divider } from 'semantic-ui-react'

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

  handleTagClick (e, { tagID }) {
    this.setState(({ tagsSelected }) => ({
      tagsSelected: new Set(
        tagsSelected.delete(tagID)
          ? tagsSelected
          : tagsSelected.add(tagID)
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
      .map(({ node }) => ({ id: node.id, excerpt: node.excerpt, ...node.fields, ...node.frontmatter }))

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
      <Container>
        <Divider hidden />
        <Header as='h1' textAlign='center'>Blogposts</Header>
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
                tagID={tag}
                as='a'
                key={tag}
                basic={!tagsSelected.has(tag)}
                color='grey'
                onClick={this.handleTagClick.bind(this)}
              >
                {tag}
              </Label>
            )}
          </Label.Group>
        </div>
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
