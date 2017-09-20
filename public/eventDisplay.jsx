import React from 'react';

export default class EventDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }

  }


  render() {
    return (
      <div>
        <form >
          <label>
            Event Name: 
            <input type="text" name="eventName" value={this.props.event.eventName}/> 
          </label>
          <br/>
          <label>
            Time: 
            <input type="text" name="eventName" value={this.props.event.time}/> 
          </label>
          <br/>
          <label>
            Location: 
            <input type="text" name="eventName" value={this.props.event.location}/> 
          </label>
          <br/>
        </form>
        <br/>
        <br/>
      </div>
    )
  }
}