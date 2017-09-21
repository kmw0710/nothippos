import React from 'react';
import EventDisplay from './EventDisplay.jsx';

export default class CityEventEntryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentEditCity: this.props.currentEditCity
    }

  }

  componentDidUpdate (prevProps, prevState) {
  //   var currentCity = this.props.currentEditCity;
  //   this.setState({
  //     currentEditCity: currentCity
  //   })
    console.log(this.props.currentEditCity.events);
  }




  render() {

    var events = [].concat(this.props.currentEditCity.events)
      .map((event, i) => {
      return <EventDisplay saveEvent={this.props.saveEvent} event={event} key={event.activityName.toString() + event.location.toString()} idx={i} />
    });
    return (
      <div>
        <h4> Current City: {this.props.currentEditCity.locationName} </h4>
        <p> Date of Arrival: {this.props.currentEditCity.dateOfArrival} </p>
        {events}
        <button onClick={this.props.createNewEvent}> Create New Event </button>

        <p> Date of Departure: {this.props.currentEditCity.dateOfDeparture} </p>
      </div>
    )
  }
}