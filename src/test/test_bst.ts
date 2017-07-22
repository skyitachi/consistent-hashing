import { assert } from "chai";

import { BinarySearchTree as BST, ValueNode } from "../lib/bst";

describe("test bst api", function() {
  let bst: BST<number>;
  let s1: ValueNode<number>;
  let s2: ValueNode<number>;
  let s3: ValueNode<number>;

  describe("test preorder", function() {
    beforeEach(function() {
      bst = new BST<number>();
      s1 = new ValueNode(1, "first");
      s2 = new ValueNode(4, "second");
      s3 = new ValueNode(8, "third");
    });

    it("insert in sequence", function() {
      bst.insert(s1);
      bst.insert(s2);
      bst.insert(s3);

      assert.deepEqual([1, 4, 8], bst.preorder());
    });

    it("insert in random", function() {
      bst.insert(s3);
      bst.insert(s2);
      bst.insert(s1);

      assert.deepEqual([1, 4, 8], bst.preorder());
    });
  });

  describe("test find", function() {
    before(function() {
      bst = new BST<number>();
      s1 = new ValueNode(1, "first");
      s2 = new ValueNode(4, "second");
      s3 = new ValueNode(8, "third");
      bst.insert(s1);
      bst.insert(s2);
      bst.insert(s3);
    });

    it("find key in (min - max)", function() {
      // assert.notEqual(-1, bst.find(5));
      assert.equal(s3, bst.find(5));
      assert.equal(s2, bst.find(3));
    });

    it("find key <= min", function() {
      assert.equal(s1, bst.find(-1));
      assert.equal(s1, bst.find(1));
    });

    it("find key >= max", function() {
      assert.equal(s1, bst.find(10));
      assert.equal(s3, bst.find(8));
    });
  });

  describe("test remove", function() {
    before(function() {
      bst = new BST<number>();
      s1 = new ValueNode(1, "first");
      s2 = new ValueNode(4, "second");
      s3 = new ValueNode(8, "third");
      bst.insert(s1);
      bst.insert(s2);
      bst.insert(s3);
    });
    it("remove none exist key", function () {
      assert.equal(false, bst.remove(2));
      assert.equal(false, bst.remove(-1));
      assert.equal(false, bst.remove(9));
    });
  });
});
