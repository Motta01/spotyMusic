'use strict'
var User = require('../model/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../service/jwt');
var fs= require('fs');
var path = require('path');

function proof(rep,res){
    res.status(200).send({message: 'controll proof'});
}

function saveUser(req,res){
    var user = new User();
    var params = req.body;

    user.name = params.name;
    user.surname= params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image= 'null';
        console.log(params);
    if(params.password){
    bcrypt.hash(params.password,null,null, function(err,hash){
        console.log(hash);
        user.password=hash;
        if(user.name != null && user.surname!= null && user.email!=null){
            //guardar usuario
            user.save((err,userStored)=>{
                if(err){
                    res.status(500).send({message: 'error to save'});
                }else{
                    if(!userStored){
                        res.status(404).send({message: 'User not save'});
                    }else{
                        res.status(200).send({user: userStored});
                    }
                }
            });
        }else{
            res.status(200).send({message:'incomplete data'})
        }
    });
    }else{
            res.status(500).send({message:'Password not found'});
    }
}

function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()},(err,user)=>{
        if(err){
            res.status(500).send({message:'petition in error'});
        }else{
            if(!user){
                res.status(404).send({message: 'User does not exist'});
            }else{
                bcrypt.compare(password,user.password, function(error,chek){
                    console.log(error);
                    if(!error){
                        if(params.gethash){
                            res.status(200).send({token:jwt.createToken(user)});
                        }else{
                            res.status(200).send({user});                
                        }
                    }else{
                        res.status(404).send({message: 'User does not login'});
                        
                    }

                });
            }
        }
    });
} 

function updateUser(req,res){
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId,update,(err,userUpdated)=>{
        if(err){
            res.status(500).send({message:'Error of actualization'});

        }else{
            if(!userUpdated){
                res.status(404).send({message:'User not actualized'});    
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
    });
}

function uploadImage(req,res){
    var userId=req.params.id;
    var file_name = 'not image';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext= ext_split[1];

        if(file_ext== 'png'|| file_ext== 'gif' || file_ext =='jpg'){
            User.findByIdAndUpdate(userId,{image:file_name},(err,userUpdate)=>{
                if(err){
                    res.status(404).send({message:' User not find'});
                }else{
                    res.status(200).send({user: userUpdate});
                }
            });
        }else{
            res.status(200).send({message:'file extencion is not valid '});
        }
    }else{
        res.status(200).send({message:'image not upload'})
    }
}

function getImageFile(req,res){
    var imageFile= req.params.imagefile;
    fs.exists('./upload/users/'+imageFile,function(exists){
        if(exists){
            res.sendFile(path.resolve('./upload/users/'+imageFile));
            
        }else{
            res.status(200).send({message: 'Image does not exist'});
        }
    });

}

function getUser(req,res){
    User.find((err,userFind)=>{
        if(!err){ 
            res.status(200).send({user:userFind});
        }else{
            res.status(500).send({Error:err});
        }
    });
}

module.exports = {
    proof,
    getUser,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};