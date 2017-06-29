import Node from "../lib/node";
import HashNodeService from "../index";

import { BinarySearchTree as BST, ValueNode } from "../lib/bst";

function testNormal() {
  const hashNodeService = new HashNodeService();
  const node1 = new Node("host1", "192.168.2.1");
  hashNodeService.addNode(node1);

  const node2 = new Node("host2", "192.168.2.2");  
  console.log(hashNodeService.lookupNode("host1"));
  hashNodeService.addNode(node2);
  console.log(hashNodeService.lookupNode("host1"));
}

testNormal();
const s1 = new Node("server1", "192.168.2.1");
const s2 = new Node("server2", "192.168.2.1");
const s3 = new Node("server3", "192.168.2.1");

const v3 = new ValueNode(8, s3);
const v2 = new ValueNode(4, s2);
const v1 = new ValueNode(1, s1);

const bst = new BST<number>();
bst.insert(v1);
bst.insert(v2);
bst.insert(v3);

// console.log(bst.preorder());
console.log(bst.find(5));