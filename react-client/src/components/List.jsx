import React from 'react';
import ListItem from './ListItem.jsx';
//need to either use items property to pass in turns or change to turns
const List = (props) => (
    <div>
      {console.log('TURN DATA: ', props.turns)}
      { props.turns.slice().reverse().map(turn => <ListItem turn={turn}/>)}
    </div>
)

export default List;
