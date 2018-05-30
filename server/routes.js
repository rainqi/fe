const fs = require('fs');

const queryDefault = {
  theme: 'base',
  locale: 'en_US', // [en_US, ...]
  hasLogin: false, // [true, false]
};

function parseQuery(query, options) {
  return Object.assign({}, queryDefault, query, options);
}

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/calculator.html', (req, res) => {
    res.render('calculator.html', parseQuery(req.query, {}));
  });

	app.get('/series-selector.html', (req, res) => {
		res.render('series-selector.html', parseQuery(req.query, {}));
	});


	/* dummy data routing */

  app.get('/data/calculator', (req, res) => {
    res.send(require('./data/calculator'));
  });

	app.get('/data/selector', (req, res) => {
		res.send(require('./data/selector'));
	});
};
