import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import PlayerList from './components/playerList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turns: [],
      playerCount: 0,
      players: [],
      currentPlayer: '',
      showForm: true,
      showPlayerInput: false,
      showTurn: false,
      playerName:'',
      diceRoll: 0,
      victoryPoints: 0,
      settlements: 0,
      cities: 0,
      roadLength:0,
      knightCount:0,
      turnNum: 0
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/turns',
      success: (data) => {
        this.setState({
          turns: data
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
    this.setState({
      diceRoll: data.target.value
    })
  }

  handleVictoryPointsChange(data) {
    this.setState({
      victoryPoints: data.target.value
    })
  }

  handleSettlementsChange(data) {
    this.setState({
      settlements: data.target.value
    })
  }

  handleCitiesChange(data) {
    this.setState({
      cities: data.target.value
    })
  }

  handleRoadChange(data) {
    this.setState({
      roadLength: data.target.value
    })
  }

  handleKnightChange(data) {
    this.setState({
      knightCount: data.target.value
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

  startTracking(data) {
    console.log('PLAYERS: ', this.state.players);
    var firstPlayer = this.state.players.slice();
    firstPlayer = firstPlayer[0];
    this.setState({
      showPlayerInput: !this.state.showPlayerInput,
      showTurn: !this.state.showTurn,
      currentPlayer: firstPlayer
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
          </tr>
          <tr>
            <td>{this.state.currentPlayer}</td>
            <td>
              <input
                type="number"
                min="2"
                max="12"
                value={this.state.diceRoll}
                onChange={this.handleDiceChange.bind(this)}
              />
            </td>
            <td>
              <input
                type="number"
                min="2"
                value={this.state.victoryPoints}
                onChange={this.handleVictoryPointsChange.bind(this)}
              />
            </td>
            <td>
              <input
                type="number"
                min="2"
                max="12"
                value={this.state.settlements}
                onChange={this.handleSettlementsChange.bind(this)}
              />
            </td>
            <td>
              <input
                type="number"
                min="2"
                max="12"
                value={this.state.cities}
                onChange={this.handleCitiesChange.bind(this)}
              />
            </td>
            <td>
              <input
                type="number"
                min="2"
                max="12"
                value={this.state.roadLength}
                onChange={this.handleRoadChange.bind(this)}
              />
            </td>
            <td>
              <input
                type="number"
                min="2"
                max="12"
                value={this.state.knightCount}
                onChange={this.handleKnightChange.bind(this)}
              />
            </td>
            <td>{this.state.currentTurn}</td>
          </tr>
        </tbody>
      </table>

      <List turns={this.state.turns}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
