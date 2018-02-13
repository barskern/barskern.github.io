import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'graphql'

import Landing from '../components/Landing'
import PostPreview from '../components/PostPreview'
import 'prismjs/components/prism-jsx.min'

const landingText = [
  'import ReactDOM from \'react-dom\'',
  'import AvatarURL from \'../images/awesome_avatar.png\'',
  '',
  'const Avatar = ({ authorName }) =>',
  '  <div id=\'author-avatar\'>',
  '    <img src={AvatarURL} />',
  '    <h2>{authorName}</h2>',
  '  </div>',
  '',
  'ReactDOM.render(<Avatar authorName=\'Ole Martin Ruud\' />,',
  '  document.getElementById(\'landing\'))'
]

class BlogIndex extends React.Component {
  render () {
    const { data } = this.props

    const siteTitle = data.site.siteMetadata.title
    const authorName = data.site.siteMetadata.author.name
    const authorAvatarURL = data.pageAuthorAvatarData.avatar.newSize.src
    const markdownNodes = data.posts.edges

    return (
      <div>
        <Helmet title={siteTitle} />
        <Landing
          charInterval={20}
          text={landingText.join('\\n')}
          highlightingLanguage='jsx'
          authorName={authorName}
          authorAvatarURL={authorAvatarURL} />

        {markdownNodes.map(({ node }) =>
          <PostPreview
            key={ node.fields.path }
            {...node.frontmatter}
            {...node.fields}
            excerpt={node.excerpt} />
        )}
      </div>
    )
  }
}

BlogIndex.propTypes = {
  data: PropTypes.object
}

export default BlogIndex

export const pageQuery = graphql`
query IndexQuery {
  site {
    siteMetadata {
      title
      author {
        name
      }
    }
  }
  pageAuthorAvatarData: file(sourceInstanceName: { eq: "images"}, name: { eq: "olemartinruud"}) {
    avatar: childImageSharp {
      newSize: resize (width: 128, height: 128){
        src
      }
    }
  }
  posts: allMarkdownRemark(limit: 5, sort: { fields: [fields___date], order: DESC }) {
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
}
`
