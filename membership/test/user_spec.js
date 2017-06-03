const should = require('should');
const User = require('../models/user');

describe("User", function () {
    describe("defaults", function () {
        let user = {};

        before(function () {
            user = new User();
        });

        it("user has created date", () => {
            user.createAt.should.be.defined;
        });

        it("user has default status offline", () => {
            user.status.should.be.defined;
        })
    });
});