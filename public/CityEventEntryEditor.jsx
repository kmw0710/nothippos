import React from 'react';
import EventDisplay from './EventDisplay.jsx';

export default class CityEventEntryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }

  }


  render() {
    let events = this.props.currentEditCity.events.map((event, i) => {
      return <EventDisplay event={event} key={i} idx={i} />
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