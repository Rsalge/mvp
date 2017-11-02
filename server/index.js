var express = require('express');
var bodyParser = require('body-parser');

var turns = require('../database-mysql');


var app = express();
app.use(bodyParser.urlencoded());
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
  console.log('CAUGHT THE POST', req.body);
  var data = req.body;
  var params = [data[0].playerName, data[0].diceRoll, data[0].victoryPoints, data[0].settlements, data[0].cities, data[0].roadLength, data[0].knightCount, data[0].turn]
  turns.saveTurn(params, function (err, results) {
    console.log('INSIDE SAVE TURN CALLBACK');
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
