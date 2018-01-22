const should = require('should');
const Article = require('../models/Article');
const dbConnector = require('./connectTestDB');
const Dao = require('../lib/articleDao');
const mongoose = require('mongoose');

describe('article manager specification', function () {

  before(function (done) {
    dbConnector(done);
  });

  const dao = new Dao();

  describe("save article successfully", function () {
    let saveResult = {};
    const testName = new Date().toDateString();

    before(function (done) {
      dao.saveArticle({name: testName, sub: []})
          .then(res => {
            saveResult = res;
            done();
          });
    });

    it('save success', () => saveResult.success.should.equal(true));
    it('has result article', () => saveResult.article.should.be.defined);
    it('result article has the same name with save article', () => saveResult.article.name.should.equal(testName));

  });
});