"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const node_1 = require("../lib/node");
const index_1 = require("../index");
const util_1 = require("../lib/util");
describe("test hashnode service", function () {
    describe("test one node", function () {
        let hashNodeService;
        let node = new node_1.default("server1", "192.168.1.2");
        beforeEach(function () {
            hashNodeService = new index_1.default();
            hashNodeService.addNode(node);
        });
        it("any query should return the only one node", function () {
            for (let i = 0; i < 10; i++) {
                chai_1.assert.equal(node, hashNodeService.lookupNode(Math.random().toString().substr(2, 10)));
            }
        });
    });
    describe("test two nodes", function () {
        let hashNodeService;
        let hash_n1 = util_1.hash("server1");
        let hash_n2 = util_1.hash("server2");
        let n1 = new node_1.default("server1", "192.168.1.2");
        let n2 = new node_1.default("server2", "192.168.1.2");
        if (hash_n1 > hash_n2) {
            [n1, n2] = [n2, n1];
        }
        beforeEach(function () {
            hashNodeService = new index_1.default();
            hashNodeService.addNode(n1);
            hashNodeService.addNode(n2);
        });
        it("test basic functionality", function () {
            const key1 = "user1";
            const key2 = "user2";
            const hash_key1 = util_1.hash(key1);
            const hash_key2 = util_1.hash(key2);
            if (hash_key1 > hash_n1 && hash_key1 <= hash_n2) {
                chai_1.assert.equal(n2, hashNodeService.lookupNode(key1));
            }
            else if (hash_key1 > hash_n1 && hash_key1 > hash_n2) {
                chai_1.assert.equal(n1, hashNodeService.lookupNode(key1));
            }
            if (hash_key2 > hash_n1 && hash_key2 <= hash_n2) {
                chai_1.assert.equal(n2, hashNodeService.lookupNode(key2));
            }
            else if (hash_key2 > hash_n1 && hash_key2 > hash_n2) {
                chai_1.assert.equal(n1, hashNodeService.lookupNode(key2));
            }
        });
    });
});
