import Node from './Node.js';

//Note: this is a minimalistic implementation of a BST

export default class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(element) {
        if (!element) {
            return;
        }
        if (this.root == null) {
            this.root = new Node(element);
            return;
        }
        this.insertNode(new Node(element), this.root);

    }
    insertNode(newNode, node) {
        if (newNode.element < node.element) {
            if (node.left === null) {
                node.left = newNode;
                return node.left;
            }
            return this.insertNode(newNode, node.left);
        } else if (newNode.element > node.element) {
            if (node.right === null) {
                node.right = newNode;
                return node.right;
            }
            return this.insertNode(newNode, node.right);
        }
        return node;
    }
    remove(element) {
        this.root = this.removeNode(element, this.root);
    }

    removeNode(element, node) {

        if (node === null) {
            return null; 
        }

        if (element ===  node.element) {
            if (node.left === null && node.right == null) { //leaf
                return null;
            }
            if (node.left == null) {   // only right child
                return node.right;
            }
            if (node.right == null) {  // only left child
                return node.left;
            }
            let min = this.smallestElement(node.right);
            node.element = min;
            node.right = this.removeNode(min, node.right);
        } else if (element  < node.element) {
            node.left = this.removeNode(element, node.left);
        } else {
            node.right = this.removeNode(element, node.right);
        }
        return node;
    }
    smallestElement() {
        if (this.root === null) {
            return null;
        }
        let node = this.root;
        while (node.left != null) {
            node = node.left;
        }
        return node.element;
    }
    height() {
        if (this.root === null) {
            return -1;
        }
        return this.calculateHeight(this.root);
    }
    calculateHeight(node) {
        if (node === null) {
            return 0;
        }
        let lHeight = this.calculateHeight(node.left);
        let rHeight = this.calculateHeight(node.right);


        return lHeight > rHeight ? lHeight + 1 : rHeight + 1;
    }

    find(elementToFind) {
        if (this.root === null) {
            return null;
        }
        return this.findNode(elementToFind, this.root);

    }
    findNode(elementToFind, node) {
        if (node === null) {
            return "couldn't find specified node";
        }
        if (elementToFind === node.element) {
            return node;
        }
        if (node.element > elementToFind) {
            return this.findNode(elementToFind, node.left);
        }
        else {
            return this.findNode(elementToFind, node.right);
        }
    }
    inOrder() {
       let snapshot = [];
        if (this.root != null) {
            this.inOrderSubtree(this.root, snapshot);   // fill the snapshot recursively
        }
        return snapshot;
    }
    inOrderSubtree(node, snapshot) {
        if (node === null) {
            return;
        }
        this.inOrderSubtree(node.left, snapshot);
        snapshot.push(node.element);
        this.inOrderSubtree(node.right, snapshot);
    }
}
