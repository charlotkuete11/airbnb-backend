const TypePlace = require("../models/type.model");


exports.createTypePlace = (req, res) =>{
    const typePlace = new TypePlace({
        name: req.body.name
    })

    typePlace.save()
        .then(type => {
            res.status(200).send({
                message: "type created",
                obj: type
            })
        })
        .catch(err => res.status(400).send({
            message:"type not created",
            obj:null
        }))
}
exports.getAll = (req, res) => {
    TypePlace.find({}, (err, TypePlaces) => {
        if(!err) {
            res.status(200).send({
                obj: TypePlaces
            })
        }
    })
}

exports.updateTypePlace = (req, res) => {
    TypePlace.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(updatedTypePlace =>{
            return res.status(200).send({
                message: "TypePlace updated by id",
                obj: updatedTypePlace
            })
        })
        .catch( err => {
            return res.status(403).send({ 
                message: "id does not exist in DataBase",
                obj: null
            })
        })
}

exports.deleteTypePlace = (req, res) => {
    TypePlace.findByIdAndRemove(req.params.id, (typePlace)=>{
        res.status(200).send({ 
            message: "typePlace deleted successfully",
            obj: typePlace
        })
    })
}