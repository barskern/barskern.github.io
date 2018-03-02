import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'graphql'

import styles from './styles.sass'

import { Card, Header, Container } from 'semantic-ui-react'

import ProgrammingLanding from '../components/ProgrammingLanding'
import PostPreview from '../components/PostPreview'
import ProjectPreview from '../components/ProjectPreview'

import 'prismjs/components/prism-jsx.min' // Import jsx-language for prism

const headerStyle = { paddingTop: '.4em', fontSize: '3.7em' }

class Homepage extends React.Component {
  render () {
    const { data } = this.props

    const siteTitle = data.site.siteMetadata.title
    const { authorName, authorNickname } = data.site.siteMetadata.author
    const authorAvatarURL = data.pageAuthorAvatarData.avatar.newSize.src
    const postNodes = data.posts.edges
    const projectNodes = data.projects.edges

    return (
      <div className={styles.page}>
        <Helmet title={siteTitle} />

        <ProgrammingLanding
          authorName={authorName}
          authorNickname={authorNickname}
          authorAvatarURL={authorAvatarURL} />

        <div className={styles.blogposts}>
          <Container>
            <Header as='h1' textAlign='center' style={headerStyle}>Blogposts</Header>
            <Card.Group centered stackable itemsPerRow={2} style={{ padding: '1em 2em' }}>
              {postNodes.map(({ node }, index) =>
                <PostPreview
                  key={node.fields.path}
                  {...node.frontmatter}
                  {...node.fields}
                  excerpt={node.excerpt} />
              )}
            </Card.Group>
          </Container>
        </div>
        <div className={styles.projects}>
          <Container>
            <Header as='h1' textAlign='center' inverted style={headerStyle}>Projects</Header>
            <Card.Group stackable itemsPerRow={1} style={{ padding: '1em 2em' }}>
              {projectNodes.map(({ node }) =>
                <ProjectPreview key={node.id} {...node} />
              )}
            </Card.Group>
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
      newSize: resize (width: 256, height: 256){
        src
      }
    }
  }
  posts: allMarkdownRemark(limit: 4, sort: { fields: [fields___date], order: DESC }) {
    edges {
      node {
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
