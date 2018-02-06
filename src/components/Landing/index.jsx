import React from 'react'
import PropTypes from 'prop-types'

const styleSize = {
  width: '100%',
  height: '50vh'
}

const style = {
  ...styleSize,
  backgroundColor: '#111'
}

const Star = function (x, y, z) {
  return {
    x: x,
    y: y,
    z: 5 * z,
    speed: {
      x: 50 * z * Math.random(),
      y: 50 * z * Math.random()
    },
    draw: function (ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.z, 0, 2 * Math.PI)
      ctx.fillStyle = '#fff'
      ctx.fill()
    },
    update: function (dt = 0.01) {
      this.x += this.speed.x * dt
      this.y += this.speed.y * dt
    }
  }
}

class Landing extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      seed: 0,
      stars: Array(props.amountOfStars).fill()
    }
  }

  componentDidMount () {
    this.ctx = this.canvas.getContext('2d')

    this.canvas.width = this.canvas.offsetWidth
    this.canvas.height = this.canvas.offsetHeight

    window.addEventListener('resize', () => {
      this.canvas.width = this.canvas.offsetWidth
      this.canvas.height = this.canvas.offsetHeight
    })

    this.setState((prevState) => ({
      ...prevState,
      stars: prevState.stars.map(_ => Star(this.canvas.width * Math.random(), this.canvas.height * Math.random(), Math.random()))
    }))

    this.animationID = window.requestAnimationFrame(this.updateCanvas.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('resize')
    window.cancelAnimationFrame(this.animationID)
  }

  updateCanvas (ctx) {
    this.ctx.fillStyle = '#000'
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.state.stars.forEach(star => {
      star.update()
      star.draw(this.ctx)
    })

    this.animationID = window.requestAnimationFrame(this.updateCanvas.bind(this))
  }

  render () {
    return (
      <div style={style}>
        <canvas ref={(c) => { this.canvas = c }} style={styleSize} />
      </div>
    )
  }
}

Landing.propTypes = {
  amountOfStars: PropTypes.number.isRequired
}

export default Landing
