const winston = require('winston');
const express = require('express');
const config = require('config');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('./startup/db')();
require('./startup/routes')(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = process.env.PORT || config.get('port');
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
