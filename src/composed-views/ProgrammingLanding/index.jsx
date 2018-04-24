import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.sass'

import AuthorAvatar from '../../components/AuthorAvatar'
import FadeInOut from '../../hoc-components/FadeInOut'

class ProgrammingLanding extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showInfo: true
    }
  }

  render () {
    const { authorName, authorAvatarURL, authorNickname } = this.props
    const { showInfo } = this.state
    return (
      <div className={styles.landing}>
        <FadeInOut show={showInfo}>
          <div className={styles.info}>
            <AuthorAvatar
              avatarURL={authorAvatarURL}
              authorName={authorName}
              size='medium' />
            <h1 className={styles['info-nickname']}>{authorNickname}</h1>
            <h1 className={styles['info-name']}>{authorName}</h1>
          </div>
        </FadeInOut>
      </div>
    )
  }
}

ProgrammingLanding.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorNickname: PropTypes.string.isRequired,
  authorAvatarURL: PropTypes.string.isRequired
}

export default ProgrammingLanding
