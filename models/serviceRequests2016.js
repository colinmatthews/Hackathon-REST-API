/**
 * Created by colin on 1/28/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceRequest2016Schema   = new Schema({

    ServiceRequestDescription: String,
    Department:String,
    MethodReceived:String,
    CreatedDate:String,
    Block:String,
    Street:String

});




module.exports = mongoose.model('ServiceRequest2016', serviceRequest2016Schema);