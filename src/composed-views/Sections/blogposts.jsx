import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'

import styles from './index.sass'

import { Container, Header, Card, Button, Divider } from 'semantic-ui-react'
import PostPreview from '../../components/PostPreview'

const Blogposts = ({ blogposts }) =>
  <div className={styles.blogposts}>
    <Container>
      <Header as='h1' textAlign='center' className={styles.header}>Blogposts</Header>
      <Card.Group centered stackable itemsPerRow={2} className={styles['card-group']}>
        {blogposts.map(blogpost => <PostPreview key={blogpost.path} {...blogpost} />)}
      </Card.Group>
      <Divider hidden />
      <div className={styles.centering}>
        <Button basic onClick={() => navigateTo('/blogposts')}>See more</Button>
      </div>
    </Container>
  </div>

Blogposts.propTypes = {
  blogposts: PropTypes.array
}

export default Blogposts
