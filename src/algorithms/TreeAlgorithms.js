export function treeDiameterPaths(root) {
    const possibleNodes = [];
    const maxDistance = treeDiameterPossibleNodes(root, possibleNodes);
    const mostDistantPairs = [];
    for ( let i = 0; i < possibleNodes.length; i++) {
        let n1 = possibleNodes[i].element;
        for (let j = i + 1; j < possibleNodes.length; j++) {
            let n2 = possibleNodes[j].element;

            let lowestComAnc = lowestCommonAncestor(root, n1, n2);

            let distance = findDistance(lowestComAnc, n1, n2);
            if (distance === maxDistance ){
                let path1 = pathToNode(lowestComAnc,n1); // remove lca
                path1.shift();
                path1.reverse();    
                let path2 = pathToNode(lowestComAnc,n2);
                const path = [...path1,...path2];
                mostDistantPairs.push({startNode : possibleNodes[i], path: path,endNode: possibleNodes[j]});
            }

        }
    }
    return mostDistantPairs;
}
function treeDiameterPossibleNodes(node, arr) {
    if (node == null) {
        return -1;
    }
    let lHeight = calculateHeight(node.left);
    let rHeight = calculateHeight(node.left);
    let lDiameter = treeDiameterPossibleNodes(node.left, arr);
    let rDiameter = treeDiameterPossibleNodes(node.right, arr);
    // if 0, it is one of the furthest childs and it is possible that it is a part of a furthest path 
    if (Math.max(lHeight + rHeight,
        Math.max(lDiameter, rDiameter)) === 0) {
        arr.push(node);
    }
    // max se passar pela root lHeight + rHeight
    // max se não passar pela root Math.max(lDiameter, rDiameter)
    return Math.max(lHeight + rHeight,
        Math.max(lDiameter, rDiameter));
}
function calculateHeight(node) {
    if (node === null) {
        return 0;
    }
    let lHeight = calculateHeight(node.left);
    let rHeight = calculateHeight(node.right);


    return lHeight > rHeight ? lHeight + 1 : rHeight + 1;
}
function lowestCommonAncestor(node,  n1,  n2) {
    if (node == null) {
        return node;
    }
    if (node.element === n1 ||node.element === n2 ) {
        return node;
    }

    let left = lowestCommonAncestor(node.left, n1, n2);
    let right = lowestCommonAncestor(node.right, n1, n2);

    if (left !== null && right !== null) {
        return node;
    }
    if (left === null && right === null) {
        return null;
    }
    if (left != null) {
        return lowestCommonAncestor(node.left, n1, n2);
    } else {
        return lowestCommonAncestor(node.right, n1, n2);
    }
}

function findDistance(lowestComAnc, n1, n2) {
    return findLevel(lowestComAnc, n1, 0) + findLevel(lowestComAnc, n2, 0);
}
function findLevel( root,  a, level) {
    if (root == null) {
        return -1;
    }

    if (root.element === a) {
        return level;
    }
    let left = findLevel(root.left, a, level + 1);
    if (left === -1) {
        return findLevel(root.right, a, level + 1);
    }
    return left;
}
function pathToNode(node,element,path=[]) {
    if (node === null) {
        return null;
    }
    if (element === node.element) {
        return path;
    }
    path.push(node);

    if (node.element > element) {
        return pathToNode(node.left,element,path);
    }
    else {
        return pathToNode(node.right,element,path);
    }
}
export function searchNodesBetween(min, max, avl) {
    const pathNodes = [];
    searchNodesHelper(min, max, avl.root, pathNodes);
    return pathNodes;
}
function searchNodesHelper(min, max, node, pathNodes = []) {
    if (node === null) {
        return;
    }
    if (min < node.element && node.element < max) {
        pathNodes.push(node);
    }
    if (node.element <= max) {
        searchNodesHelper(min, max, node.right, pathNodes);
    }
    if (node.element >= min) {
        searchNodesHelper(min, max, node.left, pathNodes);
    }
}



export function findNode(elementToFind, node, pathNodes = []) {
    if (node === null) {
        return null;
    }
    pathNodes.push(node);

    if (elementToFind === node.element) {
        return pathNodes;
    }
    if (node.element > elementToFind) {
        return findNode(elementToFind, node.left, pathNodes);
    }
    else {
        return findNode(elementToFind, node.right, pathNodes);
    }
}