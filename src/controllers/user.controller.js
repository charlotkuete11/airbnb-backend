
const jwt = require('jsonwebtoken'); // importer JsonWebToken
const { validationResult } = require('express-validator');
require("dotenv").config();

const User = require("../models/user.model");



exports.delete = (req, res) => {
    if(!req.query.id){
        return res.status(403).send({ 
            message: "id does not exist",
        })
    }

    User.findByIdAndDelete(req.query.id, (user) => {
        res.send({ 
            message: "User deleted successfully",
            obj: user
        })
    })
}

exports.update = (req, res) => {
    var index = req.userToken.id;
    if(req.body.firstName && req.body.lastName && req.body.email){
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;


        User.findByIdAndUpdate(index, {$set: {firstName: firstName, lastName: lastName, email:email}}, {new: true})
            .then(updatedUser => {
                return res.send({
                    message: "User updated by id",
                    obj: updatedUser
                })
            })
            .catch( err => {
                return res.status(403).send({ 
                    message: "id does not exist in DataBase",
                    obj: null
                })
            })
    }else{
        return res.status(404).send({ 
            message: "missing parameters in the body", 
            obj: null
        })
    }
}

exports.findAll = (req, res) => {
    User.find({}, (err, user) => {
        res.status(200).send({
            obj: user
        })
    })
    
}


exports.findById = (req, res) => {
    // return res.send(req.originalUrl)
    if(!req.userToken.id){
        return res.status(403).send({ 
            message: "id does not exist",
        })
    }
    
    User.findById(req.userToken.id, (err, user) => {
        if(err){
            return res.status(404).send({message: err});
        }
        return res.status(200).send({
            obj: user
        });
    })
}
