import React from 'react';
//Each list item will be a players scorecard for a specific turn
const ListItem = (props) => (

  <table>
    {console.log('CHECKING FOR TURN: ', props.turn)}
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
        <td>{props.turn.playerName}</td>
        <td>{props.turn.diceRoll}</td>
        <td>{props.turn.victoryPoints}</td>
        <td>{props.turn.settlements}</td>
        <td>{props.turn.cities}</td>
        <td>{props.turn.roadLength}</td>
        <td>{props.turn.knightCount}</td>
        <td>{props.turn.turn}</td>
      </tr>

    </tbody>
  </table>



)

export default ListItem;
