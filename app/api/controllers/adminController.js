const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminModel = require('../models/superAdminModel');

module.exports = {
    addAdmin: function(req, res, next){
        console.log(req.body);
        adminModel.find().then(result=>{
            if(result.length<1){
                adminModel.create({
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    password: req.body.password,
                    address: req.body.address,
                    img: req.file.path,
                    status: 1
                }, function(err, data){
                    if(err){
                        next(err);
                    }else{
                        res.json({
                            status: "Success",
                            message: "Register Successfully!",
                            data: null
                        });
                    }
                });
            }else {
                
                res.json({
                    status: "Failed",
                    message: "Cannot Register.Please ask Super Admin For Registeration",
                    data: null
                });
            }
        })
    },
    loginAdmin: function(req, res, next){
        _email = req.body.email,
        _password = req.body.password;
        _username = req.body.username;
        adminModel.findOne({email: _email}).then(admin => {
            if(admin.status === 0){
                res.json({
                    message: "Your Account is not Approved by Super Admin!"
                })
            } else {
                bcrypt.compare(_password, admin.password, (error, result)=>{
                    if(result){
                        const token = jwt.sign({id: result._id}, "mysecretkey", {expiresIn: "1h"});
                        res.json({
                            status: true,
                            message: "Record Found!",
                            data: {token: token, data: admin}
                        });
                    } else{
                        res.json({
                            message: "Invalid Email/Passowrd",
                            data: null
                        })
                    }
                })
            }
        }).catch(error=> {
            res.json({
                message: "Invalid Email/Password",
                data: null
            })
        })
    }

}