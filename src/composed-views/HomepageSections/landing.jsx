
import React from 'react'
import PropTypes from 'prop-types'

import styles from './index.sass'

import AuthorAvatar from '../../components/AuthorAvatar'

class Landing extends React.Component {
  render () {
    const { authorName, authorAvatarURL, authorNickname } = this.props
    return (
      <div className={styles.landing}>
        <div className={styles['landing-info']}>
          <AuthorAvatar
            avatarURL={authorAvatarURL}
            authorName={authorName}
            size='medium' />
          <h1 className={styles['landing-info-nickname']}>{authorNickname}</h1>
          <h1 className={styles['landing-info-name']}>{authorName}</h1>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorNickname: PropTypes.string.isRequired,
  authorAvatarURL: PropTypes.string.isRequired
}

export default Landing
