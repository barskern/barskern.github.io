
import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby-link'
import { Image } from 'semantic-ui-react'

const style = {
  backgroundColor: '#555',
  clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)'
}

const AuthorAvatar = ({ authorName, avatarURL, size }) =>
  <Image
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
