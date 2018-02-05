
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import SocialLinks from '../SocialLinks'
import AuthorAvatar from '../AuthorAvatar'

const AuthorDisplay = ({authorInfo, avatarURL}) =>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Link to='/'>
      <AuthorAvatar authorName={authorInfo.name} avatarURL={avatarURL} />
    </Link>
    <SocialLinks githubURL={authorInfo.urls.github} email={authorInfo.email} />
  </div>

AuthorDisplay.propTypes = {
  authorInfo: PropTypes.object.isRequired,
  avatarURL: PropTypes.string.isRequired
}

export default AuthorDisplay
