const Article = require('../models/Article');
const should = require('should');

describe("article model spec", () => {
  describe("default article", () => {
    let article = {};

    beforeAll(function () {
      article = new Article();
    });

    it("article has created date", () => article.createAt.should.exist);
  });
});
