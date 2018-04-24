
import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby-link'
import { Image } from 'semantic-ui-react'

const style = {
  backgroundColor: '#63a0a4'
}

const AuthorAvatar = ({ authorName, avatarURL, size }) =>
  <Image
    circular
    style={style}
    size={size}
    src={withPrefix(avatarURL)} />

AuthorAvatar.defaultProps = {
  size: 'tiny'
}

AuthorAvatar.propTypes = {
  authorName: PropTypes.string,
  avatarURL: PropTypes.string.isRequired,
  size: PropTypes.string
}

export default AuthorAvatar
