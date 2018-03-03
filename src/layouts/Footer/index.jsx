import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'graphql'

import style from './style.sass'

import AuthorDisplay from '../../components/AuthorDisplay'

const Footer = (props) => {
  const { authorInfo, authorAvatarData } = props
  const avatarURL = authorAvatarData.avatar.newSize.src

  return (
    <div className={style.footer}>
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
    newSize: resize (width: 256, height: 256){
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
