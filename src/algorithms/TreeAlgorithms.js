export function findNode(elementToFind, node,pathNodes=[]) {
    if (node === null) {
        return null;
    }
    pathNodes.push(node);

    if (elementToFind === node.element) {
        return pathNodes;
    }
    if (node.element > elementToFind) {
        return findNode(elementToFind, node.left,pathNodes);
    }
    else {
        return findNode(elementToFind, node.right,pathNodes);
    }
}