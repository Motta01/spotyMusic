'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
        name: string,
        surname: string,
        email: string,
        password: string,
        role: string,
        image: string
});

module.exports = mongoose.model('User', UserSchema);