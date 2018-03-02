
import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'

import styles from './styles.sass'

import SocialLinks from '../SocialLinks'
import AuthorAvatar from '../AuthorAvatar'

const AuthorDisplay = ({name, description, urls, email, avatarURL}) =>
  <div className={styles.container}>
    <div className={styles.links}>
      <AuthorAvatar authorName={name} avatarURL={avatarURL} />
      <SocialLinks urls={urls} email={email} />
    </div>
    <div className={styles.info}>
      <Header as='h1' inverted>{name}</Header>
      <p>{description}</p>
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
