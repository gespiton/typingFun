const RecordManager = require('../../userdata-manager');
const recordManager = new RecordManager();

function saveRecord(req, res) {
  console.log("saving record");
  recordManager.saveRecord(
      {
        user: req.user,
        data: req.body.data,
        articleId: req.body.articleId
      })
      .then(result => res.json(result))
      .catch((err) => {
        console.log('save error\n', err);
        res.json({success: false});
      });
}

module.exports = saveRecord;