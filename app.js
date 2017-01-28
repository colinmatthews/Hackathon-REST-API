/**
 * Created by colin on 1/27/2017.
 */
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

var mongoose   = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds049935.mlab.com:49935/busdata'); // connect to our database

app.listen(port);
var Stop = require("./models/stops");

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});



// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

router.route('/stops')


    .post(function(req, res) {

        var stop = new Stop();      // create a new instance of the Bear model

        stop.fid = req.body.fid;
        stop.name = req.body.name;
        stop.on_street = req.body.on_street;
        stop.at_street = req.body.at_street;
        stop.x = req.body.x;
        stop.y = req.body.y;
        stop.nearby = req.body.nearby;


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

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        var params = req.params.stop_id;
        Stop.findOne({'fid':params}, function(err, stop) {
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

console.log('App listening on port ' + port);