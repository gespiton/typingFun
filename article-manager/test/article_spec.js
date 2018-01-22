const should = require('should');
const Article = require('../models/Article');

describe("Article model test", function () {
  describe("default article", function () {
    let article = {};

    before(function () {
      article = new Article();
    });

    it("article has created date", () => {
      article.createAt.should.be.defined;
    });
  });

});