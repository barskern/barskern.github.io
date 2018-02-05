import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

const style = {
  display: 'flex',
  justifyContent: 'center'
}

const styleIcon = {
  color: 'rgba(20,20,20,1)',
  fontSize: '16px',
  margin: '0 4px'
}

const SocialLinks = ({ urls, email }) =>
  <div style={style}>
    <a href={urls.github}>
      <Icon type='github' style={styleIcon}/>
    </a>
    <a href={`mailto:${email}`}>
      <Icon type='mail' style={styleIcon}/>
    </a>
  </div>

SocialLinks.propTypes = {
  urls: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  email: PropTypes.string.isRequired
}

export default SocialLinks
