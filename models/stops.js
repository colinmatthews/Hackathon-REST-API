/**
 * Created by colin on 1/27/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nearbySchema = new Schema({
    name:String,
    distance:Number
});

var stopSchema   = new Schema({
    fid: Number,
    name: String,
    on_street: String,
    at_street: String,
    x: Number,
    y:Number,
    nearby: [nearbySchema]


});

module.exports = mongoose.model('Stop', stopSchema);