import React from 'react';
import Display from './Display.jsx';
import { Col } from 'react-bootstrap';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-places-autocomplete';

export default class InputBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tripName: '',
      locationName: '',
      dateOfArrival: '',
      dateOfDeparture: '',
      latLng: '',
      address: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddCity = this.handleAddCity.bind(this);
    this.handleAddTripName = this.handleAddTripName.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(address) {
    this.setState({
      address: address
    })
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
    console.log("is this working?", this.state.address);
    geocodeByAddress(this.state.address)
      .then(results => { 
        console.log('2', results);
        return getLatLng(results[0]);
      })
      .then(latLng => {
        console.log("is this messing up", latLng);
        this.setState({
          latLng: latLng
        })
        console.log('Success', latLng)
      })
      .then(()=>{
        this.props.addCityToParent(this.state.address, this.state.dateOfArrival, this.state.dateOfDeparture, this.state.latLng);
      })
      .then(()=> {
        this.props.changeCityMarkers(this.state.locationName, this.state.latLng);
      })
      .catch(error => console.error('Error', error))
  }

  handleAddTripName(event) {
    event.preventDefault();
    this.props.addTagsToParent(this.state.tripName);
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }

    let city = this.props.currentCities.map((city, i) => {
      return <Display city={city} currentCities={this.state.currentCities} key={i} idx={i} changeCurrentEditCity={this.props.changeCurrentEditCity}/>
    });
    return ( 
      <Col sm={5} md={4}>
        <div>
         <h2>Input Bar</h2>
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
            <PlacesAutocomplete inputProps={inputProps} type="text" name="locationName" value={this.state.locationName} onChange={this.handleInputChange}/> 
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
        {city}
        <form>
          <button type="Submit" onClick={(event) => {
            this.props.saveNewTrips()
          }}>Save</button>
        </form>
      </div>
    </Col>
  )
 }
}