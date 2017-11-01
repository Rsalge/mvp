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
  }

  render () {
    return (<div>
      <h1>Settlers Tracker</h1>
      <input
        type="number"
         id="playerCount"
        //  value={this.state.playerCount}
         onChange={this.handleSubmit.bind(this)}
       />
      <List turns={this.state.turns}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
