const dataManager = require("../../localModules").userDataManager;

// const Article  = require('../models/article');

function main(router) {
  router.route('/record')
      .get(
          (req, res, next) => {
            const user = req.user;
            if (!user) {
              console.log("user not log in");
              return res.status(403).send("");
            }

            dataManager.getUserRecords(user.email)
                .then(result => {
                  res.send(result.map(elem => ({
                    createAt: elem.createAt,
                    incorret: elem.incorrect,
                    keyStrokes: elem.keyStrokes,
                    timeSpent: elem.timeSpent,
                    total: elem.total,
                    wpf: elem.wpf
                  })));
                });
          }
      );

  router.route('/record/save')
      .post(
          (req, res, next) => {
            dataManager.saveRecord(req.body)
                .then(result => {
                  console.log(result);
                  return res.json({success: result.success});
                })
                .catch(err => {
                  console.log(err);
                  return next();
                });

          }
      );
}

module.exports = main;