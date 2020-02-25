import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap'
import Headquarters from './components/Headquarters'
import Log from './services/Log'


class App extends Component {

  // As you go through the components given you'll see a lot of functional components.
  // But feel free to change them to whatever you want.
  // It's up to you whether they should be stateful or not.
  state = {
    areas: [],
    hosts: [],
    selectedHost: {},
    log: []
  }

  componentDidMount() {
     // set the initial hosts and areas
     this.getInitialAreas().then((areas) => this.setState(prevState => {
       return {
         ...prevState,
         areas: areas 
       }
     })).catch(err => console.log(err))

     this.getInitialHosts().then((hosts) => this.setState(prevState => {
      return {
        ...prevState,
        hosts: hosts 
      }
    })).catch(err => console.log(err))
  }

  getInitialAreas() {

    return fetch("http://localhost:3000/areas").then(resp => resp.json())

  }

  getInitialHosts() {

    return fetch("http://localhost:3000/hosts").then(resp => resp.json())

  }

  findHostsForArea = (areaName) => {
    
    return this.state.hosts.filter(h => (h.area === areaName) && h.active)
  }

  onHostClick = (host) => {
    // should also turn host red
   console.log("this host has been clicked: ", host)
    this.setState(prevState => {
      return {
        ...prevState,
        selectedHost: host
      }
    })
  } 

  onChangeActiveStatus = () => {
     this.setState(prevState => {
       return {
         ...prevState,
         hosts: prevState.hosts.map(h => {
             if (h.id === prevState.selectedHost.id) {
               return {
                 ...h,
                 active: !prevState.selectedHost.active
               }
             } else {
               return h
             } 
         }),
         selectedHost: {
           ...prevState.selectedHost,
           active: !prevState.selectedHost.active
         }
       }
     })
     
     // testing notify
     const message = this.state.selectedHost.active ? `${this.state.selectedHost.firstName} has been deactivated`: `${this.state.selectedHost.firstName} has been activated at ${this.state.selectedHost.area}` 
     this.addMessageToLog(message, 'notify')

  } 

  onChangeHostArea = (area) => {
    this.setState(prevState => {
      return {
        ...prevState,
        hosts: prevState.hosts.map(h => {
          if(h.id === prevState.selectedHost.id) {
            return {
              ...h,
              area:area
            } 
          } else {
            return h
          }
        }),
        selectedHost: {
          ...prevState.selectedHost,
          area: area
        }
      }
    })
  }

  addMessageToLog = (message, status) => {
        let createdLog;
        if (status === 'warn') createdLog = Log.warn(message)
        else if (status === 'notify') createdLog = Log.notify(message)
        else createdLog = Log.error(message)
        this.setState(prevState => {
            return {
              ...prevState,
              log: [createdLog, ...prevState.log]
            }
        })

  }

  activateAll = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        hosts: prevState.hosts.map(host => {
          return {
            ...host,
            active: true
          }
        })
      }
    })
  }



  render(){
    return (
      <Segment id='app'>
        <WestworldMap onHostClick={this.onHostClick} findHostsForArea={this.findHostsForArea} areas={this.state.areas} />
        <Headquarters log={this.state.log} activateAll={this.activateAll}  onChangeHostArea={this.onChangeHostArea} onChangeActiveStatus={this.onChangeActiveStatus} onHostClick={this.onHostClick} hosts={this.state.hosts} selectedHost={this.state.selectedHost} areas={this.state.areas} />
  
      </Segment>
    )
  }
}

export default App;
