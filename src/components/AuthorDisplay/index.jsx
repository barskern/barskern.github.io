
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { Divider } from 'antd'

import SocialLinks from '../SocialLinks'
import AuthorAvatar from '../AuthorAvatar'

const styleAuthor = {
  display: 'flex',
  width: '300px'
}

const AuthorDisplay = ({name, description, urls, email, avatarURL}) =>
  <div style={styleAuthor}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Link to='/'>
        <AuthorAvatar authorName={name} avatarURL={avatarURL} />
      </Link>
      <SocialLinks urls={urls} email={email} />
    </div>
    <Divider style={{ height: '65px', background: 'rgba(0,0,0,0.3)' }} type='vertical' />
    <p>{description}</p>
  </div>

AuthorDisplay.propTypes = {
  avatarURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  urls: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  email: PropTypes.string.isRequired
}

export default AuthorDisplay
