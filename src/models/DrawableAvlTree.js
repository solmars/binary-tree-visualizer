//import Node from './Node.js';
import AvlTree from './AvlTree.js';
import * as configs from './Config.js';

export default class DrawableAvlTree extends AvlTree {

    constructor(nodeRadius = configs.getCanvasNodeRadius()) {
        super();
        this.heightIncrease = 0;
        this.nodeRadius = nodeRadius;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
    }
    drawScaled(context, scale, translatePos) {

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        context.save();
        context.translate(translatePos.x, translatePos.y);
        context.scale(scale, scale);
        context.beginPath(); // begin custom shape
        this.draw(context);
        context.closePath(); // complete custom shape
        context.stroke();
        context.restore();
    }
    draw(ctx) {
        if (this.root === null) {
            return;
        }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const treeHeight = this.height() + 1;

        const ratio = ctx.canvas.width / ctx.canvas.height;
        const settleCanvasWidth = (treeHeight) => {
            const shouldBe = this.nodeRadius * 2 * Math.pow(2, treeHeight - 1);
            return shouldBe < configs.getCanvasMaximumWidth() ? shouldBe : configs.getCanvasMaximumWidth();
        }
        const settleCanvasHeight = (width, ratio) => {
            const shouldBe = width / ratio;
            return shouldBe < configs.getCanvasMaximumHeight()
                ? shouldBe
                : configs.getCanvasMaximumHeight();
        }

        ctx.canvas.width = settleCanvasWidth(treeHeight);  // calculate this better and its fine
        ctx.canvas.height = settleCanvasHeight(ctx.canvas.width, ratio);
        this.canvasWidth = ctx.canvas.width;
        this.canvasHeight = ctx.canvas.height;
        this.heightIncrease = Math.floor(ctx.canvas.height / (treeHeight - 1));

        this.drawTree(this.root, ctx, this.canvasWidth / 2, this.canvasHeight - this.canvasHeight + 20, 0);
    }
    getPosition(level, x, y, isLeft = false) {
        return {
            x: isLeft ? x - ((this.canvasWidth / 2 / Math.pow(2, level))) : x + ((this.canvasWidth / 2 / Math.pow(2, level))),
            y: y + this.heightIncrease
        }
    }

    drawTree(node, ctx, x, y, level) {
        ctx.font = configs.getCanvasDrawFont();
        node.canvasPos.x = x;
        node.canvasPos.y = y;
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
            strokeLine(ctx, x, y, newX, newY);
            this.drawTree(node.left, ctx, newX, newY, level);
        }
        if (node.right !== null) {
            let newPos = this.getPosition(level, x, y);
            let newX = newPos.x;
            let newY = newPos.y;
            strokeLine(ctx, x, y, newX, newY);
            this.drawTree(node.right, ctx, newX, newY, level);
        }
    }
}
function strokeLine(ctx, initialX, initialY, finalX, finalY,radius=configs.getCanvasNodeRadius()) {
    ctx.beginPath();
    ctx.moveTo(initialX, initialY + radius);
    ctx.lineTo(finalX, finalY - radius)
    ctx.stroke();
}
