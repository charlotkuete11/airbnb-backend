const Place = require("../models/place.model")
const User = require("../models/user.model")


exports.getPlaces = (req, res) => {
    Place.find({}, (err, places) => {
        if(places){
            res.status(200).send({
                obj: places
            })
        }
    }).populate("owner").populate("type")
}    



exports.getPlacesByUser = (req, res) => {
    const userId = req.userToken.id;
    User.findById(userId, (err, User) =>{
        if(err || !User.places){
            return res.status(404).send({
                message: "no places found",
                obj: null
            })
        }
        return res.status(200).send({
            obj: User.places
        })
    }).populate("places")
}

exports.getPlaceByUser = (req, res) => {
    Place.findById(req.params.id, (err, place) => {
        if(place){
            res.status(200).send({
                obj: place
            })
        }
    }).populate("owner").populate("type")
}

exports.getPlaceById = (req, res, next) => {
    console.log("n'importe quoi")
    Place.findById(req.params.id, (err, place) => {
        if(!place){
            next({
                error: 404,
                message: "Place requested not found"
            })
        }

        res.status(200).send({
            obj: place
        })
        
    }).populate("owner").populate("type")
}

exports.addPlaces = (req, res) => {

    Place.create(req.body)
        .then(place => {
            console.log(place);

            //Mise a jour du tableau de place de l'utilisateur
            User.findByIdAndUpdate(req.userToken.id, {$push: {"places": place}}, {safe: true, upsert: true}, (err, data) =>{
                if(!err){
                    res.status(201).send({
                        message: "place created",
                        obj: place
                    })
                }
            })
        })
        .catch(err => res.send(err))
}

exports.updatePlace = (req, res) => {
    Place.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(updatedPlace =>{
            //Mise a jour du tableau des places de l'utilisateur
            User.findById(req.userToken.id, (err, user)=>{
                if(!err || user){
                    user.places.map(place => {
                        if(place._id == updatedPlace._id){
                            return updatedPlace;
                        }
                    })
                }
            })

            return res.status(200).send({
                message: "Place updated by id",
                obj: updatedPlace
            })
        })
        .catch( err => {
            return res.status(403).send({ 
                message: "id does not exist in DataBase",
                obj: null
            })
        })
}

exports.deletePlace = (req, res) => {
    Place.findByIdAndRemove(req.params.id, (place) => {
        User.findByIdAndUpdate(req.userToken.id, {$pull: {places: {_id: place._id}}}, {safe: true}, (err, data)=>{
            if(!err || data){
                res.status(200).send({ 
                    message: "Place deleted successfully",
                    obj: place
                })
            }
        })
    })
}