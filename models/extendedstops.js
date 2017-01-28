/**
 * Created by colin on 1/28/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var extendedStopSchema   = new Schema({
    fid: Number,
    FeatId1: String,
    on_street: String,
    Route_Numb: Number,
    Route_Dire: String,
    Bus_Orient: String,
    Bus_Stop_I: Number,
    On_Street: String,
    At_Street: String,
    Location_O: String,
    Location_A: String,
    X: Number,
    Y: Number
});


module.exports = mongoose.model('ExtendedStop', extendedStopSchema);