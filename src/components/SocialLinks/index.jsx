import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

const SocialLinks = (props) => {
  const { githubURL, email } = props

  const style = {
    display: 'flex',
    justifyContent: 'center'
  }

  const styleIcon = {
    color: 'rgba(20,20,20,1)',
    fontSize: '17px',
    margin: '0 4px'
  }

  return (
    <div style={style}>
      <a href={githubURL}>
        <Icon type='github' style={styleIcon}/>
      </a>
      <a href={`mailto:${email}`}>
        <Icon type='mail' style={styleIcon}/>
      </a>
    </div>
  )
}

SocialLinks.propTypes = {
  githubURL: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

export default SocialLinks
