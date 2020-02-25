import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
import * as Images from '../services/Images'
import HostInfo from './HostInfo'


const Details = (props) => {
  // We'll render the logo if no host is selected. But if a host does get selected....
  // Watch the video to see how this works in the app.

  const renderSomething = () => (<Image size='medium' src={Images.westworldLogo}/>)
  const render = props.selectedHost.id ? <HostInfo onChangeHostArea={props.onChangeHostArea} areas={props.areas} onChangeActiveStatus={props.onChangeActiveStatus} selectedHost={props.selectedHost} /> : renderSomething()  

  return(
    <Segment id="details" className="HQComps">
      {render}
    </Segment>
  )
}

export default Details
