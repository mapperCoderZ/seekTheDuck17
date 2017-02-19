"use strict";
var express     = require('express'),
    bodyParser  = require('body-parser'),
    fs          = require('fs'),
    app         = express(),
    activities   = JSON.parse(fs.readFileSync('data/activities.json', 'utf-8'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Would normally copy necessary scripts into src folder (via grunt/gulp) but serving
//node_modules directly to keep everything as simple as possible
app.use('/node_modules', express.static(__dirname + '/node_modules')); 

//The src folder has our static resources (index.html, css, images)
app.use(express.static(__dirname + '/src')); 

app.get('/api/activities/page/:skip/:top', (req, res) => {
    const topVal = req.params.top,
          skipVal = req.params.skip,
          skip = (isNaN(skipVal)) ? 0 : +skipVal;  
    let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

    if (top > activities.length) {
        top = skip + (activities.length - skip);
    }

    console.log(`Skip: ${skip} Top: ${top}`);

    var pagedActivities = activities.slice(skip, top);
    res.setHeader('X-InlineCount', activities.length);
    res.json(pagedActivities);
});

app.get('/api/activities', (req, res) => {
    res.json(activities);
});

app.get('/api/activities/:id', (req, res) => {
    let activityId = +req.params.id;
    let selectedActivity = {};
    for (let activity of activities) {
        if (activity.id === activityId) {
           selectedActivity = activity;
           break;
        }
    }  
    res.json(selectedActivity);
});

app.post('/api/activities', (req, res) => {
    let postedActivity = req.body;
    let maxId = Math.max.apply(Math,activities.map((cust) => cust.id));
    postedActivity.id = ++maxId;
    postedActivity.picture = (postedActivity.id % 2 === 0) ? 'female' : 'male';
    activities.push(postedActivity);
    res.json(postedActivity);
});

app.put('/api/activities/:id', (req, res) => {
    let putActivity = req.body;
    let id = +req.params.id;
    let status = false;


    for (let i=0,len=activities.length;i<len;i++) {
        if (activities[i].id === id) {
            activities[i] = putActivity;
            status = true;
            break;
        }
    }
    res.json({ status: status });
});

app.delete('/api/activities/:id', function(req, res) {
    let activityId = +req.params.id;
    for (let i=0,len=activities.length;i<len;i++) {
        if (activities[i].id === activityId) {
           activities.splice(i,1);
           break;
        }
    }  
    res.json({ status: true });
});

app.get('/api/orders/:id', function(req, res) {
    let activityId = +req.params.id;
    for (let cust of activities) {
        if (cust.activityId === activityId) {
            return res.json(cust);
        }
    }
    res.json([]);
});


app.post('/api/auth/login', (req, res) => {
    var userLogin = req.body;
    //Add "real" auth here. Simulating it by returning a simple boolean.
    res.json(true);
});

app.post('/api/auth/logout', (req, res) => {
    res.json(true);
});

// redirect all others to the index (HTML5 history)
app.all('/*', function(req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
