import React from 'react'
import PropTypes from 'prop-types'
import graphql from 'graphql'

import styles from './styles.sass'

import Helmet from 'react-helmet'
import { navigateTo } from 'gatsby-link'
import { Container, Header, Divider, Icon } from 'semantic-ui-react'

import ProjectPreview from '../../components/ProjectPreview'
import FilterCards from '../../components/FilterCards'

const Projects = ({ data }) => {
  // Flattens node object so that all info about a project is in a flat object
  const allProjects = data.projects.edges
    .map(({ node }) => ({ ...node }))

  return (
    <Container style={{ position: 'relative' }}>
      <Helmet bodyAttributes={{ class: styles.background }} />
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
      <FilterCards entries={allProjects} Preview={ProjectPreview} />
    </Container>
  )
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
