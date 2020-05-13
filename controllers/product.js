const Product = require('../models/product')

function getProducts(req, res){
  Product.find({}, (err, products)=>{
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!products) return res.status(404).send({message: `No existen productos`})
  
    res.status(200).send({products: products})
   })
}

function getProduct(req, res){
  let productId = req.params.productId
  Product.findById(productId, (err, product)=>{
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}` })
    if(!product) return res.status(404).send({message: `El producto no existe`})

    res.status(200).send({product: product})
  })
}

function saveProduct(req, res){
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
}

function updateProduct(req, res){
  let productId = req.params.productId
 let update = req.body
 console.log(req.body)
 Product.findByIdAndUpdate(productId, req.body, (err, productUpdated) =>{
  if(err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

  res.status(200).send({product: productUpdated})
 } )
}

function deleteProduct(req, rea){
  let productId = req.params.productId
  Product.findById(productId, (err, product)=>{
   if(err) return res.status(500).send({message: `Error al borrar el producto: ${err}`})

   product.remove(err => res.status(500).send({message: `Error al borrar el producto: ${err}`}))
   res.status(200).send({message: `El producto ha sido eliminado.`})
  })
}

module.exports = {
  getProducts,
  getProduct,
  saveProduct,
  updateProduct,
  deleteProduct
}