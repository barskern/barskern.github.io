import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'graphql'

import styles from './styles.sass'

import { navigateTo } from 'gatsby-link'
import Helmet from 'react-helmet'
import { Card, Header, Container, Button, Divider } from 'semantic-ui-react'

import PostPreview from '../components/PostPreview'
import ProjectPreview from '../components/ProjectPreview'

import ProgrammingLanding from '../composed-views/ProgrammingLanding'

const headerStyle = { paddingTop: '.4em', fontSize: '3.7em' }
const cardGroupStyle = { padding: '1em 0em' }

class Homepage extends React.Component {
  render () {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const { authorName, authorNickname } = data.site.siteMetadata.author
    const authorAvatarURL = data.pageAuthorAvatarData.avatar.newSize.src

    const blogposts = data.blogposts.edges
      .map(({ node }) => ({ id: node.id, ...node.fields, ...node.frontmatter }))

    const projects = data.projects.edges.map(({ node }) => ({ ...node }))

    return (
      <div className={styles.page}>
        <Helmet title={siteTitle} />

        <ProgrammingLanding
          authorName={authorName}
          authorNickname={authorNickname}
          authorAvatarURL={authorAvatarURL}
        />

        <div className={styles.blogposts}>
          <Container>
            <Header as='h1' textAlign='center' style={headerStyle}>Blogposts</Header>
            <Card.Group centered stackable itemsPerRow={2} style={cardGroupStyle}>
              {blogposts.map(blogpost => <PostPreview key={blogpost.path} {...blogpost} />)}
            </Card.Group>
            <div className={styles.centering}>
              <Button basic onClick={() => navigateTo('/blogposts')}>See more</Button>
            </div>
          </Container>
        </div>
        <div className={styles.projects}>
          <Container>
            <Header as='h1' textAlign='center' inverted style={headerStyle}>Projects</Header>
            <Card.Group centered stackable itemsPerRow={1} style={cardGroupStyle}>
              {projects.map(project => <ProjectPreview key={project.id} {...project} />)}
            </Card.Group>
            <Divider hidden />
            <div className={styles.centering}>
              <Button inverted basic onClick={() => navigateTo('/projects')}>See more</Button>
            </div>
          </Container>
        </div>
      </div>
    )
  }
}

Homepage.propTypes = {
  data: PropTypes.object
}

export default Homepage

export const pageQuery = graphql`
query IndexQuery {
  site {
    siteMetadata {
      title
      author {
        authorName: name
        authorNickname: nickname
      }
    }
  }
  pageAuthorAvatarData: file(sourceInstanceName: { eq: "images"}, name: { eq: "olemartinruud"}) {
    avatar: childImageSharp {
      newSize: resize (width: 512, height: 512){
        src
      }
    }
  }
  blogposts: allMarkdownRemark(limit: 4, sort: { fields: [fields___date], order: DESC }) {
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
