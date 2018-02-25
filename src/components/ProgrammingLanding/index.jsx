import React from 'react'
import PropTypes from 'prop-types'

import CanvasIncrementalText from '../CanvasIncrementalText'

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

const ProgrammingLanding = ({ authorName, authorAvatarURL }) =>
  <CanvasIncrementalText
    charInterval={20}
    text={landingText.join('\\n')}
    highlightingLanguage='jsx'
    authorName={authorName}
    authorAvatarURL={authorAvatarURL} />

ProgrammingLanding.propTypes = {
  authorName: PropTypes.string,
  authorAvatarURL: PropTypes.string
}

export default ProgrammingLanding
