var dotenv = require('dotenv'); // Requires .env file with API keys
dotenv.load();
var sendgrid = require('sendgrid')(process.env.MAILKEY);

// This sends an email
sendgrid.send({
    to:       "gautam@mittal.net",
    from:     'Chemistry H Updates <oconnellgradeupdate@chemistry.xyz>',
    subject:  "O'Connell Grades Posted",
    text:     'The Ringo internal server error on machine with address ran into error'
  }, function(err, json) {
    if (err) { return console.error(err); }
    // console.log(json);
  });
