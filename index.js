const express=require('express');
const app=express();
app.use(express.json())
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Restful-API').then(()=>{
    console.log('Mongo is connected')
},(err)=>{
    console.log('database not connected')
})

let User_Route=require('./Routes/user_route')
app.use('/',User_Route)

const store_route = require('./Routes/store_route')



app.use('/',store_route)


// for category routes

const category_route = require('./Routes/category_route')
app.use('/category',category_route)

// for product routes

const product_route = require('./Routes/sub-categoryRoute')
app.use('/sub-category',product_route)


//for produc_route routes

const produc_route = require('./Routes/product_rout')
app.use('/api',produc_route)

// for count all data routes
const common_route=require('./Routes/common.route');

app.use('/',common_route)

// for Ad to Cart routes
const CartRoute=require('./Routes/add-to-cart');

app.use('/',CartRoute)

// for Address
const Addressroute=require('./Routes/address')

app.use('/',Addressroute)

// error handling middleware

app.listen(3000,()=>{
    console.log('Server Start on port 3000')
})