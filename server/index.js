var express = require('express');
var bodyParser = require('body-parser');

var turns = require('../database-mysql/');


var app = express();
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/turns', function (req, res) {
  console.log("INSIDE GET TURNS");
  turns.selectAll(function(err, data) {
    if(err) {
      console.log('GET TURNS ERROR: ', err);
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/turns',function (req, res) {
  var data = req.body;
  var params = [data.playerName, data.diceRoll, data.victoryPoints, data.settlements, data.cities, data.roadLength, data.knightCount, data.turn, data.game_id]
  turns.saveTurn(params, function (err, results) {
    if(err) {
      console.log('ERROR POSTING:', err);
      res.status(401).send('Post failed')
    } else {
      res.status(201).send(results)
    }
  })

})

app.get('/allGames', (req, res) => {
  turns.getAllGames((err,results) => {
    console.log('all games DB call');
  })
})
//
// app.post('/clear', function (req, res) {
//   turns.clearTable(function(err, data) {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   })
// })

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
