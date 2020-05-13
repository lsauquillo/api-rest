//Aplicacion para conectarnos con la base de datos 'shop' de MongoDB
//Esta base tiene una coleccion 'products' con documentos 'product'
//que se crean con el modelo 'Product' y el schema de product.js
//Se pueden  presentar todos los productos, un productoId, agregar nuevo producto, 
//actualizar un productoId, o eliminar un productoId de la coleccion.

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

const controllerProduct = require('./controllers/product')


const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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


mongoose.connect('mongodb://localhost:27017/shop', {useNewUrlParser: true, useUnifiedTopology: true }, (err, res)=>{
  if(err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexion a la base de datos establecida...')

  app.listen(port, ()=>{
    console.log(`API corriendo en http://localhost:${port}`)
  })

})

