const Record = require('../models/record');

describe("record tests", () => {
  describe("default", () => {
    let record = {};
    beforeAll(function () {
      record = new Record();
    });

    test("has created date", () => {
      expect(record.createAt).toBeDefined();
    });
  });
});