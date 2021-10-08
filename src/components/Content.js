import Canvas from './Canvas.js';
import React from 'react';


const  Content = React.forwardRef((props, canvasRef) =>{
  return (<main>
    <Canvas ref={canvasRef} />
  </main>);
});

export default Content;