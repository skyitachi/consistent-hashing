import { assert } from "chai";

import { BinarySearchTree as BST, ValueNode } from "../lib/bst";

describe("test bst api", function() {
  let bst: BST<number>;
  let s1: ValueNode<number>;
  let s2: ValueNode<number>;
  let s3: ValueNode<number>;

  describe("test relation", function () {
    beforeEach(function() {
      bst = new BST<number>();
      s1 = new ValueNode(1, "first");
      s2 = new ValueNode(4, "second");
      s3 = new ValueNode(8, "third");
    });

    it("test balanced situation", function () {
      bst.insert(s2);
      bst.insert(s1);
      bst.insert(s3);
      assert.equal(bst.root, s2);
      assert.equal(s2.left, s1);
      assert.equal(s2, s1.parent);
      assert.equal(s2.right, s3);
      assert.equal(s2, s3.parent);
    })
  });

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
    describe("#basic api", function() {
      beforeEach(function() {
        bst = new BST<number>();
        s1 = new ValueNode(1, "first");
        s2 = new ValueNode(4, "second");
        s3 = new ValueNode(8, "third");
        bst.insert(s2);
        bst.insert(s1);
        bst.insert(s3);
      });

      it("remove none exist key", function() {
        assert.equal(false, bst.remove(2));
        assert.equal(false, bst.remove(-1));
        assert.equal(false, bst.remove(9));
      });
      
      it("remove left child node without children", function() {
        const ret = bst.remove(1);
        assert.equal(ret, true);
        assert.equal(bst.root, s2);
        assert.equal(s2.left, null);
        assert.equal(s1.parent, null);
      });

      it("remove right child node without children", function () {
        const ret = bst.remove(8);
        assert.equal(ret, true);
        assert.equal(bst.root, s2);
        assert.equal(s2.right, null);
        assert.equal(s3.parent, null);
      });

      it("remove root node with both left and right child", function () {
        const ret = bst.remove(s2);
        assert.equal(ret, true);
        assert.equal(bst.root, s1);
        assert.equal(s1.left, null);
        assert.equal(s1.right, s3);
        assert.equal(s3.parent, s1);
      });
    });
    describe("#advanced case", function () {
      beforeEach(function () {
        bst = new BST<number>();
        s1 = new ValueNode(1, "first");
        s2 = new ValueNode(4, "second");
        s3 = new ValueNode(8, "third");
        bst.insert(s2);
        bst.insert(s1);
        bst.insert(s3);
      });
      
      it("remove node as root node with left and right child", function () {
        let s4 = new ValueNode(2, "forth");
        let s5 = new ValueNode(3, "fifth");
        bst.insert(s5);
        bst.insert(s4);
        bst.remove(s2);
        assert.equal(s5.left, s1);
        assert.equal(s5.right, s3);
        assert.equal(bst.root, s5);
        assert.equal(s1.parent, s5);
        assert.equal(s1.right, s4);
        assert.equal(s4.parent, s1);
      });
    });
    describe("#corner case", function() {

      it("remove the only node", function () {
        bst = new BST<number>();
        s1 = new ValueNode(1, "first");
        bst.insert(s1);
        bst.remove(s1);
        assert.equal(bst.root, null);
      });

    });
  });
});
