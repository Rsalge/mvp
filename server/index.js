var express = require('express');
var bodyParser = require('body-parser');

var turns = require('../database-mysql');


var app = express();
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/turns', function (req, res) {
  console.log("INSIDE GET TURNS");
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
  var params = [data.playerName, data.diceRoll, data.victoryPoints, data.settlements, data.cities, data.roadLength, data.knightCount, data.turn]
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

app.post('/clear', function (req, res) {
  console.log('CALLING CLEAR TABLE');
  console.log(turns)
  turns.clearTable(function(err, data) {
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
