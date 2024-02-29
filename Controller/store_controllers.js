const { User_model } = require('../Model/userModel');

const  {store_model} = require('../Model/Store');

const Store = async (req, res) => {
    try {
        let data = req.body.vendor_id;
        console.log(data)
        let logo= req.file.filename
        console.log(logo)

        const find_vendor = await User_model.findOne({ _id: req.body.vendor_id });
               

        if (find_vendor) {
            const store_data = new store_model({
                vendor_id: req.body.vendor_id,
                vendor_email: req.body.vendor_email,
                logo: req.file.filename,
                address: req.body.address,
                pin: req.body.pin,
                location: {
                    type: "Point",
                    coordinates: [parseInt(req.body.lng), parseInt(req.body.lat)]
                }
            });

            const S_Data = await store_data.save();
            res.status(200).send({ message: 'success', data: S_Data });

        } else {
            res.status(200).send({ message: "This vendor already exists" });

        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// For Find_Store

const Find_store = async (req, res) => {
    try {
        const lat = parseFloat(req.body.Latitude);
        const lng = parseFloat(req.body.Longitude);

        const result = await store_model.aggregate([
            {
               $geoNear:{
                near:{type:"Point",coordinates:[lat,lng]},
                key:"location",
                maxDistance:1000*1609, // 1609 meters in a mile
                spherical:true,
                distanceField:"dist.calculated",
                
               }
            }
        ]);

        // Process the result as needed, for example, send it in the response
        res.status(200).send({ msg: "success", data: result });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}




module.exports = {
    Store,
    Find_store
};
