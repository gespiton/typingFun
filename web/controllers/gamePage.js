function get(req, res) {
  res.render('gamePage',{title: "gaming", page: "gamePage"});
}

module.exports = {
  actionList: [
    {action: 'get', url: '/', func: get},
  ]
};