var express = require('express');
var bodyParser = require('body-parser');

var turns = require('../database-mysql');


var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/turns', function (req, res) {
  turns.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/turns',function (req, res) {
  console.log('CAUGHT THE POST');
  turns.saveTurn(err)
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
