/* eslint-disable max-len */
require('dotenv').config();

const express = require('express');
const logger = require('winston');
const morgan = require('morgan');
const cors = require('cors');
const twilio = require('twilio')();

const helpers = require('./utils/helpers');
const version = require('./package.json').version;

const mwJobu = require('./middlewares/mw_jobu');
const rtJobu = require('./routers/rt_jobu');

/**
 * Adds two numbers together.
 * @param {int} port Port of server.
 */

const app = express();
const port = process.env.PORT | 8011;
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
});

app.get('/version', (req, res) => {
  res.send(version);
});

app.get('/multiverso/m1', (req, res) => {
  res.render('m1');
});

app.get('/citabot/notify', (req, res) => {
  if(req.query.token=='watagatapitusberry') {
    twilio.messages.create({
      from: 'whatsapp:+14155238886',
      body: 'Check new date! ' + req.query.date ?? "empty",
      to: 'whatsapp:+593991121022'
    })
    res.json({status: true});
  }else{
    res.json({status: false});
  }
});

app.use('/jobu', cors());
app.use('/jobu', mwJobu);
app.use('/jobu', rtJobu.getRouter(null, logger));

app.get('*', function getAny(req, res) {
  res.send('404 | Not found');
});

const server = app.listen(port);
helpers.sout('Main server running on port', port);

module.exports = {app, server};
