const Address = require('../Model/addressModel');

const AddAddress = async (req, res) => {
  try {
    const existingAddress = await Address.findOne({ address: req.body.address });

    if (existingAddress) {
        const data=[];
      // Address already exists, update the existing address
      const update = await Address.findOneAndUpdate({ user_id: req.body.user_id}, {$set:{address: req.body.address} } ,{new: true});

      return res.status(200).json({ message: 'Address updated successfully', data: update });
    }

    // If the address doesn't exist, create a new one
    const addressToSave = new Address({
      user_id: req.body.user_id,
      address: req.body.address,
    });

    const savedAddress = await addressToSave.save();

    res.status(201).json({ message: 'Address created successfully', data: savedAddress });
  } catch (error) {
    res.status(500).json({ message: 'Error creating/updating address:', error });
  }
};

module.exports = {
  AddAddress,
};
