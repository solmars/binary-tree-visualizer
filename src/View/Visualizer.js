import * as configs from '../models/Config.js';
import * as algorithms from '../algorithms/TreeAlgorithms.js';
import { NodeInPath, TYPES } from './NodeInPath.js';
import Node from '../models/Node.js';
//Assumes node positions are set


export function visualizeTreeDiameterPaths(avl, ctx, speed) {
    const pathObjects = algorithms.treeDiameterPaths(avl.root);
    const visualizePaths = (i) => {
        if (i >= pathObjects.length) return;
        let pathNodes = [];
        pathObjects[i].path.forEach(node => {
            pathNodes.push(new NodeInPath(node, TYPES.IN_PATH));
        });
        animatePath(avl, ctx, pathNodes, 1, speed, [], [new NodeInPath(pathObjects[i].startNode, TYPES.SOURCE_OR_DESTINATION), new NodeInPath(pathObjects[i].endNode, TYPES.SOURCE_OR_DESTINATION)]);
        // make it go very fast if user isn't trying to analyze it
        setTimeout(function() {visualizePaths(++i)}, speed * pathObjects[i].path.length + (speed > 150 ? 1000 : 50));
    }
    visualizePaths(0);
}
export function visualizeAllBetweenChosenNodes(avl, ctx, speed) {
    if (avl.selectedNodes.length < 2) {
        return;
    }
    let minNode = new Node(Number.MAX_VALUE);
    let maxNode = new Node(Number.MIN_VALUE);
    // find min and max from set of nodes
    avl.selectedNodes.forEach(node => {
        if (minNode.element > node.element) {
            minNode = node;
        }
        if (maxNode.element < node.element) {
            maxNode = node;
        }
    });
    const nodesBetween = algorithms.searchNodesBetween(minNode.element, maxNode.element, avl);
    const pathNodes = [];
    nodesBetween.forEach(node => {
        pathNodes.push(new NodeInPath(node, TYPES.IN_PATH));
    });
    animatePath(avl, ctx, pathNodes, 1, speed, [], [new NodeInPath(minNode, TYPES.SOURCE_OR_DESTINATION), new NodeInPath(maxNode, TYPES.SOURCE_OR_DESTINATION)]);
}

export function visualizeFind(avl, ctx, elementToFind, speed) {
    if (avl.root === null) {
        return null;
    }
    const pathNodes = algorithms.findNode(elementToFind, avl.root);
    const pathNodesInPath = [];
    pathNodesInPath.push(new NodeInPath(pathNodes[0], TYPES.SOURCE_OR_DESTINATION));
    for (let i = 1; i < pathNodes.length - 1; i++) {
        pathNodesInPath.push(new NodeInPath(pathNodes[i], TYPES.IN_PATH));
    }
    pathNodesInPath.push(new NodeInPath(pathNodes[pathNodes.length - 1], TYPES.SOURCE_OR_DESTINATION));

    animatePath(avl, ctx, pathNodesInPath, 1, speed);

}
function animatePath(avl, ctx, pathNodes, current, speed, oneByOneArray = [], appendableNodes = []) {
    if (current > pathNodes.length) {
        return;
    }
    if (current < pathNodes.length && current !== 1) {
        pathNodes[current - 1].type = TYPES.CURRENT;
    }
    if (current > 2) { // no longer the current one
        pathNodes[current - 2].type = TYPES.IN_PATH;
    }
    for (let i = oneByOneArray.length; i < current; i++) {
        oneByOneArray.push(pathNodes[i]);
    }
    visualizePath(avl, ctx, [...oneByOneArray, ...appendableNodes]);
    setTimeout(function () {
        animatePath(avl, ctx, pathNodes, ++current, speed, oneByOneArray, appendableNodes);
    }, speed[0]);

}
function visualizePath(avl, ctx, pathNodes = []) {
    if (pathNodes.length === 0) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    visualize(avl.root, ctx, Math.floor(ctx.canvas.width / 2), ctx.canvas.height - ctx.canvas.height + configs.getCanvasNodeRadius(), pathNodes);
}
function visualize(node, ctx, x, y, pathNodes) {
    ctx.font = configs.getCanvasDrawFont();
    ctx.beginPath();
    ctx.arc(x, y, configs.getCanvasNodeRadius(), 0, 2 * Math.PI);
    ctx.stroke();
    fillNodeCircle(ctx, node, pathNodes);
    ctx.closePath();
    ctx.textAlign = "center";
    ctx.strokeText(node.element, x, y + 5);
    if (node.left !== null) {
        let newX = node.left.canvasPos.x;
        let newY = node.left.canvasPos.y;
        strokeLine(ctx, x, y, newX, newY);
        visualize(node.left, ctx, newX, newY, pathNodes);
    }
    if (node.right !== null) {
        let newX = node.right.canvasPos.x;
        let newY = node.right.canvasPos.y;
        strokeLine(ctx, x, y, newX, newY);
        visualize(node.right, ctx, newX, newY, pathNodes);
    }
}
function findNodeInPathWithNode(node, pathNodes) {
    for (let i = 0; i < pathNodes.length; i++) {
        if (pathNodes[i].node === node) {
            return pathNodes[i];
        }
    }
    return null;
}
function fillNodeCircle(ctx, currNode, pathNodes) {
    const nodeInPath = findNodeInPathWithNode(currNode, pathNodes);
    if (nodeInPath === null) {
        return;
    }
    if (nodeInPath.type === TYPES.SOURCE_OR_DESTINATION) {
        ctx.fillStyle = configs.getCanvasNodeSelectedColor();
        ctx.fill();
    }
    else if (nodeInPath.type === TYPES.IN_PATH) {
        ctx.fillStyle = configs.getPathNodeColor();
        ctx.fill();
    }
    else if (nodeInPath.type === TYPES.CURRENT) {
        ctx.fillStyle = configs.getPathCurrentNodeColor();
        ctx.fill();
    }
}
function strokeLine(ctx, initialX, initialY, finalX, finalY, radius = configs.getCanvasNodeRadius()) {
    ctx.beginPath();
    ctx.moveTo(initialX, initialY + radius);
    ctx.lineTo(finalX, finalY - radius)
    ctx.stroke();
}