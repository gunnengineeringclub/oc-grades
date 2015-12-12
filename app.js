var colors = require('colors'); // pretty console colors
var dotenv = require('dotenv'); // Requires .env file with API keys
dotenv.load();
var request = require('request');
var sendgrid = require('sendgrid')(process.env.MAILKEY);
var http = require('http');

var currentDate = "test";
getLastUpdated();

// console.log(getLastUpdated());

var interval = setInterval(function() {

  getLastUpdated();


}, 1000);



function getLastUpdated()
{
    var dateLast;
    var options = {
      host: 'staff.pausd.org',
      path: 'http://staff.pausd.org/~coconnell/Grades/frame1.html'
    // host: 'output.jsbin.com',
    // path: 'https://output.jsbin.com/powapefixo'
    };
    callback = function(response) {
      var str = '';

      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        // console.log(str);
        str = str.toString();
        var location = str.search("updated:");
        // console.log(typeof location);
        dateLast = str.substring(location-2,str.length);


        if(currentDate != dateLast && currentDate != "test")
        {
            // console.log("email");
            alertUsers();
        }
        else {
            // console.log("same");
            // console.log(currentDate);
        }

        currentDate = dateLast;



      });
    };
    http.request(options, callback).end();
}


// sends an email to all of the addresses registered in the firebase.
function alertUsers() {
  // get user emails
  request(process.env.DBHOST, function (err, res, body) {
    var gform_data = JSON.parse(body).result;
    var emails = [];
    for (var i = 0; i < gform_data.length; i++) {
      emails.push(gform_data[i]["What's your email?"]);
    }

    console.log("Sending to update to ".blue + emails.length.toString().magenta + " students...".blue);

    for (var x = 0; x < emails.length; x++) {
      sendgrid.send({
          to:       emails[x],
          from:     'oconnellgradeupdate@chemistry.xyz',
          fromname: 'Chemistry H Updates',
          subject:  "O'Connell Grades Posted",
          text:     "Mr. O'Connell has updated the grades."
        }, function(err, json) {
          if (err) { return console.error(err); }
        });
    }
    console.log(("Successfully sent emails to all " + emails.length.toString() + " students.").green);
  });
}
