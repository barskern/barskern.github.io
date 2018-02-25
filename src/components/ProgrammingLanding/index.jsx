import React from 'react'
import PropTypes from 'prop-types'

import CanvasIncrementalText from '../CanvasIncrementalText'
import AuthorAvatar from '../AuthorAvatar'
import FadeInOut from '../../hoc-components/FadeInOut'
import OverlayBlur from '../../hoc-components/OverlayBlur'
import { Header } from 'semantic-ui-react'

const size = {
  width: '100%',
  height: '100vh',
  maxHeight: '300px'
}

const style = {
  ...size,
  position: 'relative',
  margin: 0
}

const styleAuthorInfo = {
  ...size,
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

const landingText = [
  'import ReactDOM from \'react-dom\'',
  'import AvatarURL from \'../images/awesome_avatar.png\'',
  '',
  'const Avatar = ({ authorName }) =>',
  '  <div id=\'author-avatar\'>',
  '    <img src={AvatarURL} />',
  '    <h2>{authorName}</h2>',
  '  </div>',
  '',
  'ReactDOM.render(<Avatar authorName=\'Ole Martin Ruud\' />,',
  '  document.getElementById(\'landing\'))'
]

class ProgrammingLanding extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showAuthor: false
    }
  }

  render () {
    const { authorName, authorAvatarURL } = this.props
    const { showAuthor } = this.state
    return (
      <div style={style}>
        <OverlayBlur show={showAuthor}>
          <CanvasIncrementalText
            charInterval={30}
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
              authorName={authorName} />
            <Header as='h1'>{authorName}</Header>
          </div>
        </FadeInOut>
      </div>
    )
  }
}

ProgrammingLanding.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorAvatarURL: PropTypes.string.isRequired
}

export default ProgrammingLanding
