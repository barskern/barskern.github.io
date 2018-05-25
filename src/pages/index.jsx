import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'graphql'

import styles from './styles.sass'

import Helmet from 'react-helmet'

import Sections from '../composed-views/HomepageSections'

class Homepage extends React.Component {
  render () {
    const { data } = this.props
    const { site, authorData, dblogposts, dprojects } = data

    const siteTitle = site.metadata.title
    const { name: authorName, nickname: authorNickname } = site.metadata.author
    const authorAvatarURL = authorData.avatar.newSize.src

    const blogposts = dblogposts.edges
      .map(({ node }) => ({ id: node.id, ...node.fields, ...node.frontmatter }))

    const projects = dprojects.edges.map(({ node }) => ({ ...node }))

    return (
      <div>
        <Helmet title={siteTitle} bodyAttributes={{ class: styles.background }} />
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
    metadata: siteMetadata {
      title
      author {
        name
        nickname
      }
    }
  }
  authorData: file(sourceInstanceName: { eq: "images" }, name: { eq: "olemartinruud" }) {
    avatar: childImageSharp {
      newSize: resize(width: 512, height: 512) {
        src
      }
    }
  }
  dblogposts: allMarkdownRemark(limit: 4, sort: { fields: [fields___date], order: DESC }) {
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
  dprojects: allProjectsJson(limit: 4) {
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
