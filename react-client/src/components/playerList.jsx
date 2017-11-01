import React from 'react';
import Player from './player.jsx';
//need to either use items property to pass in turns or change to turns
const playerList = (props) => (
  <div>
    { props.players.map(player => <Player player={player}/>)}
  </div>
)

export default playerList;
