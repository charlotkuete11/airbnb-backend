

exports.isOwner = (req, res, next) => {
    let type = req.userToken.type
    if(type != "OWNER"){
        return res.status(403).send({ message: "Unauthorized", obj: null})
    }
    next();
}

exports.belongsTo = (req, res, next) => {
    if(req.params.id != req.userToken.id){
        return res.status(403).send({message: "You didn't create the place", obj: null});
    }
    next();
}

exports.verifyAdmin = (req, res, next) => {
    if(!req.userToken.isAdmin){
        return res.status(403).send({
            message: "Vous n'avez pas la permission d'effectuer cette action",
            obj: null
        })
    }
    next();
}