const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
        min: 6
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TypePlace",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    pricing:{
        perDay: Number
    }, 
    images: [String],
    capacity: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true,
        minLength: 10
    },
    adresse: {
        country: String,
        city: String, 
        street: String,
        zipCode: Number,
        gps: {
            latitude: mongoose.Decimal128,
            longitude: mongoose.Decimal128
        }
    }

})

module.exports = mongoose.model("Place", placeSchema)