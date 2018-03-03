import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.sass'

import { Icon } from 'semantic-ui-react'

const redirect = (url) => {
  window.location.href = url
}

const SocialLinks = ({ urls, email, vertical }) =>
  <div className={styles['link-container']} style={vertical ? { flexDirection: 'column' } : {}}>
    <Icon style={{ margin: '.1em .25em' }} link size='big' name='github' onClick={() => redirect(urls.github)} />
    <Icon style={{ margin: '.1em .25em' }} link size='big' name='outline mail' onClick={() => redirect(`mailto:${email}`)}/>
  </div>

SocialLinks.propTypes = {
  urls: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  email: PropTypes.string.isRequired,
  vertical: PropTypes.bool
}

export default SocialLinks
