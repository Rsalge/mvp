import React from 'react';
//Each list item will be a players scorecard for a specific turn
const ListItem = (props) => (
  <div>
    <ul id ="turn">
      <li class="turnItem">{ props.turn }</li>
      <li class="turnItem">{ props.turn }</li>
    </ul>
  </div>
)

export default ListItem;
