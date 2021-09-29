import React, { useRef, useEffect } from 'react'

const Canvas = props => {

  const { draw, ...rest } = props
  const canvasRef = useRef(null)

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const render = () => {
      var parent = canvas.parentNode,
      styles = getComputedStyle(parent),
      w = parseInt(styles.getPropertyValue("width")),
      h = parseInt(styles.getPropertyValue("height"));

      canvas.width = w;
      canvas.height = h;

      draw(context)
      //animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    
  }, [draw])

  return <canvas ref={canvasRef} {...rest} />
}

export default Canvas
