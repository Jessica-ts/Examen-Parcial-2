let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let {bookMarksList} = require("./model");
let { DATABASE_URL, PORT } = require( './config' );
let uuid = require("uuid");

let app = express();

let server;

app.put("/api/bookmarks/:id", jsonParser, (req,res)=>{
	let id= req.body.id;
	let idParams = req.params.id;
	let titulo = req.body.titulo;
	let descripcion = req.body.descripcion;
	let url = req.body.url;

	if(!id)
	{
		return res.status(406).json({
			message : "Proporciona el id del bookmark",
			status : 406
		});
	}

	if(id!= idParams)
	{
		return res.status(409).json({
			message : "Los id's no coinciden",
			status : 409
		});
	}

	if(titulo=="" && descripcion=="" && url=="")
	{
		return res.status(406).json({
			message : "Los campos de titulo, descripcion y url estan vacíos, proporciona alguno",
			status : 406
		});
	}

	let bookMarkU={ };
	bookMarkU.id=id;


	bookMarksList.update(bookMarkU)
	.then(bookMarks=>{
		if(bookmarks){
			if(titulo)
			{
				bookMarkU.titulo = titulo;
			}

			if(descripcion)
			{
				bookMarkU.descripcion = descripcion;
			}
			if(url)
			{
				bookMarkU.url = url;
			}
			return res.status(202).json(bookMarks);
		}
		
	})
	.catch(error=>{
		res.statusMessage="Hubo un error con la conexion de la BD";
		return res.status(500).send();
	})
	
})

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}