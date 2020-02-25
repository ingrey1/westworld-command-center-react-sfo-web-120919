import React from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details';
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'



  // Remember, there's many ways to do this. This doesn't have to be a class component. It's up to you.

   function Headquarters(props) { 

    const filterHosts = props.hosts.filter(h => !h.active)

    return(
      <Grid celled='internally'>
        <Grid.Column width={8} height={1}>

        <ColdStorage onHostClick={props.onHostClick} hosts={filterHosts} />

        </Grid.Column>
        <Grid.Column width={5} height={1}>
          <Details onChangeHostArea={props.onChangeHostArea} onChangeActiveStatus={props.onChangeActiveStatus} selectedHost={props.selectedHost} areas={props.areas}/>
        </Grid.Column>
        <Grid.Column width={3} height={1}>

        <LogPanel activateAll={props.activateAll} log={props.log} />

        </Grid.Column>
      </Grid>
    )


    }


export default Headquarters;
