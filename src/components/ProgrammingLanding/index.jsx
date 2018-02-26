import React from 'react'
import PropTypes from 'prop-types'

import CanvasIncrementalText from '../CanvasIncrementalText'
import AuthorAvatar from '../AuthorAvatar'
import SkewedHoverLink from '../SkewedHoverLink'
import FadeInOut from '../../hoc-components/FadeInOut'
import FadeInFromSide from '../../hoc-components/FadeInFromSide'
import OverlayBlur from '../../hoc-components/OverlayBlur'
import { Header } from 'semantic-ui-react'

const size = {
  width: '100%',
  height: '100vh',
  maxHeight: '300px'
}

const fillParent = {
  ...size,
  position: 'absolute',
  top: 0,
  left: 0
}

const style = {
  ...size,
  position: 'relative',
  margin: 0
}

const styleAuthorInfo = {
  ...fillParent,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

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
      showAuthor: false
    }
  }

  render () {
    const { authorName, authorAvatarURL, authorNickname } = this.props
    const { showAuthor } = this.state
    return (
      <div style={style}>
        <OverlayBlur show={showAuthor} blurAmount={3}>
          <CanvasIncrementalText
            startAtTextIndex={130}
            charInterval={15}
            text={landingText.join('\n')}
            highlightingLanguage='jsx'
            centerText
            onRestart={() => this.setState({ showAuthor: false })}
            onComplete={() => this.setState({ showAuthor: true })} />
        </OverlayBlur>

        <FadeInOut show={showAuthor}>
          <div style={styleAuthorInfo}>
            <AuthorAvatar
              avatarURL={authorAvatarURL}
              authorName={authorName}
              size='small' />
            <Header as='h1' style={{ fontFamily: 'Beyno', fontSize: '40px', margin: '10px 0' }}>{authorNickname}</Header>
            <Header as='h1' style={{ fontFamily: 'Beyno', fontSize: '20px', margin: '0 0' }}>{authorName}</Header>
          </div>
        </FadeInOut>

        <SkewedHoverLink show={showAuthor} to='/posts'>Blogposts</SkewedHoverLink>
        <SkewedHoverLink show={showAuthor} to='/projects' side='right'>Projects</SkewedHoverLink>
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
