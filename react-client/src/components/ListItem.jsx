import React from 'react';
//Each list item will be a players scorecard for a specific turn
const ListItem = ({turn}) => (
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

  
)

export default ListItem;
