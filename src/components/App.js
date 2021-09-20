import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import BinaryTree from '../models/BinaryTree';

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
  bst.insert(4);
  bst.insert(3);
  bst.insert(6);
  bst.insert(2);

  console.log(bst);
  console.log(bst.height());
}
export default App;
