const Article = require('../models/Article');

describe("article model spec", () => {
  describe("default article", () => {
    let article = {};

    beforeAll(function () {
      article = new Article();
    });

    it("article has created date", () => article.createAt.should.exist);
    // it("article has textId", () => expect(article.textId).toBeDefined());
    // it("article has name", () => expect(article.name).toBeDefined());
  });
});
