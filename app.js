require('dotenv').config();
require('dotenv').config({
  path: __dirname + `/environment/.env.${process.env.NODE_ENV}`,
});
require('./Middleware/passport');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const route = require("./Routes");
const error = require("./Middleware/error");
const { sendJson } = require("./Middleware/generateResponse");
const logger = require('./utils/logger');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));
app.response.sendJson = sendJson;

app.use("/", route);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);
// catch 404 and forward to error handler
app.use(error.notFound);
// error handler, send stacktrace only during development
app.use(error.handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `
  ##    ##  #######  ########  ########
  ###   ## ##     ## ##     ## ##
  ####  ## ##     ## ##     ## ##
  ## ## ## ##     ## ##     ## ######
  ##  #### ##     ## ##     ## ##
  ##   ### ##     ## ##     ## ##
  ##    ##  #######  ########  ########
  `);
  logger.info(`Server is running on ${PORT}`);
});