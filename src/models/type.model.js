const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("TypePlace", typeSchema)