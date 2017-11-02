import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import PlayerList from './components/playerList.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: {
        playerName:'',
        diceRoll: 2,
        victoryPoints: 2,
        settlements: 2,
        cities: 0,
        roadLength:1,
        knightCount:0,
        turn: 0
      },
      playerCount: 0,
      players: [],
      currentPlayer: '',
      showForm: true,
      showPlayerInput: false,
      showTurn: false,
      pastTurns: []
    }
  }

  startTracking(data) {
    var firstPlayer = this.state.players.slice();
    firstPlayer = firstPlayer[0];
    var temp = Object.assign({}, this.state.turn);
    temp.playerName = firstPlayer;
    temp.turn = 1;
    this.setState({
      showPlayerInput: !this.state.showPlayerInput,
      showTurn: !this.state.showTurn,
      currentPlayer: firstPlayer,
      turn: temp
    })
  }

  handleClick(data) {
      var count = Number(this.state.playerCount);
      if (count > 7) {
        count = 7;
      }
      this.setState({
        showForm: !this.state.showForm,
        showPlayerInput: !this.state.showPlayerInput,
        players: Array(count).fill('')
      })
  }

  handlePlayerChange(data) {
    this.setState({
      playerCount: data.target.value
    })
  }

  handleDiceChange(data) {
    var temp = Object.assign({}, this.state.turn);
    temp.diceRoll = data.target.value;
    this.setState({
      turn: temp
    })
  }

  handleVictoryPointsChange(data) {
    var temp = Object.assign({}, this.state.turn);
    temp.victoryPoints = data.target.value;
    this.setState({
      turn: temp
    })
  }

  handleSettlementsChange(data) {
    var temp = Object.assign({}, this.state.turn);
    temp.settlements = data.target.value;
    this.setState({
      turn: temp
    })
  }

  handleCitiesChange(data) {
    var temp = Object.assign({}, this.state.turn);
    temp.cities = data.target.value;
    this.setState({
      turn: temp
    })
  }

  handleRoadChange(data) {
    var temp = Object.assign({}, this.state.turn);
    temp.roadLength = data.target.value;
    this.setState({
      turn: temp
    })
  }

  handleKnightChange(data) {
    var temp = Object.assign({}, this.state.turn);
    temp.knightCount = data.target.value;
    this.setState({
      turn: temp
    })
  }

  updatePlayerName(player, data) {
    var newPlayer = this.state.players.slice();
    newPlayer[player] = data.target.value;
    this.setState({
      players: newPlayer
    })
  }

  handleSubmit(data) {
    data.preventDefault();
  }

  handleNextTurn(data) {

    var turn = Object.assign({},this.state.turn);
    $.post('/turns', turn, (data, status) => {
      var players = this.state.players.slice()
      var nextPlayerIndex = players.indexOf(this.state.currentPlayer);
      nextPlayerIndex++;
      var nextPlayer = 0;
      if(nextPlayerIndex > players.length - 1) {
        nextPlayer = players[0]
        turn.turn = turn.turn + 1;
        this.setState({
          turn: turn
        })
      } else{
        nextPlayer = players[nextPlayerIndex]
      }
      turn.playerName = nextPlayer
      this.setState({
        turn: turn,
        currentPlayer: nextPlayer
      })
      this.getPastTurns();
      this.getLastTurn();
    })
  }

  getPastTurns() {
    $.ajax({
      url: '/turns',
      success: (data) => {
        this.setState({
          pastTurns: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  getLastTurn() {
    var turns = this.state.pastTurns.slice();
    var lastTurn = this.state.turn.turn - 1;

    var playerTurns = turns.filter(( turn ) => {
      var past = JSON.stringify(turn.playerName);
      var current = JSON.stringify(this.state.currentPlayer);
      return past === current;
    })
    console.log('ALL PREVIOUS TURNS: ', playerTurns);

    var previousTurn = playerTurns.filter((indivTurn) => {
      console.log('INDIV TURN: ', indivTurn.turn, ' LastTurn', lastTurn);
      return indivTurn.turn === lastTurn;
    })
    console.log('PEVIOUS TURN: ', previousTurn[0]);
    if(previousTurn) {
      console.log('SET PREVIOUS TURN');
      // previousTurn = JSON.stringify(previousTurn);
      var turn = Object.assign({},this.state.turn);
      // turn.diceRoll = previousTurn.diceRoll;
      if(lastTurn > 0) {
        console.log('SET TURN STATE');
        previousTurn[0].diceRoll = 0;
        previousTurn[0].turn = this.state.turn.turn;
        this.setState({
          turn: previousTurn[0]
        })
      }
    }
  }

  clearTable() {
    console.log('clearing table')
    $.post('/clear', {name: 'asdf'}, function(data) {
      console.log('POST SUCCESS: ', data)
    });
  }



  render () {
    const style = { display: this.state.showForm ? 'inline' : 'none' }
    const enterPlayerNames = {display: this.state.showPlayerInput ? 'inline' : 'none' }
    const turnStyle = {display: this.state.showTurn ? 'inline' : 'none' }
    return (<div>
      <h1>Settlers Tracker</h1>
      <div><input type="button" value='Clear history' onClick={this.clearTable.bind(this)}/></div>
      <form style={style} onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Number of players
          <input
            type="number"
            min="0"
            max="7"
            id="playerCount"
            value={this.state.playerCount}
            onChange={this.handlePlayerChange.bind(this)}
          /><input
            type="button"
            id="newGame"
            value="Get started"
            onClick={this.handleClick.bind(this)}
          />
        </label>
      </form>


      <form style={enterPlayerNames} onSubmit={this.handleSubmit.bind(this)} >
        <label>
          Enter player names in order, start with who is going first
        </label>
        {this.state.players.map((player, index) => (
          <input
            type="text"
            className="playerInput"
            value={player}
            onChange={this.updatePlayerName.bind(this, index)}
          />
        ))}
        <input
          type="button"
          value="Start Tracking!"
          onClick={this.startTracking.bind(this)}
        />
      </form>

      <table style={turnStyle}>
        <tbody>
          <tr>
            <th>Player Name</th>
            <th>Dice Roll</th>
            <th>Victory Points</th>
            <th>Settlements</th>
            <th>Cities</th>
            <th>Road Length</th>
            <th>Knight Count</th>
            <th>Turn Number</th>
            <th>Next Turn</th>
          </tr>
          <tr>
            <td>{this.state.currentPlayer}</td>
            <td>
              <input
                type="number"
                min="2"
                max="12"
                value={this.state.turn.diceRoll}
                onChange={this.handleDiceChange.bind(this)}
              />
            </td>
            <td>
              <input
                type="number"
                min="2"
                value={this.state.turn.victoryPoints}
                onChange={this.handleVictoryPointsChange.bind(this)}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="5"
                value={this.state.turn.settlements}
                onChange={this.handleSettlementsChange.bind(this)}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="4"
                value={this.state.turn.cities}
                onChange={this.handleCitiesChange.bind(this)}
              />
            </td>
            <td>
              <input
                type="number"
                min="1"
                max="15"
                value={this.state.turn.roadLength}
                onChange={this.handleRoadChange.bind(this)}
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                max="14"
                value={this.state.turn.knightCount}
                onChange={this.handleKnightChange.bind(this)}
              />
            </td>
            <td>{this.state.turn.turn}</td>
            <td><input type="button" value="Next Turn" onClick={this.handleNextTurn.bind(this)} /></td>
          </tr>
        </tbody>
      </table>
      <List turns={this.state.pastTurns}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
