var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'student',
  password : 'student',
  database : 'settlers'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM turns', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var saveTurn = function(params, callback) {
  var queryStr = 'INSERT INTO turns(playerName, diceRoll, victoryPoints, \
                  settlements, cities, roadLength, knightCount, turn) \
                  value (?, ?, ?, ?, ?, ?, ?, ?)'
  connection.query(queryStr, params, function(err, results) {
    callback(err, results);
  });
}

module.exports.selectAll = selectAll;
module.exports.saveTurn = saveTurn;
