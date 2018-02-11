
import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Header } from 'semantic-ui-react'

import SocialLinks from '../SocialLinks'
import AuthorAvatar from '../AuthorAvatar'

const AuthorDisplay = ({name, description, urls, email, avatarURL}) =>
  <Grid columns={2} centered>
    <Grid.Column width={2} style={{ minWidth: '90px' }}>
      <AuthorAvatar
        authorName={name}
        avatarURL={avatarURL} />
      <SocialLinks urls={urls} email={email} />
    </Grid.Column>
    <Grid.Column style={{ minWidth: '170px' }}>
      <Header as='h3'>
        {name}
        <Header.Subheader>{description}</Header.Subheader>
      </Header>
    </Grid.Column>
  </Grid>

AuthorDisplay.propTypes = {
  avatarURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  urls: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  email: PropTypes.string.isRequired
}

export default AuthorDisplay
