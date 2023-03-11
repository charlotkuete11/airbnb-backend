const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        max: 100,
        min: 3
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        max: 100,
        min: 3
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
        
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ["OWNER","CUSTOMER"],
        default: "CUSTOMER"
    },
    places: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place"
    }]
})

module.exports = mongoose.model('User', userSchema);