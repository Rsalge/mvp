import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import PlayerList from './components/playerList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turns: ['JHello','Hi'],
      playerCount: 0,
      players: Array(7).fill(''),
      showForm: true
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
      console.log('submit data: ', data.target.value);
      console.log('PLayerCOunt: ', this.state.playerCount);

      this.setState({
        showForm: !this.state.showForm
      })
  }

  handlePlayerChange(data) {
    this.setState({
      playerCount: data.target.value
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
  }

  render () {
    const style = { display: this.state.showForm ? 'inline' : 'none' }
    const enterPlayerNames = {display: !this.state.showForm ? 'inline' : 'none' }
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
            onSubmit={this.handleSubmit.bind(this)}
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
      <List turns={this.state.turns}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
