
import React from 'react'
import PropTypes from 'prop-types'
import Link, { withPrefix } from 'gatsby-link'
import { Avatar, Tooltip, Icon } from 'antd'

import { authorInitialsFromName } from '../../utils/author'
import { hexColorFromText } from '../../utils/general'

const AuthorAvatar = ({authorInfo, avatarURL}) =>
  <div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Link to='/'>
        <Tooltip title={authorInfo.name} placement="topRight">
          <Avatar
            size='large'
            style={{ backgroundColor: hexColorFromText(authorInfo.name) }}
            src={withPrefix(avatarURL)}>
            {authorInitialsFromName(authorInfo.name)}
          </Avatar>
        </Tooltip>
      </Link>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <a href={authorInfo.urls.github}>
        <Icon type='github' style={{ color: 'rgba(0,0,0,0.8)' }}/>
      </a>
      <a href={`mailto:${authorInfo.email}`}>
        <Icon type='mail' style={{ color: 'rgba(0,0,0,0.8)' }}/>
      </a>
    </div>
  </div>

AuthorAvatar.propTypes = {
  authorInfo: PropTypes.object.isRequired,
  avatarURL: PropTypes.object.isRequired
}

export default AuthorAvatar
