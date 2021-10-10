import Node from './Node.js';

export default class DrawableNode extends Node {
    constructor(element) {
        super(element);
        this.canvasPos = {
            x: 0,
            y: 0
        };
        this.radius = 0;
        this.isSelected = false;
    }
    isInPosition(x, y) {
        const canvasX = this.canvasPos.x;
        const canvasY = this.canvasPos.y;
        return isInRange(canvasX - this.radius, x, canvasX + this.radius) && isInRange(canvasY - this.radius, y, canvasY + this.radius);
    }
    changeSelectStatus() {
        this.isSelected = !this.isSelected;
    }
}
function isInRange(min, num, max) {
    return num >= min && num <= max;
}