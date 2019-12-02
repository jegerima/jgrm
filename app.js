require('dotenv').config();

const express = require('express');
const cookieSession = require('cookie-session');
const formidable = require('formidable');
const logger = require('winston');
const morgan = require('morgan');
const cors = require('cors');

const helpers = require('./utils/helpers');
const jparse = helpers.jparse;
const logerror = helpers.logerror;

function startApp(port){
    
    const app = express();
    app.set('view engine', 'pug');
    app.use('/public', express.static('static'));
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

    logger.configure({
        transports: [
            new (logger.transports.Console)(),
			new (logger.transports.File)({filename: 'logs/app-js.log'})
        ]
    });

    app.get('/', (req, res)=>{
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write("<p style='font-family: Monaco, monospace; padding: 1rem;'><b>jegerima.dev</b> is under construction<p>");
        res.end();
    });

    app.get('*', function getAny(req,res){
		res.write('404 | Not found');
    });
    
    app.listen(port);
    helpers.sout('Main server running on port', port);
}

startApp(process.env.PORT | 8011);
