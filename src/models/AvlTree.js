import Node from './Node.js';
import BinarySearchTree from './BinarySearchTree.js';


export default class AVLTree extends BinarySearchTree {


    updateHeight(node) {
        node.level = 1 + Math.max(this.nodeHeight(node.left), this.nodeHeight(node.right));
    }

    nodeHeight(node) {
        return node == null ? -1 : node.level;
    }
    balanceFactor(node) {
        return node == null ? 0 : this.nodeHeight(node.right) - this.nodeHeight(node.left);
    }

    rightRotation(node) {

        let leftNode = node.left;
        let rightLeftNode = leftNode.right;
        leftNode.right = node;
        node.left = rightLeftNode;
        this.updateHeight(node);
        this.updateHeight(leftNode);

        return leftNode;
    }

    leftRotation(node) {

        let rightNode = node.right;
        let leftRightNode = rightNode.left;
        rightNode.left = node;
        node.right = leftRightNode;
        this.updateHeight(node);
        this.updateHeight(rightNode);

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
        this.updateHeight(node);
        let bf = this.balanceFactor(node);
        if (bf > 1) {
            if (this.nodeHeight(node.right.right) > this.nodeHeight(node.right.left)) {
                node = this.leftRotation(node);
            } else {
                node.right = this.rightRotation(node.right);
                node = this.leftRotation(node);
            }
        }
        else if (bf < -1) {
            if (this.nodeHeight(node.left.left) > this.nodeHeight(node.left.right))
                node = this.rightRotation(node);
            else {
                node.left = this.leftRotation(node.left);
                node = this.rightRotation(node);
            }

        }
        return node;

    }

    insert(element) {
        this.root = this.insertNode(element, this.root);
    }

    insertNode(element, node) {
        if (node === null) {
            return new Node(element);
        } else if (node.element > element) {
            node.left = this.insertNode(element, node.left);
        } else if (node.element < element) {
            node.right = this.insertNode(element, node.right);
        }
        return this.balanceNode(node);
    }

    obtainRandomNodeElement() {

        return this.inOrder()[parseInt(Math.random() * this.size())];
    }

    remove(element) {
        this.removeNode(element, this.root);
    }

    removeNode(element, node) {
        if (node === null) {
            return null;
        }
        else if (node.element > element) {
            node.left = this.removeNode(element, node.left);
        } else if (node.element < element) {
            node.right = this.removeNode(element, node.right);
        }
        else {
            if (node.left == null || node.right == null) {
                node = (node.left == null) ? node.right : node.left;

            } else {
                let smallElem = this.smallestElementOfSubtree(node.right);
                node.element = smallElem;
                node.right = this.removeNode(smallElem, node.right);
            }
        }
        if (node != null) {
            node = this.balanceNode(node);
        }
        return node;
    }

}