let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

let bookMarksCollection = mongoose.Schema({
	id : {type: String},
	titulo : {type : String},
	descripcion : {type : String},
	url : {type :String}

});

let bookMarks = mongoose.model("bookmarks", bookMarksCollection);
let bookMarksList = {
	update: function(id){
		return bookMarks.findOneAndUpdate({id : bookMarks.id}, {$set: bookMarks}, {return : true})
		then(bookMarks=>{
				return bookmarks;
		})
		.catch(error=>{
				throw Error(error);
		});
	} 
};

module.exports = {bookMarksList};