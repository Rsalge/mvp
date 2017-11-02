import React from 'react';
import ListItem from './ListItem.jsx';
//need to either use items property to pass in turns or change to turns
var key = 0;
const List = (props) => (
    <div>
      { props.turns.slice().reverse().map(turn => <ListItem key={turn.id} turn={turn}/>)}
    </div>
)

export default List;
