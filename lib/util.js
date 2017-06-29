"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crc32 = require("fast-crc32c");
const salt = 0x12345678;
// js has no unsigned int type
const MAX_COUNT = 1 << 31 - 1;
function hash(key) {
    return crc32.calculate(key, salt) % MAX_COUNT;
}
exports.hash = hash;
