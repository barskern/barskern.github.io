import React from 'react'
import PropTypes from 'prop-types'

import SnowflakeSRC from './snowflake.svg'
import BackgroundSRC from './dark_winter_sky.jpg'

const styleSize = {
  position: 'relative',
  width: '100%',
  height: '50vh'
}

const style = {
  ...styleSize,
  backgroundColor: '#111',
  background: `url(${BackgroundSRC})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center top',
  backgroundAttachment: 'fixed',
  backgroundSize: 'auto 70%'
}

const POINT_DEPTH_BIGGEST = 30
const POINT_DEPTH_SMALLEST = 10
const POINT_MAX_SPEED = 110
const POINT_MIN_SPEED = 20
const POINT_EDGE_THRESHOLD = 10

const isPointInBound = (pos, maxWidth, maxHeight, threshold = 1, minWidth = 0, minHeight = 0) =>
  !((pos.x > maxWidth + threshold || pos.x < minWidth - threshold) || (pos.y > maxHeight + threshold || pos.y < minHeight - threshold))

const movePoint = (point, dt, dir = { x: 0.2, y: 1 }) => ({
  x: point.x + (((POINT_MAX_SPEED * point.z * point.z * dir.x) + POINT_MIN_SPEED) * dt),
  y: point.y + (((POINT_MAX_SPEED * point.z * point.z * dir.y) + POINT_MIN_SPEED) * dt),
  z: point.z
})

const drawSnowflake = (point, ctx, snowflake) => {
  const size = (POINT_DEPTH_BIGGEST * point.z) + POINT_DEPTH_SMALLEST
  ctx.save()
  ctx.translate(point.x, point.y)
  ctx.drawImage(snowflake, 0, 0, size, size)
  ctx.restore()
}

const getEdgeCoord2D = (l, minX, maxX, minY, maxY) => {
  const cut = (l, min, max) =>
    (l <= 0.5)
      ? Math.max(min, (4 * (max - min) * l) - max + (2 * min))
      : Math.min(max, (-4 * (max - min) * l) + (4 * max) - (5 * min))
  return {
    x: cut(l, minX, maxX),
    y: cut(1 - l, minY, maxY)
  }
}

class SnowflakesLanding extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      points: []
    }
  }

  componentDidMount () {
    this.lastUpdateTime = Date.now()

    this.snowflakeIMG = new window.Image()
    this.snowflakeIMG.src = SnowflakeSRC
    this.snowflakeIMG.onload = this.startCanvas.bind(this)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateCanvasSize)
    window.cancelAnimationFrame(this.animationID)
  }

  startCanvas () {
    this.ctx = this.canvas.getContext('2d')

    this.updateCanvasSize = () => {
      this.canvas.width = this.canvas.offsetWidth
      this.canvas.height = this.canvas.offsetHeight
    }

    this.updateCanvasSize()
    window.addEventListener('resize', this.updateCanvasSize)

    this.setState(
      (prevState, props) => ({
        ...prevState,
        points: Array(props.amountOfPoints).fill(0).map(_ =>
          ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            z: Math.pow(Math.random(), 2)
          })
        )
      })
      ,
      () => {
        this.animationID = window.requestAnimationFrame(this.updateCanvas.bind(this))
      }
    )
  }

  updateCanvas () {
    const currentTime = Date.now()
    const delta = currentTime - this.lastUpdateTime
    this.lastUpdateTime = currentTime

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.state.points.forEach(point => {
      drawSnowflake(point, this.ctx, this.snowflakeIMG)
    })

    this.animationID = window.requestAnimationFrame(this.updatePoints.bind(this, delta / 1000.0))
  }

  updatePoints (dt) {
    this.setState(
      (prevState) => ({
        ...prevState,
        points: prevState.points.map(point =>
          isPointInBound(
            point,
            this.canvas.width,
            this.canvas.height,
            POINT_DEPTH_BIGGEST + POINT_EDGE_THRESHOLD
          )
            ? movePoint(point, dt)
            : {
              ...getEdgeCoord2D(Math.random(), -POINT_DEPTH_BIGGEST, this.canvas.width + POINT_DEPTH_BIGGEST, -POINT_DEPTH_BIGGEST, this.canvas.height + POINT_DEPTH_BIGGEST),
              z: Math.pow(Math.random(), 2)
            }
        )
      }),
      this.updateCanvas.bind(this)
    )
  }

  render () {
    return (
      <div style={style}>
        <canvas ref={(c) => { this.canvas = c }} style={styleSize} />
      </div>
    )
  }
}

SnowflakesLanding.propTypes = {
  amountOfPoints: PropTypes.number.isRequired
}

export default SnowflakesLanding
