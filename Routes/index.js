const express = require("express");
const router = express.Router();
const authRoute = require("./auth");
const organizationRoute = require("./organization");
const uploadRoute = require("./upload")
const swaggerDocument = require('../swagger.json');
const swaggerUi = require('swagger-ui-express');
const { swaggerOptions } = require('../config');

router.get('/', (req, res, next) => res.redirect('api-docs'));
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
router.use("/auth", authRoute);
module.exports = router;