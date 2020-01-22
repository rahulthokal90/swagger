const express = require('express');
const users = require('../routes/users');
const patients = require('../routes/patients');
const swaggerDoc = require('../swaggerDoc');
module.exports = function(app) {
  app.use(express.json());

  app.use('/api/swagger', swaggerDoc);
  app.use('/api/users', users);
  app.use('/api/patient', patients);
};
