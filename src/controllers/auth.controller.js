const bcrypt = require('bcrypt'); // importer notre package bcrypt
const jwtHelper = require("../helpers/jwthelper");

require("dotenv").config();

const User = require("../models/user.model");
const saltRounds = 10;


exports.VerifyToken = (req, res) =>{

}
exports.register = (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
    });
    
    user.save()
    .then( usr => {
        let usrToken = jwtHelper.generateToken(
            {
                id: usr.id, 
                isAdmin: usr.isAdmin,
                type: usr.type
            },
            process.env.JWT_SECRET, 
            60 * 900
        )
        
        res.status(201).send({
            auth: true,
            message: "User logged",
            token: usrToken
        });
    })
    .catch( err => {
        console.log(err);
        res.status(404).send(err)
    })
}

exports.signIn = async (req, res)=>{
    const user = await User.findOne({ 
        email: req.body.email
    });
    
    if(user != null){
        const itCorrespond = bcrypt.compareSync(req.body.password, user.password);
        if(itCorrespond){
            let usrToken = jwtHelper.generateToken(
                {
                    id: user.id, 
                    isAdmin: user.isAdmin,
                    type: user.type
                },
                process.env.JWT_SECRET,
                60 * 900
            )
            
            return res.status(200).send({
                auth: true,
                message: "User logged",
                token: usrToken
            });
        }else{
            return res.status(404).send({
                auth:false, 
                message:"password incorrect",
                token: null
            })
        }
    }else{
        return res.status(404).send({
            auth: false,
            message: "email  incorrect",
            token: null
        })
    }
}