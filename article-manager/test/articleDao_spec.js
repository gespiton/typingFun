const dbConnector = require('./connectTestDB');
const Dao = require('../lib/articleDao');
const should = require('should');
const Article = require('../models/Article');
const mongoose = require('mongoose');

describe('article manager specification', () => {

  beforeAll(function (done) {
    dbConnector(done);
  });

  beforeEach(function (done) {
    Article.collection.drop(function (err) {
      if (err && err.message !== 'ns not found') throw err;
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
    it('has result article', () => expect(saveResult.result).toBeDefined());
    it(
      'result article has the same name with save article',
      () => expect(saveResult.result.name).toBe(testName)
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
    it('has result article', () => expect(saveResult.result).toBeDefined());
    it(
      'result article has the same name with save article',
      () => expect(saveResult.result.name).toBe(testName)
    );

    it('article has the expected content',
      () => expect(saveResult.result.text).toBe(content));
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
    it('has result article', () => expect(saveResult.result).toBeDefined());
    it(
      'result article is correct',
      () => {
        expect(saveResult.result.name).toBe(str);
        expect(saveResult.result.text).toBe(content);

        const article2 = saveResult.result.sub[0];
        expect(article2.name).toBe(str2);
        expect(article2.text).toBe(content2);

        const article3 = saveResult.result.sub[1];
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
    it('should found it', () => expect(optResult.result.name).toBe(testName));
    it('should have content', () => expect(optResult.result.text).toBe(testText));
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



  describe("get index of all articles", function () {
    const data = [
      {
        name: 'first',
        text: 'this is the first article'
      },
      {
        name: 'forth',
        text: 'this is the forth article',
        sub: [
          {
            name: 'fifth',
            text: 'this is the fifth article',
          }
        ]
      },
      {
        name: 'second',
        text: 'this is the second article'
      },
      {
        name: 'third',
        text: 'this is the third article'
      }
    ];

    let optResult = {};
    beforeAll(done => {
      const opts = [];

      data.forEach(article => opts.push(dao.saveArticle(article)));


      Promise.all(opts).then(() => { return dao.getArticleIndex(); }).then(res => {
        optResult = res;
        done();
      });
    });

    it('is success', () => expect(optResult.success).toBe(true));
    it('has correct result', () => {
      expect(optResult.result.length).toBe(data.length);
      data.forEach((value, index) => indexMatch(optResult.result[index], value));
    });

    function indexMatch(result, ori) {
      expect(result.name).toBe(ori.name);
      expect(result.id).toBeDefined;
      if (result.sub) {
        result.sub.forEach((value, index) => indexMatch(value, ori.sub[index]));
      }
    }
  });

  describe("get article by id", () => {
    const articleName = 'test';
    const articleText = 'hah hah';
    const article = {
      name: articleName,
      text: articleText
    };

    let optResult = {};
    beforeAll(done => {
      dao.saveArticle(article)
        .then(res => {
          return dao.findArticleById(res.result._id);
        })
        .then(res => {
          optResult = res;
          done();
        })
        .catch(err => console.log(err));
    });

    it('is successful', () => expect(optResult.success).toBe(true));
    it('is correct article', () => {
      expect(optResult.data.name).toBe(article.name);
      expect(optResult.data.text).toBe(article.text);
    });
  });

  afterAll(function () {
    mongoose.disconnect(function () {
      console.log('disconnected');
    });
  });
});
