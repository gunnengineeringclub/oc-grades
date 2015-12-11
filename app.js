var colors = require('colors'); // pretty console colors
var dotenv = require('dotenv'); // Requires .env file with API keys
dotenv.load();
var sendgrid = require('sendgrid')(process.env.MAILKEY);
var Firebase = require('firebase');
var listdb = new Firebase(process.env.DBHOST);
var http = require('http');

var currentDate = "test";
getLastUpdated();

// console.log(getLastUpdated());

var interval = setInterval(function() {
  // console.log("test");
  // console.log(currentDate);
  getLastUpdated();


}, 1000);



function getLastUpdated()
{
    var dateLast;
    var options = {
    //   host: 'staff.pausd.org',
    //   path: 'http://staff.pausd.org/~coconnell/Grades/frame1.html'
    host: 'output.jsbin.com',
    path: 'https://output.jsbin.com/powapefixo'
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

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'


// sends an email to all of the addresses registered in the firebase.
function alertUsers() {
  // get user emails
  listdb.once('value', function (s) {
    var list = s.val();
    var num_emails = 0;
    for (var e in list) {
      num_emails++;
    }
    console.log("Sending to update to ".blue + num_emails.toString().magenta + " students...".blue);

    for (var email_key in list) {
      sendgrid.send({
          to:       list[email_key],
          from:     'oconnellgradeupdate@chemistry.xyz',
          fromname: 'Chemistry H Updates',
          subject:  "O'Connell Grades Posted",
          text:     "Mr. O'Connell has updated the grades."
        }, function(err, json) {
          if (err) { return console.error(err); }
        });
    }
    console.log(("Successfully sent emails to all " + num_emails + " students.").green)
  });
}
