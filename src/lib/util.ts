import * as crc32 from "fast-crc32c";
const salt = 0x12345678;

// js has no unsigned int type
const MAX_COUNT = 1 << 31 - 1;

function make_virtual_key(key: string, idx: number) {
  return `${key}&${idx}`;
}

export function hash(key: string) {
  return crc32.calculate(key, salt) % MAX_COUNT;
}

export function hashWithVirtualNode(host: string, replica: number) {
  const nodeList = [];
  for (let i = 0; i < replica; i++) {
    nodeList.push(hash(make_virtual_key(host, i)))   
  }
  return nodeList;
}