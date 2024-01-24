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

module.exports = {
    Store
};
