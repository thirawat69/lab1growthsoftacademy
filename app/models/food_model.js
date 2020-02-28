var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var typeObjectId = mongoose.Schema.Types.ObjectId;

var Food_Schema = new Schema({
  name: { type: String, default: null },
  calory: { type: Number, default: 0 },
  addDate: { type: Date, default: new Date() }
});

module.exports = mongoose.model("Food", Food_Schema);

// {
//     "_id": "_id","positionName" : "positionName","dateTime_create" : "dateTime_create"
// }
