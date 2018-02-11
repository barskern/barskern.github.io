import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px 0'
}

const redirect = (url) => {
  window.location.href = url
}

const SocialLinks = ({ urls, email }) =>
  <div style={style}>
    <Icon link size='large' name='github' onClick={() => redirect(urls.github)} />
    <Icon link size='large' name='outline mail' onClick={() => redirect(`mailto:${email}`)}/>
  </div>

SocialLinks.propTypes = {
  urls: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  email: PropTypes.string.isRequired
}

export default SocialLinks
