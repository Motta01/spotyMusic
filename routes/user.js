'use strict'
var express = require('express');
var UserController = require('../controller/user');
var md_Auth = require('../middlewares/authenticated')
var api = express.Router();
var multipart = require('connect-multiparty');

var md_upload = multipart( {uploadDir: './upload/users'} );

api.get('/proof',md_Auth.ensureAuth,UserController.proof);
api.get('/getuser',UserController.getUser);
api.get('/imagefile/:imagefile',UserController.getImageFile);
api.post('/saveuser',UserController.saveUser);
api.post('/login',UserController.loginUser);
api.post('/upload-image-user/:id',[md_Auth.ensureAuth,md_upload],UserController.uploadImage);
api.put('/update-user/:id',md_Auth.ensureAuth,UserController.updateUser); 

module.exports = api; 