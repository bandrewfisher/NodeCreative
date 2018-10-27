var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var fileName = "/home/ec2-user/environment/Lab4/owl/public/dictionary.html"
  res.sendFile(fileName);
 // res.render('index', { title: 'Express' });
});

router.get('/dictionary', function(req, res, next) {
  var url = "https://owlbot.info/api/v1/dictionary/";
  url += req.query['q'];
  url += "?format=json";
  console.log(url);
  request(url).pipe(res);
});

router.get("/cities", function(req, res, next) {
  var fs = require('fs');
  fs.readFile(__dirname + "/cities.dat.txt", function(err, data) {
    if(err) throw err;
    
    var myRe = new RegExp("^" + req.query.q);
    var jsonResult = [];
    var cities = data.toString().split("\n");
    for(var i=0; i<cities.length; i++) {
      var result = cities[i].search(myRe);
      if(result != -1) {
        jsonResult.push({city: cities[i]});
      }
    }
    res.status(200).json(jsonResult);
  });
});
module.exports = router;
