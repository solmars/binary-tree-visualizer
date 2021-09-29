import Node from './Node.js';
import BinarySearchTree from './BinarySearchTree.js';


export default class AVLTree extends BinarySearchTree {
    balanceFactor(node) {

        let lHeight = 0;
        let rHeight = 0;

        if (node.left !== null) {
            lHeight = this.height(node.left);
        }
        if (node.right !== null) {
            rHeight = this.height(node.right);
        }
        return rHeight - lHeight;
    }

    rightRotation(node) {

        let leftNode = node.left;
        node.left = leftNode.right;
        leftNode.right = node;
        return leftNode;
    }

    leftRotation(node) {

        let rightNode = node.right;
        node.right = rightNode.left;
        rightNode.left = node;
        return rightNode;
    }

    twoRotations(node) {

        if (this.balanceFactor(node) < 0) {
            node.left = this.leftRotation(node.left);
            node = this.rightRotation(node);
        } else {
            node.right = this.rightRotation(node.right);
            node = this.leftRotation(node);
        }
        return node;
    }

    balanceNode(node) {

        let bf = this.balanceFactor(node);
        if (node.left !== null && bf < -1) {
            let lBF = this.balanceFactor(node.left);
            if (bf * lBF < 0) {
                return this.twoRotations(node);
            }
            return this.rightRotation(node);
        }
        if (node.right !== null && bf > 1) {
            let rBF = this.balanceFactor(node.right);
            if (bf * rBF < 0) {
                return this.twoRotations(node);
            }
            return this.leftRotation(node);
        }
        return node;

    }

    insert(element) {
        this.root = this.insertNode(element, this.root);
    }

    insertNode(element, node) {
        if (node === null) {
            return new Node(element);
        }
        if (node.element !== element) {
            if (element > node.element) {

                node.right = this.insertNode(element, node.right);
                node = this.balanceNode(node);
            }
            if (element < node.element) {
                node.left = this.insertNode(element, node.left);
                node = this.balanceNode(node);
            }
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
        if (node.element === element) {
            if (node.left == null && node.right == null) {
                return null;
            }
            if (node.left == null) {
                return node.right;
            }
            if (node.right == null) {
                return node.left;
            }
            let smallElem = this.smallestElement(node.right);
            node.element = smallElem;
            node.right = this.removeNode(smallElem, node.right);
            node = this.balanceNode(node);
        } else if (node.element > element) {
            node.left = this.removeNode(element, node.left);
            node = this.balanceNode(node);
        } else {
            node.right = this.removeNode(element, node.right);
            node = this.balanceNode(node);
        }
        return node;
    }

}