"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./lib/util");
const bst_1 = require("./lib/bst");
class HashNodeService {
    constructor() {
        this.nodeList = [];
        this.bst = new bst_1.BinarySearchTree();
    }
    addNode(node) {
        const k = util_1.hash(node.host);
        this.bst.insert(new bst_1.ValueNode(k, node));
        this.nodeList.push(node);
    }
    lookupNode(key) {
        const k = util_1.hash(key);
        const ret = this.bst.find(k);
        if (!ret)
            return null;
        return ret.value;
    }
    removeNode(node) {
        const idx = this.nodeList.indexOf(node);
        if (idx !== -1) {
            this.nodeList.splice(idx, 1);
        }
    }
}
exports.default = HashNodeService;
