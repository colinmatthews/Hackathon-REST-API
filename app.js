/**
 * Created by colin on 1/27/2017.
 */
var express = require('express');        // call express
var app = express();                 // define our app using express
var request = require('request');
var fs = require('fs');
var bodyParser = require('body-parser');
const busCSV = './csv/Transit_Windsor_Bus_Stops.csv';
const csv = require('csvtojson');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT;
app.listen(port || 8000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds049935.mlab.com:49935/busdata'); // connect to our database

var Stop = require("./models/stops");
var ExtendedStop = require("./models/extendedstops");

const UPLOAD = 0;

//****************
//
//
//  CSV to Json with posting to API
//
//
//***************


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {

    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/stops')


    .post(function(req, res) {

        var stop = new Stop();

        stop.fid = req.body.fid;
        stop.name = req.body.name;
        stop.on_street = req.body.on_street;
        stop.at_street = req.body.at_street;
        stop.x = req.body.x;
        stop.y = req.body.y;
        stop.nearby = req.body.nearby;
        stop.times_weekend = req.body.times_weekend;
        stop.times_weekday = req.body.times_weekday;


        console.log(req.body.name);

        // save the bear and check for errors
        stop.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Stop created!' });
        });

    })

    .get(function(req,res){

        Stop.find(function(err,stops){
           if(err){
               res.send(err);
           }
           res.send(stops);


        });


    });

router.route('/stops/:stop_id')


    .get(function(req, res) {
        var params = req.params.stop_id;
        Stop.findOne({'fid':params}, function(err, stop) {
            if (err)
                res.send(err);
            res.json(stop);
        });
    });

router.route('/extendedstops')

    .get(function(req,res){

        ExtendedStop.find(function(err,stops){
            if(err){
                res.send(err);
            }
            res.send(stops);


        });


    })

    .post(function(req, res) {

        var extendedStop = new ExtendedStop();

        extendedStop.FID = req.body.FID;
        extendedStop.FeatId1 = req.body.FeatId1;
        extendedStop.Route_Numb = req.body.Route_Numb;
        extendedStop.Route_Dire = req.body.Route_Dire;
        extendedStop.Bus_Orient = req.body.Bus_Orient;
        extendedStop.Bus_Stop_I = req.body.Bus_Stop_I;
        extendedStop.On_Street = req.body.On_Street;
        extendedStop.At_Street = req.body.At_Street;
        extendedStop.Location_O = req.body.Location_O;
        extendedStop.Location_A = req.body.Location_A;
        extendedStop.X = req.body.X;
        extendedStop.Y = req.body.Y;


        // save the bear and check for errors
        extendedStop.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'ExtendedStop created!' });
        });

    });

router.route('/extendedstops/:extendedstop_id')


    .get(function(req, res) {
        var params = req.params.extendedstop_id;
        ExtendedStop.findOne({'FeatId1':params}, function(err, stop) {
            if (err)
                res.send(err);
            res.json(stop);
        });
    });




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================

if(UPLOAD == 1 ) {
    csv()
        .fromFile(busCSV)
        .on('json', (function (jsonObj, err) {
            if (err) {
                // console.log(err);
            }

            var options = {
                uri: 'http://localhost:8000/api/extendedstops',
                method: 'POST',
                json: jsonObj
            };

            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body.id) // Print the shortened url.
                }
            });





            // combine csv header row and csv line to a json object
            // jsonObj.a ==> 1 or 4

        }))
        .on('done', (function (err) {

            console.log('end')
        }));

}


