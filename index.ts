import Node from "./lib/node";
import { hash } from "./lib/util";
import { BinarySearchTree as BST, ValueNode } from "./lib/bst";

export default class HashNodeService {
  private nodeList: Array<Node>;
  private bst: BST<number>;

  constructor() {
    this.nodeList = [];
    this.bst = new BST<number>();
  }

  public addNode(node: Node): void {
    const k = hash(node.host);
    this.bst.insert(new ValueNode<number>(k, node));
    this.nodeList.push(node);
  }

  public lookupNode(key: string): Node | null {
    const k = hash(key);
    const ret = this.bst.find(k);
    if (!ret) return null;
    return ret.value;
  }

  public removeNode(node: Node): void {
    const idx = this.nodeList.indexOf(node);
    if (idx !== -1) {
      this.nodeList.splice(idx, 1);
    } 
  }
}
