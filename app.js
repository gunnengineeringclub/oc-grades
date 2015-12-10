var colors = require('colors'); // pretty console colors
var dotenv = require('dotenv'); // Requires .env file with API keys
dotenv.load();
var sendgrid = require('sendgrid')(process.env.MAILKEY);
var Firebase = require('firebase');
var listdb = new Firebase(process.env.DBHOST);

alertUsers(); // call this function when you want to tell everyone about the new OC grades



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
