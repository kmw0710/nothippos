import React from 'react';

export default class InputBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tripName: '',
      locationName: '',
      dateOfArrival: '',
      dateOfDeparture: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddCity = this.handleAddCity.bind(this);
    this.handleAddTripName = this.handleAddTripName.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
  }

  handleAddCity(event) {
    event.preventDefault();
    this.props.addCityToParent(this.state.locationName, this.state.dateOfArrival, this.state.dateOfDeparture);
  }

  handleAddTripName(event) {
    event.preventDefault();
    this.props.addTagsToParent(this.state.tripName);
  }

  render() {
    return ( 
      <div>
       <h2>Nav Bar</h2>
       <form onSubmit={this.state.handleAddCity}>
        <label>
          Trip Name: 
          <input type="text" name="tripName" value={this.state.tripName} onChange={this.handleInputChange}/> 
        </label>
        <br/>
        <input type="submit" value="Create" onClick={this.handleAddTripName}/>
      </form>
      <br/>
      <br/>

      <form >
        <label>
          Location: 
          <input type="text" name="locationName" value={this.state.locationName} onChange={this.handleInputChange}/> 
        </label>
        <br/>
        <br/>
        <label>
          Date of Arrival: 
          <input type="text" name="dateOfArrival" value={this.state.dateOfArrival} onChange={this.handleInputChange}/> 
        </label>
        <br/>
        <br/>
        <label>
          Date of Departure: 
          <input type="text" name="dateOfDeparture" value={this.state.dateOfDeparture} onChange={this.handleInputChange}/> 
        </label>
        <br/>
        <input type="submit" value="Add" action="#" onClick={this.handleAddCity} />
      </form>
    </div>
  )
 }
}

