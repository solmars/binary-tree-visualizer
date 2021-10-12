import React, { useEffect, useContext } from 'react'
import { AVLContext } from './App.js';


const Canvas = React.forwardRef((props, ref) => {
  let avl = useContext(AVLContext);
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext('2d');

    const render = () => {
      avl.draw(context);
    }

    const clickCanvasPos = (e) => {
      let rect = canvas.getBoundingClientRect();
      let actualWidth = rect.width - rect.x;
      let actualHeight = rect.height;
      let clickedX = e.clientX - rect.left;
      let clickedY = e.clientY - rect.top;
      let canvasPosX = clickedX * (canvas.width / actualWidth);
      let canvasPosY = clickedY * (canvas.height / actualHeight);
      const node = avl.getNodeInPosition(canvasPosX, canvasPosY, avl.root);
      if (node) {
        node.changeSelectStatus();
        if (node.isSelected) {
          avl.selectedNodes.push(node);
        }
        else {
          avl.selectedNodes = avl.selectedNodes.filter(dNode => dNode !== node);
        }
        render();
      }

    };
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
    canvas.addEventListener('click', clickCanvasPos);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', clickCanvasPos)
    }
  }, [avl, ref]);
  return <canvas ref={ref} />
});
function fillBinaryTree(avl) {
  // it does double when outside of useEffect, why? print doesn't show it.
  for (let i = 0; i < 20; i++) {
    let random = parseInt(Math.random() * 1000);
    avl.insert(random);
  }
}

export default Canvas;