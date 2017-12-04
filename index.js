'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT;
mongoose.connect('mongodb://localhost:27017/spotymusic',(error, Response) =>{
if(error){
    throw error;
}else{
    console.log("La base de datos esta corriendo");
     app.listen(port, function(){
    console.log("Servidor del api de musica escucha");
    
    });
}
});
 