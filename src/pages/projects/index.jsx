import React from 'react'
import PropTypes from 'prop-types'

import { Container, Header, Card, Search, Label } from 'semantic-ui-react'

import ProjectPreview from '../../components/ProjectPreview'
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider'

class Projects extends React.Component {
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
          ...prevState.filter,
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
    const allProjects = data.projects.edges
      .map(({ node }) => ({...node}))

    const projects = allProjects
      // Filter based on tags
      .filter(project =>
        Object.keys(filter.tagIsActive)
          .every(tag => !filter.tagIsActive[tag]) ||
        Object.keys(filter.tagIsActive)
          .filter(tag => filter.tagIsActive[tag])
          .map(activeTag => project.tags.some(tag => tag === activeTag))
          .some(hasTag => hasTag)
      )
      // Filter based on search word
      .filter(project =>
        filter.value.length < 1 ||
        project.title.includes(filter.value) ||
        project.tags.some(tag => tag.includes(filter.value))
      )

    // Gets all possible tags from all projects
    const allTags = allProjects.reduce((tags, project) => {
      project.tags.forEach(tag => {
        tags[tag] = (tags[tag] === undefined ? [project.id] : [...tags[tag], project.id])
      })
      return tags
    }, {})

    return (
      <Container>
        <Divider hidden />
        <Header as='h1' textAlign='center'>Projects</Header>
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
          {projects.map(project =>
            <ProjectPreview
              key={project.id}
              {...project} />
          )}
        </Card.Group>
        <Divider hidden />
      </Container>
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
