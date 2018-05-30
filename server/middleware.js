const fs = require("fs");


const queryDefault = {
  theme: "base",
  locale: "en_US", // [en_US, ...]
  hasLogin: false, // [true, false]
};

function parseQuery(query, options) {
  return Object.assign({}, query, options);
}

module.exports = app => {
  app.use((req, res, next) => {
    res.locals = parseQuery(queryDefault, req.query);
    console.log(res.locals, req.query);
    next();
  });
}