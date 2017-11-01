import React from 'react';
//Each list item will be a players scorecard for a specific turn
const ListItem = (props) => (
  <div>
    <ul>
      <li>{ props.turn }</li>
      <li>{ props.turn }</li>
    </ul>
  </div>
)

export default ListItem;
