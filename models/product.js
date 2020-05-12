//Aqui creamos un Modelo que es un especie de clase para instamciar 
//colecciones en la base de datos con documentos que tienen un esquema
//

//'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
  name: String,
  price: {type: Number, default: 0},
  category: {type: String, enum:['computer', 'iphone', 'ipad']},
  description: String
})
//creamos "Pruduct" para tener en la base de datos
//la coleccion "products" con documentos
//que soportan el esquena "ProductSauema"
module.exports = mongoose.model('Product', ProductSchema)
