'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbuemSchema = Schema({
        title: string,
        description: string,
        year: Number,
        image: string,
        artist: {type: Schema.ObjectId, ref: 'Artist'}
});

module.exports = mongoose.model('Album', AlbuemSchema);