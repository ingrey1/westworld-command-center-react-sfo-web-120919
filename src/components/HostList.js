import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host'

const HostList = (props) => {

  return(
    <Card.Group itemsPerRow={6}>
      {props.hosts.map(h => <Host onHostClick={props.onHostClick} key={h.id} host={h} />)}
    </Card.Group>
  )
}

export default HostList
