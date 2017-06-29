export class ValueNode<T> {
  key: T;
  value: any;
  left: ValueNode<T> | null;
  right: ValueNode<T> | null;
  parent: ValueNode<T> | null;

  constructor(key: T, value: any) {
    this.value = value;
    this.key = key;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

export class BinarySearchTree<T> {
  _root: ValueNode<T> | null;
  _current: ValueNode<T> | null;
  _rightmost: ValueNode<T> | null;
  _leftmost: ValueNode<T> | null;

  constructor() {
    this._root = null;
    this._current = null;
    this._rightmost = null;
    this._leftmost = null;
  }

  insert(node: ValueNode<T>) {
    if (!this._root) {
      this._root = node;
    } else {
      insert(this._root, node);
    }
    // update leftmost and rightmost
    this._leftmost = leftmost(this._root);
    this._rightmost = rightmost(this._root);
  }
  
  // TODO
  remove(node: ValueNode<T>) {
    
  }

  preorder() {
    return preorder(this._root);
  }

  find(key: T) {
    if (!this._rightmost) return null;
    // greater than biggest should return the smallest
    if (key > this._rightmost.key) return this._leftmost;
    return find(this._root, key);
  }
}

/**
 * @param root
 * @param node 
 */
function insert<T>(root: ValueNode<T> | null,  node: ValueNode<T>) {
  if (!root) return;
  if (node.key < root.key) {
    if (!root.left) {
      root.left = node;
      node.parent = root; 
    } else {
      insert(root.left, node);
    }
  } else {
    const right = root.right;
    if (!root.right) {
      root.right = node;
      node.parent = root;
    } else {
      insert(root.right, node);
    }
  } 
}

function preorder<T>(root: ValueNode<T> | null): Array<T> {
  if (!root) return [];
  const ret = [];
  const left = preorder(root.left);
  ret.push(root.key);
  const right = preorder(root.right);
  return left.concat(ret.concat(right));
}

/**
 * if the key > max, then return the min
 */
function find<T>(root: ValueNode<T> | null, key: T): ValueNode<T> | null {
  if (!root) return null;
  if (key <= root.key && !root.left) {
    return root; 
  } else if (key <= root.key) {
    return find(root.left, key);
  } if (key > root.key && !root.right) {
    return predecessor(key, root);
  }
  return find(root.right, key);
}

function predecessor<T>(key: T, node: ValueNode<T> | null): ValueNode<T> | null {
  if (!node) {
    return null;
  }
  let current: ValueNode<T> | null = node;
  while(current) {
    if (current.key > key) {
      break;
    }
    current = current.parent;
  }
  return current;
}

function leftmost<T>(root: ValueNode<T> | null): ValueNode<T> | null {
  if (!root) return null;
  while(root.left) {
    root = root.left;
  }
  return root;
}

function rightmost<T>(root: ValueNode<T> | null): ValueNode<T> | null {
  if (!root) return null;
  while(root.right) {
    root = root.right;
  }
  return root;
}