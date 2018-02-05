
import React from 'react'
import PropTypes from 'prop-types'
import { navigateTo } from 'gatsby-link'
import { Divider } from 'antd'

import SocialLinks from '../SocialLinks'
import AuthorAvatar from '../AuthorAvatar'

const style = {
  display: 'flex',
  alignItems: 'center',
  width: '340px'
}

const styleDivider = {
  margin: '0 12px',
  height: '30px',
  background: 'rgba(0,0,0,0.3)'
}

const AuthorDisplay = ({name, description, urls, email, avatarURL}) =>
  <div style={style}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AuthorAvatar
        authorName={name}
        avatarURL={avatarURL}
        onClick={() => navigateTo('/')} />
      <SocialLinks urls={urls} email={email} />
    </div>
    <Divider style={styleDivider} type='vertical' />
    <div>
      <h3>{name}</h3>
      <div>{description}</div>
    </div>
  </div>

AuthorDisplay.propTypes = {
  avatarURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  urls: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  email: PropTypes.string.isRequired
}

export default AuthorDisplay
