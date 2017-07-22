import * as crc32 from "fast-crc32c";
const salt = 0x12345678;
// js has no unsigned int type
const MAX_COUNT = 1 << 31 - 1;

export function hash(key: string) {
  return crc32.calculate(key, salt) % MAX_COUNT;
}