import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'graphql'

import styles from './styles.sass'

import Helmet from 'react-helmet'

import Sections from '../composed-views/Sections'

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
        <Sections.Landing
          authorName={authorName}
          authorNickname={authorNickname}
          authorAvatarURL={authorAvatarURL}
        />
        <Sections.Blogposts blogposts={blogposts} />
        <Sections.Projects projects={projects} />
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
  pageAuthorAvatarData: file(sourceInstanceName: { eq: "images" }, name: { eq: "olemartinruud" }) {
    avatar: childImageSharp {
      newSize: resize(width: 512, height: 512) {
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
