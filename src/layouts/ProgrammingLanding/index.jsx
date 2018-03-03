import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.sass'

import CanvasIncrementalText from '../../components/CanvasIncrementalText'
import AuthorAvatar from '../../components/AuthorAvatar'
import SkewedHoverLink from '../../components/SkewedHoverLink'
import FadeInOut from '../../hoc-components/FadeInOut'
import OverlayBlur from '../../hoc-components/OverlayBlur'

const landingText = [
  'import React from \'react\'',
  'import ReactDOM from \'react-dom\'',
  'import AvatarURL from \'./avatar.png\'',
  '',
  'const Avatar = ({ name, nickname }) =>',
  '  <div id=\'author-avatar\'>',
  '    <img src={AvatarURL} />',
  '    <h1>{nickname}</h1>',
  '    <h2>{name}</h2>',
  '  </div>',
  '',
  'ReactDOM.render(',
  '  <Avatar',
  '    nickname=\'barskern\'',
  '    name=\'Ole Martin Ruud\' />,',
  '  document.getElementById(\'landing\')',
  ')'
]

class ProgrammingLanding extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showInfo: false
    }
  }

  render () {
    const { authorName, authorAvatarURL, authorNickname } = this.props
    const { showInfo } = this.state
    return (
      <div className={styles.landing}>

        <OverlayBlur show={showInfo} blurAmount={3}>
          <CanvasIncrementalText
            startAtTextIndex={160}
            charInterval={15}
            text={landingText.join('\n')}
            highlightingLanguage='jsx'
            centerText
            onRestart={() => this.setState({ showInfo: false })}
            onComplete={() => this.setState({ showInfo: true })} />
        </OverlayBlur>

        <FadeInOut show={showInfo}>
          <div className={styles.info}>
            <AuthorAvatar
              avatarURL={authorAvatarURL}
              authorName={authorName}
              size='small' />
            <h1 className={styles['info-nickname']}>{authorNickname}</h1>
            <h1 className={styles['info-name']}>{authorName}</h1>
          </div>
        </FadeInOut>

        <SkewedHoverLink show={showInfo} to='/posts'>Blogposts</SkewedHoverLink>
        <SkewedHoverLink show={showInfo} to='/projects' side='right'>Projects</SkewedHoverLink>
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
