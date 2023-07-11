const routes = require('express').Router()
const controller = require('../controller/controller')

//creating endpoints
routes
    .route('/api/categories')
    .post(controller.create_Categories) //import functions out of "controller" module
    .get(controller.get_Categories)

routes
    .route('/api/transaction')
    .post(controller.create_Transaction) //import functions for transactions of controller
    .get(controller.get_Transaction)
    .delete(controller.delete_Transaction)

routes
    .route('/api/labels')
    .get(controller.get_Labels)

module.exports = routes