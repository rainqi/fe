const fs = require('fs');

const queryDefault = {
  theme: 'base',  // [base, ...]
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


	app.get('/demo.html', (req, res) => {
		res.render('demo.html', parseQuery(req.query, {}));
	});

  app.get('/styles.html', (req, res) => {
    res.render('styles.html', parseQuery(req.query, {}));
  });

  app.get('/form.html', (req, res) => {
    res.render('form.html', parseQuery(req.query, {}));
  });


	/* dummy data routing */

	app.get('/data/demo', (req, res) => {
		res.send(require('./data/demo'));
	});
};
