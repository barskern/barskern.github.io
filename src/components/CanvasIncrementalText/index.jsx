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

const drawToken = (ctx, charsLeft, parentType = 'default') => token => {
  if (Array.isArray(token.content)) {
    let index = 0
    do {
      charsLeft = drawToken(ctx, charsLeft, token.type || parentType)(token.content[index++])
    } while (charsLeft > 0 && index < token.content.length)
    return charsLeft
  }
  const text = token.content || token
  const type = token.type || parentType

  ctx.fillStyle = highlightingColors[type || 'default'] || highlightingColors['default']
  const textToDraw = text.length < charsLeft ? text : text.slice(0, charsLeft)
  ctx.fillText(textToDraw, 0, 0)
  ctx.translate(ctx.measureText(textToDraw).width, 0)
  return Math.max(charsLeft - text.length, 0)
}

class CanvasIncrementalText extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      intervalID: 0,
      tokenlines: [],
      textIndex: props.startAtTextIndex,
      textStartPos: props.textStartPos
    }
  }

  startTextInterval () {
    const { charInterval } = this.props
    this.setState((prevState, props) => {
      const { text, highlightingLanguage } = props
      return {
        ...prevState,
        tokenlines: text
          .split('\n')
          .map(line => Prism.tokenize(line, Prism.languages[highlightingLanguage]))
      }
    }, () => {
      const intervalID = setInterval(this.update.bind(this), charInterval)
      this.setState({ intervalID: intervalID })
    })
  }

  update () {
    const { onComplete } = this.props
    this.setState(
      (prevState, props) => {
        if (prevState.textIndex >= props.text.length) {
          clearInterval(this.state.intervalID)
          if (typeof onComplete === 'function') onComplete()
          return { ...prevState }
        } else {
          return {
            ...prevState,
            textIndex: prevState.textIndex + 1
          }
        }
      })
  }

  drawCanvas () {
    const ctx = this.canvas.getContext('2d')
    const { fontSize, fontFamily } = this.props
    const { textStartPos, tokenlines, textIndex } = this.state

    let charsLeft = textIndex

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.save()
    ctx.font = `${fontSize}px ${fontFamily}`
    ctx.translate(textStartPos.x, textStartPos.y)

    tokenlines.forEach((tokens, lineNumber) => {
      ctx.save()
      let index = 0
      do {
        charsLeft = drawToken(ctx, charsLeft)(tokens[index++])
      } while (charsLeft > 0 && index < tokens.length)
      ctx.restore()
      ctx.translate(0, fontSize)
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
    window.requestAnimationFrame(this.drawCanvas.bind(this))
  }

  componentWillReceiveProps (nextProps) {
    const { onRestart } = nextProps
    // Start from scratch ONLY if the new text doesn't contain current text
    if (!nextProps.text.includes(this.props.text)) {
      this.setState((prevState, props) => {
        if (typeof onRestart === 'function') onRestart()
        return {
          ...prevState,
          textIndex: props.startAtTextIndex
        }
      }, () => {
        this.startTextInterval()
      })
    }
    this.updateCanvasSize()
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalID)
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
  centerText: false,
  startAtTextIndex: 0
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
  centerText: PropTypes.bool,
  startAtTextIndex: PropTypes.number
}

export default CanvasIncrementalText
