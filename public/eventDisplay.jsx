import React from 'react';

export default class EventDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: '',
      date: '',
      time: '',
      location: '',
      notes: '',

    }
    this.handleInputChange = this.handleInputChange.bind(this);

  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
    console.log(this.state);
  }


  render() {
    return (
      <div>
        <form >
          <label>
            Activity Name: 
            <input type="text" name="activityName" defaultValue={this.props.event.activityName} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <label>
            Date: 
            <input type="text" name="date" defaultValue={this.props.event.date} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <label>
            Time: 
            <input type="text" name="date" defaultValue={this.props.event.time} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <label>
            Location: 
            <input type="text" name="location" defaultValue={this.props.event.location} onChange={this.handleInputChange}/> 
          </label>
          <br/>
          <label>
            Notes: 
            <input type="text" name="notes" defaultValue={this.props.event.notes} onChange={this.handleInputChange}/> 
          </label>
          <br/>
        </form>
        <br/>
        <br/>
      </div>
    )
  }
}