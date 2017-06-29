"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const node_1 = require("../lib/node");
const index_1 = require("../index");
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
});
