
const Cart=require('../Model/CArtModel');

const AddCart= async (req,res)=>{
    try {
const Cart=require('../Model/CArtModel');
        const data=new Cart({
            product_id:req.body.product_id,
            price:req.body.price,
            vendor_id:req.body.vendor_id,
            store_id:req.body.store_id,
        })
        const product =await data.save();
        res.status(200).send({msg:true,DATA:product});

        
    } catch (error) {
        res.status(400).send('Error: ' + error.message)
        
    }
}
module.exports={
    AddCart
}