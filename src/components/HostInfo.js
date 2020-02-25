import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {
  state = {
    options: this.props.areas.map(a => {
      return {
        key: a.name,
        text: a.name,
        value: a.name
      }
    
    }),
    value: this.props.selectedHost.area
  
    //value: this.props.selectedHost.area
    // This state is just to show how the dropdown component works.
    // Options have to be formatted in this way (array of objects with keys of: key, text, value)
    // Value has to match the value in the object to render the right text.

    // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedHost !== prevProps.selectedHost) {

      this.setState(prevState => {
        return {...prevState,
        value: this.props.selectedHost.area} 
      })
         
    }
  }


  handleChange = (e, {value}) => {
      console.log("handleChange, value: ", value)
      
      this.setState(previousState => {
        return {
          ...previousState,
          value: value
        }
      }, () => this.props.onChangeHostArea(this.state.value))
      

    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
  }

  toggle = () => {
    console.log("The radio button fired");
  }

  render(){
    console.log("this is the initial value for host area on render", this.props.selectedHost.area)
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={this.props.selectedHost.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {this.props.selectedHost.firstName} | { this.props.selectedHost.gender === "Male" ? <Icon name='man' /> : <Icon name='woman' />}
                { /* Think about how the above should work to conditionally render the right First Name and the right gender Icon */ }
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.props.onChangeActiveStatus}
                  label={this.props.selectedHost.active ? "Active": "Decomissioned"}
                 
                  checked={this.props.selectedHost.active}
                  
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.state.value}
                options={this.state.options}
                placeholder="Select an area"
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
