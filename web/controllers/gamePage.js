function get(req, res) {
  console.log('in game controller', res.locals.user);
  res.render('gamePage', {title: "gaming", page: "gamePage"});
}

module.exports = {
  actionList: [
    {action: 'get', url: '/', func: get},
  ]
};