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
  var data = req.body;
  var params = [data.playerName, data.diceRoll, data.victoryPoints, data.settlements, data.cities, data.roadLength, data.knightCount, data.turnNum]
  turns.saveTurn(params, function (err, results) {
    if(err) {
      console.log('ERROR POSTING:', err);
      res.status(401).send('Post failed')
    } else {
      console.log('RESULTS FROM POST', results);
      res.status(201).send(results)
    }
  })
})

app.get('/lastTurn', function (req, res) {
  turns.getLastTurn(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
