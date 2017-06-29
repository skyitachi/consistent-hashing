"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValueNode {
    constructor(key, value) {
        this.value = value;
        this.key = key;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}
exports.ValueNode = ValueNode;
class BinarySearchTree {
    constructor() {
        this._root = null;
        this._current = null;
        this._rightmost = null;
        this._leftmost = null;
    }
    insert(node) {
        if (!this._root) {
            this._root = node;
        }
        else {
            insert(this._root, node);
        }
        // update leftmost and rightmost
        this._leftmost = leftmost(this._root);
        this._rightmost = rightmost(this._root);
    }
    // TODO
    remove(node) {
    }
    preorder() {
        return preorder(this._root);
    }
    find(key) {
        if (!this._rightmost)
            return null;
        // greater than biggest should return the smallest
        if (key > this._rightmost.key)
            return this._leftmost;
        return find(this._root, key);
    }
}
exports.BinarySearchTree = BinarySearchTree;
/**
 * @param root
 * @param node
 */
function insert(root, node) {
    if (!root)
        return;
    if (node.key < root.key) {
        if (!root.left) {
            root.left = node;
            node.parent = root;
        }
        else {
            insert(root.left, node);
        }
    }
    else {
        const right = root.right;
        if (!root.right) {
            root.right = node;
            node.parent = root;
        }
        else {
            insert(root.right, node);
        }
    }
}
function preorder(root) {
    if (!root)
        return [];
    const ret = [];
    const left = preorder(root.left);
    ret.push(root.key);
    const right = preorder(root.right);
    return left.concat(ret.concat(right));
}
/**
 * if the key > max, then return the min
 */
function find(root, key) {
    if (!root)
        return null;
    if (key <= root.key && !root.left) {
        return root;
    }
    else if (key <= root.key) {
        return find(root.left, key);
    }
    if (key > root.key && !root.right) {
        return predecessor(key, root);
    }
    return find(root.right, key);
}
function predecessor(key, node) {
    if (!node) {
        return null;
    }
    let current = node;
    while (current) {
        if (current.key > key) {
            break;
        }
        current = current.parent;
    }
    return current;
}
function leftmost(root) {
    if (!root)
        return null;
    while (root.left) {
        root = root.left;
    }
    return root;
}
function rightmost(root) {
    if (!root)
        return null;
    while (root.right) {
        root = root.right;
    }
    return root;
}
