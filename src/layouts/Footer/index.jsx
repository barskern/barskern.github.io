import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { graphql } from 'graphql'

import AuthorDisplay from '../../components/AuthorDisplay'

const { Footer } = Layout

const style = {
  background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0) 100%)'
}

const CustomFooter = (props) => {
  const { authorInfo, authorAvatarData } = props
  const avatarURL = authorAvatarData.avatar.newSize.src

  return (
    <Footer style={style}>
      <AuthorDisplay {...authorInfo} avatarURL={avatarURL} />
    </Footer>
  )
}
CustomFooter.propTypes = {
  authorInfo: PropTypes.object.isRequired,
  authorAvatarData: PropTypes.object.isRequired
}

export default CustomFooter

export const query = graphql`
fragment authorAvatarData on File {
  avatar: childImageSharp {
    newSize: resize (width: 64, height: 64){
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
