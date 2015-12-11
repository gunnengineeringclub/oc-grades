var http = require('http');

var currentDate = "";
getLastUpdated();
// console.log(getLastUpdated());

var interval = setInterval(function() {
  console.log("test");
  console.log(currentDate);
}, 1000);



function getLastUpdated()
{
    var dateLast;
    var options = {
      host: 'staff.pausd.org',
      path: 'http://staff.pausd.org/~coconnell/Grades/frame1.html'
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
        var location = str.search("updated:");
        // console.log(location);
        dateLast = str.substring(location-2,str.length);
        currentDate = dateLast;
        // console.log(str);
        // console.log(dateLast.substring(14,dateLast.length));
      });
    };
    http.request(options, callback).end();
}

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
