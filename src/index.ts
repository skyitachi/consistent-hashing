import Node from "./lib/node";
import { hash, hashWithVirtualNode } from "./lib/util";
import { BinarySearchTree as BST, ValueNode } from "./lib/bst";

export interface Option {
  virtual_nodes?: number 
}

export default class HashNodeService {
  private bst: BST<number>;
  private replicas: number;
  private nodeMap: Map<number, Node>

  constructor(option?: Option) {
    this.replicas = (option && option.virtual_nodes) || 1;
    this.bst = new BST<number>();
    this.nodeMap = new Map();
  }

  // Note: assume distinct node.host 
  public addNode(node: Node): void {
    const keyList = hashWithVirtualNode(node.host, this.replicas);
    keyList.forEach((k) => {
      this.bst.insert(new ValueNode<number>(k, node));
      this.nodeMap.set(k, node);
    });
  }

  public lookupNode(key: string): Node | null {
    const k = hash(key);
    const ret = this.bst.find(k);
    if (!ret) return null;
    const node = this.nodeMap.get(ret.key);
    return node ? node : null;
  }

  public removeNode(node: Node): void {
    const keyList = hashWithVirtualNode(node.host, this.replicas);
    keyList.forEach((k) => {
      this.nodeMap.delete(k);
      this.bst.remove(k);
    });
  }
}
