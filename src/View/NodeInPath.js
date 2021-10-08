export  class NodeInPath {
    constructor(node,type) {
        this.node = node;
        this.type = type;
    }
}
export const TYPES = {
    CURRENT: 'current',
    IN_PATH: 'in_path',
    SOURCE_OR_DESTINATION: 'sdst',
    NOT_YET_TRAVERSED: ''

};