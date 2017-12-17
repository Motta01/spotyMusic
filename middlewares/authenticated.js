'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso';

exports.ensureAuth = function(req,res, next)
{
    if(!req.headers.authorization){
        return res.status(403).send({message: 'petition dont have authenticated header'});
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    try {
        var payload = jwt.decode(token,secret);
        if(payload.exp <= moment().unix()){
            return res.status(404).send({message: 'token has expired '});
        }
    } catch (error) {
        //console.log(error);
        return res.status(404).send({message: 'token is not valid'});
    }
    req.user = payload;
    next();
    
};