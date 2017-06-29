import { assert } from "chai";
import { BinarySearchTree as BST, ValueNode } from "../lib/bst";
import Node from "../lib/node";
import HashNodeService from "../index";


describe("test hashnode service", function () {

  describe("test one node", function () {
    let hashNodeService : HashNodeService;
    let node = new Node("server1", "192.168.1.2");
    beforeEach(function () {
      hashNodeService = new HashNodeService();
      hashNodeService.addNode(node);
    });

    it("any query should return the only one node", function () {
      for(let i = 0; i < 10; i++) {
        assert.equal(node, hashNodeService.lookupNode(Math.random().toString().substr(2, 10)));
      }
    });
  });

  describe("test two nodes", function () {
    let hashNodeService : HashNodeService;
    let n1 = new Node("server1", "192.168.1.2");
    let n2 = new Node("server2", "192.168.1.2");
    
    beforeEach(function () {
      hashNodeService = new HashNodeService();
      hashNodeService.addNode(n1);
      hashNodeService.addNode(n2);
    });
  });
});