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
app.listen(3000,()=>{
    console.log('Server Start on port 3000')
})