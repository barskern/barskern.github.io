
import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby-link'
import { Image } from 'semantic-ui-react'

const AuthorAvatar = ({authorName, avatarURL, size}) =>
  <Image
    circular
    centered
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
