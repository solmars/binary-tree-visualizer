import React, { useRef, useEffect, useContext } from 'react'
import { AVLContext } from './App.js';


export default function Canvas() {

  let avl = useContext(AVLContext);

  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const render = () => {
      avl.draw(context);
    }
    const handleResize = () => {
      var parent = canvas.parentNode,
        styles = getComputedStyle(parent),
        w = parseInt(styles.getPropertyValue("width")),
        h = parseInt(styles.getPropertyValue("height"));
      canvas.width = w;
      canvas.height = h;
      render();
    }
    handleResize();
    fillBinaryTree(avl);
    
    render();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [avl]);
  return <canvas ref={canvasRef} />
}
function fillBinaryTree(avl) {
  // it does double when outside of useEffect, why? print doesn't show it.
  for (let i = 0; i < 20; i++) {
    let random = parseInt(Math.random() * 1000);
    avl.insert(random);
  }
}

