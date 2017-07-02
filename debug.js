"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./lib/node");
const index_1 = require("./index");
const bst_1 = require("./lib/bst");
function testNormal() {
    const hashNodeService = new index_1.default();
    const node1 = new node_1.default("host1", "192.168.2.1");
    hashNodeService.addNode(node1);
    const node2 = new node_1.default("host2", "192.168.2.2");
    console.log(hashNodeService.lookupNode("host1"));
    hashNodeService.addNode(node2);
    console.log(hashNodeService.lookupNode("host1"));
}
testNormal();
const s1 = new node_1.default("server1", "192.168.2.1");
const s2 = new node_1.default("server2", "192.168.2.1");
const s3 = new node_1.default("server3", "192.168.2.1");
const v3 = new bst_1.ValueNode(8, s3);
const v2 = new bst_1.ValueNode(4, s2);
const v1 = new bst_1.ValueNode(1, s1);
const bst = new bst_1.BinarySearchTree();
bst.insert(v1);
bst.insert(v2);
bst.insert(v3);
// console.log(bst.preorder());
console.log(bst.find(5));
