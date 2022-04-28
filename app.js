/* eslint-disable max-len */
require('dotenv').config();

const express = require('express');
const logger = require('winston');
const morgan = require('morgan');
const cors = require('cors');

const helpers = require('./utils/helpers');
const version = require('./package.json').version;

const mwJobu = require('./middlewares/mw_jobu');
const rtJobu = require('./routers/rt_jobu');

/**
 * Adds two numbers together.
 * @param {int} port Port of server.
 */
function startApp(port) {
  const app = express();
  app.set('view engine', 'pug');
  app.use('/public', express.static('static'));
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

  logger.configure({
    transports: [
      new (logger.transports.Console)(),
      new (logger.transports.File)({filename: 'logs/app-js.log'}),
    ],
  });

  app.get('/', (req, res) => {
    res.render('home');
    /*
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<p style="font-family: Monaco, monospace; padding: 1rem;"><b>jegerima.dev</b> is under construction<p>');
    res.end();
    */
  });

  app.get('/version', (req, res) => {
    res.send(version);
  });

  app.get('/multiverso/m1', (req, res) => {
    res.render('m1');
  });

  app.use('/jobu', cors());
  app.use('/jobu', mwJobu);
  app.use('/jobu', rtJobu.getRouter(null, logger));

  app.get('*', function getAny(req, res) {
    res.send('404 | Not found');
  });

  app.listen(port);
  helpers.sout('Main server running on port', port);
};

startApp(process.env.PORT | 8011);
