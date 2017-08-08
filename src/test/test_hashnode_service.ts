import { assert } from "chai";
import { BinarySearchTree as BST, ValueNode } from "../lib/bst";
import Node from "../lib/node";
import HashNodeService from "../index";
import { hash } from "../lib/util";

describe("test hashnode service", function() {
  describe("test one node", function() {
    let hashNodeService: HashNodeService;
    let node = new Node("server1", "192.168.1.2");
    beforeEach(function() {
      hashNodeService = new HashNodeService();
      hashNodeService.addNode(node);
    });

    it("any query should return the only one node", function() {
      for (let i = 0; i < 10; i++) {
        assert.equal(
          node,
          hashNodeService.lookupNode(Math.random().toString().substr(2, 10))
        );
      }
    });
  });

  describe("test two nodes", function() {
    let hashNodeService: HashNodeService;
    let hash_n1 = hash("server1");
    let hash_n2 = hash("server2");
    let n1 = new Node("server1", "192.168.1.2");
    let n2 = new Node("server2", "192.168.1.2");
    if (hash_n1 > hash_n2) {
      [n1, n2] = [n2, n1];
    }

    beforeEach(function() {
      hashNodeService = new HashNodeService();
      hashNodeService.addNode(n1);
      hashNodeService.addNode(n2);
    });

    it("test basic functionality", function() {
      const key1 = "user1";
      const key2 = "user2";
      const hash_key1 = hash(key1);
      const hash_key2 = hash(key2);

      if (hash_key1 > hash_n1 && hash_key1 <= hash_n2) {
        assert.equal(n2, hashNodeService.lookupNode(key1));
      } else if (hash_key1 > hash_n1 && hash_key1 > hash_n2) {
        assert.equal(n1, hashNodeService.lookupNode(key1));
      }

    });

    it("#removeNode", function() {
      const key1 = "user1";
      const key2 = "user2";
      const hash_key1 = hash(key1);
      const hash_key2 = hash(key2);

      hashNodeService.removeNode(n2);
      assert.equal(n1, hashNodeService.lookupNode(key1));
      assert.equal(n1, hashNodeService.lookupNode(key2));

      hashNodeService.removeNode(n1);
      assert.equal(null, hashNodeService.lookupNode(key1));
      assert.equal(null, hashNodeService.lookupNode(key2));
    });
  });
});

describe("test hashnode service with virtual nodes", function() {
  describe("test one node", function() {
    let hashNodeService: HashNodeService;
    let node = new Node("server1", "192.168.1.2");
    beforeEach(function() {
      hashNodeService = new HashNodeService({ virtual_nodes: 4 });
      hashNodeService.addNode(node);
    });

    it("any query should return the only one node", function() {
      for (let i = 0; i < 10; i++) {
        assert.equal(
          node,
          hashNodeService.lookupNode(Math.random().toString().substr(2, 10))
        );
      }
    });
  });

  describe("test two nodes", function() {
    let hashNodeService: HashNodeService;
    let hash_n1 = hash("server1");
    let hash_n2 = hash("server2");
    let n1 = new Node("server1", "192.168.1.2");
    let n2 = new Node("server2", "192.168.1.2");
    if (hash_n1 > hash_n2) {
      [n1, n2] = [n2, n1];
    }

    beforeEach(function() {
      hashNodeService = new HashNodeService({ virtual_nodes: 4 });
      hashNodeService.addNode(n1);
      hashNodeService.addNode(n2);
    });

    it("test basic functionality", function() {
      const key1 = "user1";
      const key2 = "user2";

      const node1 = hashNodeService.lookupNode(key1);
      assert.equal(node1, hashNodeService.lookupNode(key1));

      const node2 = hashNodeService.lookupNode(key2);
      assert.equal(node2, hashNodeService.lookupNode(key2));
    });

    it("#removeNode", function() {
      const key1 = "user1";
      const key2 = "user2";
      const hash_key1 = hash(key1);
      const hash_key2 = hash(key2);

      hashNodeService.removeNode(n2);
      assert.equal(n1, hashNodeService.lookupNode(key1));
      assert.equal(n1, hashNodeService.lookupNode(key2));

      hashNodeService.removeNode(n1);
      assert.equal(null, hashNodeService.lookupNode(key1));
      assert.equal(null, hashNodeService.lookupNode(key2));
    });
  });
});
