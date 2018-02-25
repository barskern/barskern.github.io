import React from 'react'
import PropTypes from 'prop-types'

import { Header } from 'semantic-ui-react'
import { Transition } from 'react-transition-group'

import AuthorAvatar from '../AuthorAvatar'

const styleAuthorInfo = {
  position: 'absolute',
  left: '50%',
  top: '38%',
  transform: 'translate(-50%, -50%)'
}

const styleAuthorInfoTransition = {
  'entering': { 'opacity': 1 },
  'entered': { 'opacity': 1 },
  'exited': { 'opacity': 0 },
  'exiting': { 'opacity': 0 }
}

const styleAuthorName = {
  margin: '10px 0',
  whiteSpace: 'nowrap'
}

const AuthorLandingFade = ({ show, authorAvatarURL, authorName, duration }) =>
  <Transition in={!!show} timeout={duration}>
    {state =>
      <div style={{
        ...styleAuthorInfo,
        transition: `opacity ${duration}ms ease-in-out`,
        ...styleAuthorInfoTransition[state]
      }}>
        <AuthorAvatar avatarURL={authorAvatarURL} />
        <Header style={styleAuthorName} as='h1'>{authorName}</Header>
      </div>
    }
  </Transition>

AuthorLandingFade.propTypes = {
  show: PropTypes.bool.isRequired,
  authorAvatarURL: PropTypes.string.isRequired,
  authorName: PropTypes.string,
  duration: PropTypes.number
}

AuthorLandingFade.defaultProps = {
  duration: 200
}

export default AuthorLandingFade
