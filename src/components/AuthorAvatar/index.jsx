
import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby-link'
import { Avatar, Tooltip } from 'antd'

import { authorInitialsFromName } from '../../utils/author'
import { hexColorFromText } from '../../utils/general'

const AuthorAvatar = ({authorName, avatarURL}) =>
  <Tooltip title={authorName} placement="topRight">
    <Avatar
      size='large'
      style={{ backgroundColor: hexColorFromText(authorName) }}
      src={withPrefix(avatarURL)}>
      {authorInitialsFromName(authorName)}
    </Avatar>
  </Tooltip>

AuthorAvatar.propTypes = {
  authorName: PropTypes.object.isRequired,
  avatarURL: PropTypes.string.isRequired
}

export default AuthorAvatar
