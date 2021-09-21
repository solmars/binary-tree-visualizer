import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import BinaryTree from '../models/BinaryTree';
import AvlTree from '../models/AvlTree';

function App() {
  createBinaryTree();
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
function createBinaryTree() {
  const bst = new BinaryTree();
  bst.insert(5);
  const avl = new AvlTree();

  for(let i=0;i<100;i++) {
    let random = parseInt(Math.random() * 1000);
    avl.insert(random);
  }

  console.log(avl);
  console.log(avl.height());
  console.log(avl.find(2));
}
export default App;
