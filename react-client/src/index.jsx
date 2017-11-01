import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turns: ['JHello','Hi'],
      playerCount: 0
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

  handleSubmit(data) {
      console.log('submit data: ', data.target.value);
      console.log('PLayerCOunt: ', this.state.playerCount);
      $(".newGame").hide();
  }

  handlePlayerChange(data) {
    this.setState({
      playerCount: data.target.value
    })
  }

  render () {
    return (<div>
      <h1>Settlers Tracker</h1>
      <form class="newGame">
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
            value="Start tracking!"
            onClick={this.handleSubmit.bind(this)}
          />
        </label>
      </form>
      <List turns={this.state.turns}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
