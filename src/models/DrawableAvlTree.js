//import Node from './Node.js';
import AvlTree from './AvlTree.js';


export default class DrawableAvlTree extends AvlTree {

    constructor(nodeRadius = 20) {
        super();
        this.heightIncrease = 0;
        this.nodeRadius = nodeRadius;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
    }

    draw(ctx) {
        if (this.root === null) {
            return;
        }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const treeHeight = this.height() + 1;
        this.heightIncrease = ctx.canvas.height / (treeHeight - 1);

        // ctx.canvas.width = this.nodeRadius * 2 * Math.pow(2, treeHeight);
        // ctx.canvas.height = "" + this.heightIncrease * treeHeight;
        // this.canvasWidth = ctx.canvas.width;
        // this.canvasHeight = ctx.canvas.height;


        // this.canvasWidth = ctx.canvas.width;
        // this.canvasHeight = ctx.canvas.height;
        // ctx.canvas.width = this.nodeRadius * 2 * Math.pow(2, treeHeight);
        // ctx.canvas.height = "" + this.heightIncrease * treeHeight;

        ctx.canvas.style.width = "" + this.nodeRadius * 2 * Math.pow(2, treeHeight);
        ctx.canvas.style.height = "" + this.heightIncrease * treeHeight;
        this.canvasWidth = ctx.canvas.width;
        this.canvasHeight = ctx.canvas.height;



        // this.canvasWidth = ctx.canvas.width;
        // this.canvasHeight = ctx.canvas.height;
        // ctx.canvas.style.width = "" + this.nodeRadius * 2 * Math.pow(2, treeHeight);
        // ctx.canvas.style.height = "" + this.heightIncrease * treeHeight;




        this.drawTree(this.root, ctx, this.canvasWidth / 2, this.canvasHeight - this.canvasHeight + 20, 0);
    }
    getPosition(level, x, y, isLeft = false) {
        return {
            x: isLeft ? x - ((this.canvasWidth / 2 / Math.pow(2, level))) : x + ((this.canvasWidth / 2 / Math.pow(2, level))),
            y: y + this.heightIncrease
        }
    }

    drawTree(node, ctx, x, y, level) {
        ctx.font = '15px Arial';
        ctx.beginPath();
        ctx.arc(x, y, this.nodeRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.strokeText(node.element, x - 10, y + 5);
        level++;
        if (node.left !== null) {
            let newPos = this.getPosition(level, x, y, true);
            let newX = newPos.x;
            let newY = newPos.y;
            this.strokeLine(ctx, x, y, newX, newY);
            this.drawTree(node.left, ctx, newX, newY, level);
        }
        if (node.right !== null) {
            let newPos = this.getPosition(level, x, y);
            let newX = newPos.x;
            let newY = newPos.y;
            this.strokeLine(ctx, x, y, newX, newY);
            this.drawTree(node.right, ctx, newX, newY, level);
        }
    }
    strokeLine(ctx, initialX, initialY, finalX, finalY) {
        ctx.beginPath();
        ctx.moveTo(initialX, initialY + this.nodeRadius);
        ctx.lineTo(finalX, finalY - this.nodeRadius)
        ctx.stroke();
    }
}