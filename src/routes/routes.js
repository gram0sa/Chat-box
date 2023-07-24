const express = require('express');
const route = express.Router();
const homeController = require('../Controllers/homeController');

route.get('/', homeController.index);

module.exports = route;