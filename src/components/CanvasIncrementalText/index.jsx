import React from 'react'
import PropTypes from 'prop-types'

import Prism from 'prismjs'

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
      textStartPos: props.textStartPos
    }
  }

  startTextInterval () {
    const { charInterval, onComplete } = this.props
    this.intervalID = setInterval(
      this.setState.bind(this,
        (prevState, props) => {
          if (prevState.textIndex > props.text.length) {
            clearInterval(this.intervalID)
            if (typeof onComplete === 'function') onComplete()
            return { ...prevState }
          } else {
            return {
              ...prevState,
              textIndex: prevState.textIndex + 1
            }
          }
        })
      , charInterval)
  }

  updateCanvas () {
    const ctx = this.canvas.getContext('2d')
    const { fontSize, fontFamily, highlightingLanguage, text } = this.props
    const { textStartPos } = this.state

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.save()
    ctx.font = `${fontSize}px ${fontFamily}`
    ctx.translate(textStartPos.x, textStartPos.y)

    text
      .slice(0, this.state.textIndex)
      .split('\n')
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

    if (this.props.centerText) {
      const ctx = this.canvas.getContext('2d')
      this.setState((prevState, props) => {
        const { fontSize, fontFamily } = props
        ctx.save()
        ctx.font = `${fontSize}px ${fontFamily}`
        const textLines = props.text
          .split('\n')
        const biggestWidth = textLines
          .reduce((currentlyBiggest, line) => Math.max(ctx.measureText(line).width, currentlyBiggest), 0)
        ctx.restore()
        return {
          textStartPos: {
            x: (this.canvas.width / 2) - (biggestWidth / 2),
            y: (this.canvas.height / 2) - ((fontSize * textLines.length) / 2)
          }
        }
      })
    }
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
    const { onRestart } = nextProps
    // Start from scratch ONLY if the new text doesn't contain current text
    if (!nextProps.text.includes(this.props.text)) {
      this.setState(prevState => {
        if (typeof onRestart === 'function') onRestart()
        return {
          ...prevState,
          textIndex: 0
        }
      })
    }
    this.updateCanvasSize()
    this.startTextInterval()
  }

  componentWillUnmount () {
    clearInterval(this.intervalID)
    window.removeEventListener('resize', this.updateCanvasSize.bind(this))
  }

  render () {
    return (
      <canvas ref={(c) => { this.canvas = c }} style={{width: '100%', height: '100%', backgroundColor: colors['base2']}} />
    )
  }
}

CanvasIncrementalText.defaultProps = {
  fontSize: 16,
  fontFamily: `"Source Code Pro", monospace`,
  charInterval: 40,
  textStartPos: {
    x: 20,
    y: 30
  },
  highlightingLanguage: 'javascript',
  centerText: false
}

CanvasIncrementalText.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  fontFamily: PropTypes.string,
  charInterval: PropTypes.number,
  textStartPos: PropTypes.object,
  highlightingLanguage: PropTypes.string,
  onRestart: PropTypes.func,
  onComplete: PropTypes.func,
  centerText: PropTypes.bool
}

export default CanvasIncrementalText
