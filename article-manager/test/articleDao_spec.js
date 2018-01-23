const dbConnector = require('./connectTestDB');
const Dao = require('../lib/articleDao');
const should = require('should');
const Article = require('../models/Article');

describe('article manager specification', () => {

  beforeAll(function (done) {
    dbConnector(done);
  });

  beforeAll(function (done) {
    Article.collection.drop(function (err) {
      if (err && err.message !== 'ns not found') throw err;
      console.log('db cleared');
      done();
    });
  });

  const dao = new Dao();

  describe("save no content article", () => {
    let saveResult = {};
    const testName = new Date().toDateString();

    beforeAll(function (done) {
      dao.saveArticle({
        name: testName,
      })
        .then(res => {
          saveResult = res;
          done();
        });
    });

    it('save success', () => expect(saveResult.success).toBe(true));
    it('has result article', () => expect(saveResult.article).toBeDefined());
    it(
      'result article has the same name with save article',
      () => expect(saveResult.article.name).toBe(testName)
    );
  });

  describe("save flat article", () => {
    let saveResult = {};
    const testName = new Date().toDateString();
    const content = "asdfasdfasdfasdf";

    beforeAll(function (done) {
      dao.saveArticle({
        name: testName,
        text: content
      })
        .then(res => {
          saveResult = res;
          done();
        });
    });

    it('save success', () => expect(saveResult.success).toBe(true));
    it('has result article', () => expect(saveResult.article).toBeDefined());
    it(
      'result article has the same name with save article',
      () => expect(saveResult.article.name).toBe(testName)
    );

    it('article has the expected content',
      () => expect(saveResult.article.text).toBe(content));
  });

  describe("save nested article", () => {
    let saveResult = {};
    const str = new Date().toDateString();
    const str2 = new Date().toDateString();
    const str3 = new Date().toDateString();
    const content = "asdfasdfasdfasdf";
    const content2 = "asdfasdfasdfasdasdfadfaf";
    const content3 = "asdfadsfasdfasdfasdfasdfasdasdfadfaf";

    beforeAll(function (done) {
      dao.saveArticle({
        name: str,
        text: content,
        sub: [
          {
            name: str2,
            text: content2
          },
          {
            name: str3,
            text: content3
          }
        ]
      })
        .then(res => {
          saveResult = res;
          done();
        });
    });

    it('save success', () => expect(saveResult.success).toBe(true));
    it('has result article', () => expect(saveResult.article).toBeDefined());
    it(
      'result article is correct',
      () => {
        expect(saveResult.article.name).toBe(str);
        expect(saveResult.article.text).toBe(content);

        const article2 = saveResult.article.sub[0];
        expect(article2.name).toBe(str2);
        expect(article2.text).toBe(content2);

        const article3 = saveResult.article.sub[1];
        expect(article3.name).toBe(str3);
        expect(article3.text).toBe(content3);
      }
    );
  });

  describe("get article by name successfully", () => {
    const testName = new Date().toString();
    const testText = testName;
    const testCharNum = testText.length;

    const article = {
      name: testName,
      text: testText,
      charNum: testCharNum
    };

    let optResult = {};
    beforeAll(done => {
      dao.saveArticle(article)
        .then(function findArticle() {
          return dao.findArticleByName(testName);
        })
        .then(res => {
          optResult = res;
          done();
        });
    });

    it('should be success', () => expect(optResult.success).toBe(true));
    it('should found it', () => expect(optResult.article.name).toBe(testName));
    it('should have content', () => expect(optResult.article.text).toBe(testText));
  });

  describe("get article by name fail, name not exist", () => {
    const notExistedName = "asdf;hkjzxhcvjaehf";

    let optResult = {};

    beforeAll(done => {
      dao.findArticleByName(notExistedName).then(res => {
        optResult = res;
        done();
      });
    });

    it('should be failed', () => expect(optResult.success).toBe(false));
  });
});
