const should = require('should');
const Record = require('../models/record');

describe("Record test", function () {
  describe("default", function () {
    let record = {};
    before(function () {
      record = new Record();
    });

    it("has created date", () => {
      record.createAt.should.be.defined;
    });
  });
});