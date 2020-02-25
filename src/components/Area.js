import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const Area = (props) => {

  const hostsForThisArea = props.findHostsForArea(props.area.name)   

  return <div className='area' id={props.area.name}>
    <h3 className='labels'>{null}</h3>

    <HostList onHostClick={props.onHostClick} hosts={hostsForThisArea} />


  </div>

}

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.area.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.area.name}. The limit for that area is ${props.area.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
