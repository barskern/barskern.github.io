import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'

import styles from './index.sass'

import { Container, Header, Card, Button, Divider } from 'semantic-ui-react'
import ProjectPreview from '../../components/ProjectPreview'

const Projects = ({ projects }) =>
  <div className={styles.projects}>
    <Container>
      <Header as='h1' textAlign='center' inverted className={styles.header}>Projects</Header>
      <Card.Group centered stackable itemsPerRow={2} className={styles['card-group']}>
        {projects.map(project => <ProjectPreview key={project.id} {...project} />)}
      </Card.Group>
      <Divider hidden />
      <div className={styles.centering}>
        <Button inverted basic onClick={() => navigateTo('/projects')}>See more</Button>
      </div>
    </Container>
  </div>

Projects.propTypes = {
  projects: PropTypes.array
}

export default Projects
