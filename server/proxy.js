const request = require("superagent");

const rootUrl = "";

module.exports = app => {
  app.get(/proxy/, (req, res) => {
    const url = `${rootUrl}/${req.url.replace("/proxy/", "")}`;
    request.get(url).end((err, _res) => {
      res.send(_res.body);
    });
  });

  app.post(/proxy/, (req, res) => {
    const url = `${rootUrl}/${req.url.replace("/proxy/", "")}`;
  });
};
