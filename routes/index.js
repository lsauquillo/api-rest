const express = require('express')
const api = express.Router()

const controllerProduct = require('../controllers/product')

api.get('/product', controllerProduct.getProducts)
api.get('/product/:productId', controllerProduct.getProduct)
api.post('/product', controllerProduct.saveProduct)
api.put('/product/:productId', controllerProduct.updateProduct)
api.delete('/product/:productId', controllerProduct.deleteProduct)

module.exports = api