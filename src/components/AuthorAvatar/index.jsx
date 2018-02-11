
import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby-link'
import { Image } from 'semantic-ui-react'

const AuthorAvatar = ({authorName, avatarURL}) =>
  <Image
    circular
    size='tiny'
    src={withPrefix(avatarURL)} />

AuthorAvatar.propTypes = {
  authorName: PropTypes.string,
  avatarURL: PropTypes.string.isRequired
}

export default AuthorAvatar
