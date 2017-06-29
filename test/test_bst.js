"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const bst_1 = require("../lib/bst");
describe("test bst api", function () {
    let bst;
    let s1;
    let s2;
    let s3;
    describe("test preorder", function () {
        beforeEach(function () {
            bst = new bst_1.BinarySearchTree();
            s1 = new bst_1.ValueNode(1, "first");
            s2 = new bst_1.ValueNode(4, "second");
            s3 = new bst_1.ValueNode(8, "third");
        });
        it("insert in sequence", function () {
            bst.insert(s1);
            bst.insert(s2);
            bst.insert(s3);
            chai_1.assert.deepEqual([1, 4, 8], bst.preorder());
        });
        it("insert in random", function () {
            bst.insert(s3);
            bst.insert(s2);
            bst.insert(s1);
            chai_1.assert.deepEqual([1, 4, 8], bst.preorder());
        });
    });
    describe("test find", function () {
        before(function () {
            bst = new bst_1.BinarySearchTree();
            s1 = new bst_1.ValueNode(1, "first");
            s2 = new bst_1.ValueNode(4, "second");
            s3 = new bst_1.ValueNode(8, "third");
            bst.insert(s1);
            bst.insert(s2);
            bst.insert(s3);
        });
        it("find key in (min - max)", function () {
            // assert.notEqual(-1, bst.find(5));
            chai_1.assert.equal(s3, bst.find(5));
            chai_1.assert.equal(s2, bst.find(3));
        });
        it("find key <= min", function () {
            chai_1.assert.equal(s1, bst.find(-1));
            chai_1.assert.equal(s1, bst.find(1));
        });
        it("find key >= max", function () {
            chai_1.assert.equal(s1, bst.find(10));
            chai_1.assert.equal(s3, bst.find(8));
        });
    });
});
