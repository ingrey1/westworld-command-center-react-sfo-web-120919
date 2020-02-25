import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area'


const WestworldMap = (props) => {

  return (
    <Segment id="map" >
      {props.areas.map(a => <Area onHostClick={props.onHostClick} findHostsForArea={props.findHostsForArea} area={a} key={a.id} />)}
    </Segment>
  )
}

export default WestworldMap
