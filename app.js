const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const Pxl = require('pxl-mongodb');

const apiRoutes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors());


const config = require('./config');

let pxl = new Pxl({
  collectionPxls: 'pxls', 
  collectionLinks: 'links', 
  alwaysShortenWithNewLinkId: true 
});

mongoose.connect(
  config.MONGO.URI,
  config.MONGO.OPTIONS
);
pxl.connect(config.MONGO.URI)


// enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(pxl.trackPxl)

apiRoutes.includeRoutes(app);
require('./helpers/bull.helper');
app.get('/shortly/:linkId', pxl.redirect)
app.pxl = pxl;
app.use('/static', express.static('public',{etag:false,maxAge:'1s'}))

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  // res.status(err.status || 500).json({ err: err.message });
  const errorObj = {
    service: 'auth_service',
  };
  if (err.status === 400) {
    if (err.validationErrors) {
      errorObj.validationErrors = err.validationErrors;
    }
    errorObj.message = err.message || 'Invalid Values Supplied';
    errorObj.head = err.head || null;
  } else if (err.status === 401 || err.status === 403) {
    errorObj.head = err.head || null;
    errorObj.message = err.message || 'Unauthorized User';
  } else if (err.status === 500) {
    errorObj.head = err.head || null;

    errorObj.message = err.message;

    errorObj.message = 'Internal Server Error';
  } else if (err.status === 404) {
    errorObj.head = err.head || null;
    errorObj.message = err.message;
  } else {
    errorObj.head = err.head || null;

   

    errorObj.message = err.message || 'Unknown Error Occurred';
  }

  next();
  return res.status(err.status || 500).json(errorObj);
});
process.on('SIGTERM', function () {
    //do something before Gracefully shut it down
  process.exit(0);
});
process.on('SIGINT', function () {
    //do something before Gracefully shut it down
  process.exit(0);
});

module.exports = app;
