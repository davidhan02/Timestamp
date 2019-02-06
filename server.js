//Basic required imports for NodeJS
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// Create instance of express for app and instantiate bodyParser and cors
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors({optionSuccessStatus: 200}));
app.use(express.static('public')); //sets public file for static assets like css file


app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });

//GET call to return JSON that formats natural and unix date
app.get('/dateValues/:dateVal', (req, res, next) => {
    //Gets the request data for date
    var dateVal = req.params.dateVal;
    //Options for formatting date in natural date view
    var dateFormattingOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    if(isNaN(dateVal)){
        var naturalDate = new Date(dateVal);
        naturalDate = naturalDate.toLocaleDateString('en-us', dateFormattingOptions);
        var unixDate = new Date(dateVal).getTime()/1000;
    } else {
        var unixDate = dateVal;
        var naturalDate = new Date(dateVal * 1000);
        naturalDate = naturalDate.toLocaleDateString('en-us', dateFormattingOptions);
    };
    res.json({unix: unixDate, natural: naturalDate});
});

app.listen(3000, function(){
    console.log('Working');
});