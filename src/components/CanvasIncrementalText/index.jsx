import React from 'react'
import PropTypes from 'prop-types'

import Prism from 'prismjs'

import AuthorLandingFade from '../AuthorLandingFade'

const colors = {
  base03: '#002b36',
  base02: '#073642',
  base01: '#586e75',
  base00: '#657b83',
  base0: '#839496',
  base1: '#93a1a1',
  base2: '#eee8d5',
  base3: '#fdf6e3',
  yellow: '#b58900',
  orange: '#cb4b16',
  red: '#dc322f',
  magenta: '#d33682',
  violet: '#6c71c4',
  blue: '#268bd2',
  cyan: '#2aa198',
  green: '#859900'
}

const styleSize = {
  width: '100%',
  height: '30vh'
}

const style = {
  ...styleSize,
  position: 'relative',
  backgroundColor: colors['base2']
}

const styleCanvas = {
  ...styleSize
}

const highlightingColors = {
  'default': colors['base01'],
  'keyword': colors['magenta'],
  'number': colors['red'],
  'function': colors['cyan'],
  'operator': colors['base01'],
  'regex': colors['orange'],
  'function-variable': colors['cyan'],
  'template-string': colors['yellow'],
  'punctuation': colors['base1'],
  'tag': colors['red'],
  'attr-name': colors['yellow'],
  'attr-value': colors['green'],
  'script': colors['default']
}

const drawToken = (ctx, parentType = 'default') => token => {
  if (Array.isArray(token.content)) {
    token.content.forEach(token => drawToken(ctx, token.type || parentType)(token))
    return
  }
  const text = token.content || token
  const type = token.type || parentType

  ctx.fillStyle = highlightingColors[type || 'default'] || highlightingColors['default']
  ctx.fillText(text, 0, 0)
  ctx.translate(ctx.measureText(text).width, 0)
}

class CanvasIncrementalText extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      textIndex: 0,
      showAuthor: false
    }
  }

  startTextInterval () {
    this.intervalID = setInterval(
      this.setState.bind(this, (prevState, props) => {
        if (props.text.length < prevState.textIndex) {
          const { blurAmount } = this.props
          this.canvas.style.filter = `blur(${blurAmount}px)`
          clearInterval(this.intervalID)
          return {
            ...prevState,
            showAuthor: true
          }
        } else {
          return {
            textIndex: prevState.textIndex + 1
          }
        }
      })
      , this.props.charInterval)
  }

  updateCanvas () {
    const ctx = this.canvas.getContext('2d')
    const { fontSize, highlightingLanguage, textStartPos, text } = this.props
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.font = `${fontSize}px "Source Code Pro", monospace`

    ctx.save()
    ctx.translate(textStartPos.x, textStartPos.y)

    text
      .slice(0, this.state.textIndex)
      .replace(/\\$/, '')
      .split('\\n')
      .map(line => Prism.tokenize(line, Prism.languages[highlightingLanguage]))
      .forEach((lineTokens, lineNumber) => {
        ctx.save()
        ctx.translate(0, fontSize * lineNumber)
        lineTokens.forEach(drawToken(ctx))
        ctx.restore()
      })
    ctx.restore()
  }

  updateCanvasSize () {
    this.canvas.width = this.canvas.offsetWidth
    this.canvas.height = this.canvas.offsetHeight
  }

  componentDidMount () {
    this.updateCanvasSize()
    window.addEventListener('resize', this.updateCanvasSize.bind(this))
    this.startTextInterval()
  }

  componentWillUpdate () {
    this.updateCanvas()
  }

  componentWillReceiveProps (nextProps) {
    // Start from scratch ONLY if the new text doesn't contain current text
    if (!nextProps.text.includes(this.props.text)) {
      this.setState(prevState => ({
        ...prevState,
        textIndex: 0
      }))
    }
    this.setState(prevState => ({
      ...prevState,
      showAuthor: false
    }))
    this.canvas.style.filter = 'none'
    this.startTextInterval()
  }

  componentWillUnmount () {
    clearInterval(this.intervalID)
    window.removeEventListener('resize', this.updateCanvasSize.bind(this))
  }

  render () {
    const { authorAvatarURL, authorName, blurDuration, authorInfoDuration } = this.props
    const { showAuthor } = this.state
    return (
      <div style={style}>
        <div style={{
          ...styleCanvas,
          transition: `filter ${blurDuration}ms ease-in-out`
        }}>
          <canvas ref={(c) => { this.canvas = c }} style={styleCanvas} />
        </div>
        <AuthorLandingFade
          show={showAuthor}
          duration={authorInfoDuration}
          authorAvatarURL={authorAvatarURL}
          authorName={authorName} />
      </div>
    )
  }
}

CanvasIncrementalText.defaultProps = {
  fontSize: 20,
  charInterval: 40,
  textStartPos: {
    x: 20,
    y: 30
  },
  highlightingLanguage: 'javascript',
  blurAmount: 1,
  blurDuration: 1000,
  authorInfoDuration: 200
}

CanvasIncrementalText.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  charInterval: PropTypes.number,
  textStartPos: PropTypes.object,
  highlightingLanguage: PropTypes.string,
  blurAmount: PropTypes.number,
  blurDuration: PropTypes.number,
  authorAvatarURL: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorInfoDuration: PropTypes.number
}

export default CanvasIncrementalText
