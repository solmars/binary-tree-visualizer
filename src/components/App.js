import Header from './Header';
import Content from './Content';

import Footer from './Footer';
import DrawableAvlTree from '../models/DrawableAvlTree';
import React from 'react';

export const AVLContext = React.createContext();

function App() {
  const avl = new DrawableAvlTree();
  const canvasRef = React.useRef(null);

  return (
    <div className="App">
      <AVLContext.Provider value={avl}>
        <Header ref = {canvasRef}/>
        <Content ref = {canvasRef}/>
        <Footer />
      </AVLContext.Provider>

    </div>
  );
}

export default App;
