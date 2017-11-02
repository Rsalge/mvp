import React from 'react';
import ListItem from './ListItem.jsx';
//need to either use items property to pass in turns or change to turns
const List = (props) => (
  <table>
    <tbody>
      {console.log('TURN DATA: ', props.turns)}

    </tbody>
  </table>
)

export default List;
