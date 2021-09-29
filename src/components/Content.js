import Canvas from './Canvas.js';
import DrawableAvlTree from '../models/DrawableAvlTree';

export default function Content() {
    const bst = createBinaryTree();
    const draw = (ctx) => {

        bst.draw(ctx);
      }
    
    return (<main>
        <Canvas draw= {draw}/>
    </main>);
}
function createBinaryTree() {
    
    const avl = new DrawableAvlTree();
  
    for(let i=0;i<32;i++) {
      let random = parseInt(Math.random() * 1000);
      avl.insert(random);
    }
    return avl;
}
