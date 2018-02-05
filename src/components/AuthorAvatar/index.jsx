
import React from 'react'
import PropTypes from 'prop-types'
import { withPrefix } from 'gatsby-link'
import { Avatar, Tooltip } from 'antd'

import { authorInitialsFromName } from '../../utils/author'
import { hexColorFromText } from '../../utils/general'

const AuthorAvatar = ({authorName, avatarURL, onClick}) =>
  <Tooltip title={authorName} placement="topRight">
    <Avatar
      onClick={onClick}
      size='large'
      style={{ backgroundColor: hexColorFromText(authorName) }}
      src={withPrefix(avatarURL)}>
      {authorInitialsFromName(authorName)}
    </Avatar>
  </Tooltip>

AuthorAvatar.propTypes = {
  authorName: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default AuthorAvatar
