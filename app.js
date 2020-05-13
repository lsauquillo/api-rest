const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const controllerProduct = require('./controllers/product')

//Devuelve todos los documentos de la coleccion products
app.get('/api/product', controllerProduct.getProducts)
//Devuelve el producto cuyo _id se pasa como parametro
app.get('/api/product/:productId', controllerProduct.getProduct)
//Agrega un nuevo producto a la coleccion pruducts de documentos de la base de datos shop
app.post('/api/product', controllerProduct.saveProduct)
//Actualiza un productoId de la coleccion products 
//para que funcione primero hacer un GET para llamar al producto
//luego pasar a PUT y modificar los campos y send
app.put('/api/product/:productId', controllerProduct.updateProduct)
//Elimina el productoId de la coleccion products que se pasa como parametro
app.delete('/api/product/:productId', controllerProduct.deleteProduct)

module.exports = app