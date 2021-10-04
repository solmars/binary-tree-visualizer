export default class Node {
    constructor(element) {
        this.element = element;
        this.left = null;
        this.right =null;
        this.level = 0;
        this.canvasPos = {
             x: 0,
             y: 0
        };
    }
}