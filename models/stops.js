/**
 * Created by colin on 1/27/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nearbySchema = new Schema({
    name:String,
    distance:Number,
    left:Boolean
});

var timeSchema = new Schema({
    time:String
});


var stopSchema   = new Schema({
    fid: Number,
    name: String,
    on_street: String,
    at_street: String,
    x: Number,
    y:Number,
    nearby: [nearbySchema],
    times_weekday:[timeSchema],
    times_weekend:[timeSchema]

});

module.exports = mongoose.model('Stop', stopSchema);