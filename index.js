//Aplicacion para conectarnos con la base de datos 'shop' de MongoDB
//Esta base tiene una coleccion 'products' con documentos 'product'
//que se crean con el modelo 'Product' y el schema de product.js
//Se pueden  presentar todos los productos, un productoId, agregar nuevo producto, 
//actualizar un productoId, o eliminar un productoId de la coleccion.

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

const Product = require('./models/product')


const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Devuelve todos los documentos de la coleccion products
app.get('/api/product', (req, res)=>{
 Product.find({}, (err, products)=>{
  if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
  if(!products) return res.status(404).send({message: `No existen productos`})

  res.status(200).send({products: products})
 })
})

//Devuelve el producto cuyo _id se pasa como parametro
app.get('/api/product/:productId', (req, res)=>{
  let productId = req.params.productId
  Product.findById(productId, (err, product)=>{
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}` })
    if(!product) return res.status(404).send({message: `El producto no existe`})

    res.status(200).send({product: product})
  })
})

//Agrega un nuevo producto a la coleccion pruducts de documentos de la base de datos shop
app.post('/api/product', (req, res)=>{
  console.log('POST:api/product');
  console.log(req.body)

  let product = new Product();
  product.name = req.body.name;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;
  
  product.save((err, productStored)=>{
    if(err) res.status(500).send(`Error al salvar en la base de datos: ${err}`);
    
    res.status(200).send({product: productStored});
  })

})

//Actualiza un productoId de la coleccion products
app.put('/api/product/:productId', (req, res)=>{
 let productId = req.params.productId
 let update = req.body
 console.log(req.body)
 Product.findByIdAndUpdate(productId, req.body, (err, productUpdated) =>{
  if(err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

  res.status(200).send({product: productUpdated})
 } )
})

//Elimina el productoId de la coleccion products que se pasa como parametro
app.delete('/api/product/:productId', (req, res)=>{
  let productId = req.params.productId
  Product.findById(productId, (err, product)=>{
   if(err) return res.status(500).send({message: `Error al borrar el producto: ${err}`})

   product.remove(err => res.status(500).send({message: `Error al borrar el producto: ${err}`}))
   res.status(200).send({message: `El producto ha sido eliminado.`})
  })
})


mongoose.connect('mongodb://localhost:27017/shop', {useNewUrlParser: true, useUnifiedTopology: true }, (err, res)=>{
  if(err) {
    return console.log(`Error al conectar a la base de datos: ${err}`)
  }
  console.log('Conexion a la base de datos establecida...')

  app.listen(port, ()=>{
    console.log(`API corriendo en http://localhost:${port}`)
  })

})

