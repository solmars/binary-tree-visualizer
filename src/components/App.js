import Header from './Header';
import Content from './Content';

import Footer from './Footer';
import DrawableAvlTree from '../models/DrawableAvlTree';
import React from 'react';

export const AVLContext = React.createContext();

function App() {
  const avl = new DrawableAvlTree();
  return (
    <div className="App">
      <AVLContext.Provider value={avl}>
        <Header/>
        <Content />
        <Footer />
      </AVLContext.Provider>

    </div>
  );
}

export default App;
