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
        diceRoll: 0,
        victoryPoints: 0,
        settlements: 0,
        cities: 0,
        roadLength:0,
        knightCount:0,
        turnNum: 0
      },
      playerCount: 0,
      players: [],
      currentPlayer: '',
      showForm: true,
      showPlayerInput: false,
      showTurn: false,
      currentTurn: 0
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/turns',
      success: (data) => {
        console.log('TURN DATA: ', data);
        this.setState({
          turn: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
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
      victoryPoints: temp
    })
  }

  handleSettlementsChange(data) {
    var temp = Object.assign({}, this.state.turn);
    temp.settlements = data.target.value;
    this.setState({
      settlements: temp
    })
  }

  handleCitiesChange(data) {
    var temp = Object.assign({}, this.state.turn);
    temp.cities = data.target.value;
    this.setState({
      cities: temp
    })
  }

  handleRoadChange(data) {
    var temp = Object.assign({}, this.state.turn);
    temp.roadLength = data.target.value;
    this.setState({
      roadLength: temp
    })
  }

  handleKnightChange(data) {
    var temp = Object.assign({}, this.state.turn);
    temp.knightCount = data.target.value;
    this.setState({
      knightCount: temp
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
    console.log("Next Turn");
    var turn = Object.assign({},this.state.turn);
    $.post('/turns', turn, function(data, status) {
      console.log('POST REQUEST RETURNED');
    })

  }

  startTracking(data) {
    console.log('PLAYERS: ', this.state.players);
    var firstPlayer = this.state.players.slice();
    firstPlayer = firstPlayer[0];
    this.setState({
      showPlayerInput: !this.state.showPlayerInput,
      showTurn: !this.state.showTurn,
      currentPlayer: firstPlayer,
      currentTurn: 1
    })


  }

  render () {
    const style = { display: this.state.showForm ? 'inline' : 'none' }
    const enterPlayerNames = {display: this.state.showPlayerInput ? 'inline' : 'none' }
    const turnStyle = {display: this.state.showTurn ? 'inline' : 'none' }
    return (<div>
      <h1>Settlers Tracker</h1>

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
            <td>{this.state.currentTurn}</td>
            <td><input type="button" value="Next Turn" onClick={this.handleNextTurn.bind(this)} /></td>
          </tr>
        </tbody>
      </table>
      {/* <List turns={this.state.turns}/> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
