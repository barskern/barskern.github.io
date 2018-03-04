import React from 'react'
import PropTypes from 'prop-types'
import graphql from 'graphql'

import styles from './styles.sass'

import { navigateTo } from 'gatsby-link'
import { Container, Header, Card, Search, Label, Divider, Icon } from 'semantic-ui-react'

import ProjectPreview from '../../components/ProjectPreview'

class Projects extends React.Component {
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
    this.setState(prevState =>
      ({
        searchbarValue: value,
        filterIsLoading: value.length > 0
      })
    )
    setTimeout(() => this.setState(prevState => ({ filterIsLoading: false })), 300)
  }

  render () {
    const { data } = this.props
    const { tagsSelected, searchbarValue, filterIsLoading } = this.state

    // Flattens node object so that all info about a project is in a flat object
    const allProjects = data.projects.edges
      .map(({ node }) => ({ ...node }))

    // Gets all possible tags from all blogposts
    const allTags = Array.from(
      allProjects.reduce(
        (tags, project) =>
          project.tags.reduce((tags, tag) => tags.add(tag), tags),
        new Set()
      )
    )

    const projects = allProjects
      // Filter based on tags
      .filter(project =>
        tagsSelected.length === 0 ||
        Array.from(tagsSelected)
          .every(selectedTag => project.tags.some(tag => tag === selectedTag))
      )
      // Filter based on search word
      .filter(project =>
        searchbarValue.length === 0 ||
        project.title.toLowerCase().includes(searchbarValue.toLowerCase()) ||
        project.tags.some(tag => tag.includes(searchbarValue.toLowerCase()))
      )

    return (
      <div className={styles.container}>
        <Container style={{ position: 'relative' }}>
          <Icon
            name='home'
            size='big'
            inverted
            link
            style={{ position: 'absolute', right: 0, top: '14px' }}
            onClick={() => navigateTo('/')} />
          <Divider hidden fitted />
          <Header as='h1' textAlign='center' inverted style={{ fontSize: '3.6em' }}>Projects</Header>
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
                  color={tagsSelected.has(tag) ? 'blue' : 'grey'}
                  onClick={this.handleTagClick.bind(this)}
                >
                  {tag}
                </Label>
              )}
            </Label.Group>
          </div>
          <Divider hidden />
          <Card.Group centered stackable itemsPerRow={1} style={{ padding: '1em 0em' }}>
            {projects.map(project =>
              <ProjectPreview
                key={project.id}
                {...project} />
            )}
          </Card.Group>
        </Container>
      </div>
    )
  }
}

Projects.propTypes = {
  data: PropTypes.object
}

export default Projects

export const query = graphql`
query Projects {
  projects: allProjectsJson(limit: 3) {
    edges {
      node {
        id
        title
        thumbnailURL
        link
        description
        tags
      }
    }
  }
}
`
