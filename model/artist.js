'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = Schema({
        name: string,
        description: string,
        image: string
});
module.exports = mongoose.model('Artist', ArtistSchema);