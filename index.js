//Aplicacion para conectarnos con la base de datos 'shop' de MongoDB
//Esta base tiene una coleccion 'products' con documentos 'product'
//que se crean con el modelo 'Product' y el schema de product.js
//Se pueden  presentar todos los productos, un productoId, agregar nuevo producto, 
//actualizar un productoId, o eliminar un productoId de la coleccion.

const mongoose = require('mongoose')
const config = require('./config')
const app = require('./app')

mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true }, (err, res)=>{
  if(err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexion a la base de datos establecida...')

  app.listen(config.port, ()=>{
    console.log(`API corriendo en http://localhost:${config.port}`)
  })

})

