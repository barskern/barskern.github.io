import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'graphql'

import AuthorDisplay from '../../components/AuthorDisplay'

const style = {
  background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0) 100%)',
  padding: '40px 25px'
}

const Footer = (props) => {
  const { authorInfo, authorAvatarData } = props
  const avatarURL = authorAvatarData.avatar.newSize.src

  return (
    <div style={style}>
      <AuthorDisplay {...authorInfo} avatarURL={avatarURL} />
    </div>
  )
}
Footer.propTypes = {
  authorInfo: PropTypes.object.isRequired,
  authorAvatarData: PropTypes.object.isRequired
}

export default Footer

export const query = graphql`
fragment authorAvatarData on File {
  avatar: childImageSharp {
    newSize: resize (width: 128, height: 128){
      src
    }
  }
}
fragment authorInfo on author_2 {
  name
  description
  email
  urls {
    github
  }
}
`
