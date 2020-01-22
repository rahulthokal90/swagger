const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const option = {
  swaggerDefinition: {
    info: {
      title: 'Test API',
      vesion: '1.0.0',
      description: 'asfdafag'
    }
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(option);

/**
 * @swagger
 * /users:
 *   get
 *     description:This should return all user
 */
module.exports = app => {
  app.use('/app-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
