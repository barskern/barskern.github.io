
import React from 'react'
import PropTypes from 'prop-types'

import SocialLinks from '../SocialLinks'
import AuthorAvatar from '../AuthorAvatar'
import { Header, Divider } from 'semantic-ui-react'

const style = {
  display: 'flex',
  alignItems: 'center',
  maxWidth: '340px',
  width: '100%'
}

const styleAvatarAndLinks = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const AuthorDisplay = ({name, description, urls, email, avatarURL}) =>
  <div style={style}>
    <div style={styleAvatarAndLinks}>
      <AuthorAvatar
        authorName={name}
        avatarURL={avatarURL} />
      <SocialLinks urls={urls} email={email} />
    </div>
    <Divider vertical />
    <div>
      <Header as='h3'>
        {name}
        <Header.Subheader>{description}</Header.Subheader>
      </Header>
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
