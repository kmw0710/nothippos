import React from 'react';
import InputBar from './InputBar.jsx';
import Displayed from './Display.jsx';
import TopBar from './TopBar.jsx';
import Hidden from './Hidden.jsx';
import EditPlanDisplay from './EditPlanDisplay.jsx';
import axios from 'axios';
import querystring from 'querystring';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCities: [],
      tags: '',
      currentEditCity: {
        events: []
      },
      savedTags: ['hi', 'hello'],
      cityMarkers: []
    }
    this.addCity = this.addCity.bind(this);
    this.addTags = this.addTags.bind(this);
    this.tagClicked = this.tagClicked.bind(this);
    this.saveNewTrips = this.saveNewTrips.bind(this);
    this.changeCurrentEditCity = this.changeCurrentEditCity.bind(this);
    this.createNewEvent = this.createNewEvent.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.changeCityMarkers = this.changeCityMarkers.bind(this);
  }

  changeCityMarkers (location, position) {
    var newMarker = {
      cityName: location,
      position: position
    }
    var currentMarkers = this.state.cityMarkers;
    currentMarkers.push(newMarker);
    this.setState({
      cityMarkers: currentMarkers
    })
  }

  changeCurrentEditCity (idx) {
    var temp = this.state.currentCities[idx];
    this.setState ({
      currentEditCity: temp
    })
    console.log(this.state);
  }

  createNewEvent () {
    var newEvent = {
      activityName: '',
      date: '',
      time: '',
      location: '',
      notes: '',
    }
    var tempCurrentEditCity = this.state.currentEditCity;
    var tempEvents = tempCurrentEditCity.events;
    tempEvents.push(newEvent);
    tempCurrentEditCity.events = tempEvents;
    this.setState ({
      currentEditCity: tempCurrentEditCity
    })
    console.log(this.state.currentEditCity);
  }

  saveEvent (idx, activityName, date, time, location, notes) {
    var cityToEdit = this.state.currentEditCity;
    var eventsToEdit = cityToEdit.events;
    var eventEditChanges = {
      activityName: activityName,
      date: date,
      time: time,
      location: location,
      notes: notes
    };
    eventsToEdit[idx] = eventEditChanges;
    eventsToEdit.sort(function(a,b) {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else {
        if (a.time < b.time) {
          return -1;
        } else {
          return 1;
        }
      }
    })
    cityToEdit.events = eventsToEdit;
    var city = {
      locationName: cityToEdit.locationName,
      dateOfArrival: cityToEdit.dateOfArrival,
      dateOfDeparture: cityToEdit.dateOfDeparture,
      events: eventsToEdit
    }
    this.setState ({
      currentEditCity: city
    })
    console.log(this.state.currentEditCity);

  }

  addCity (locationName, dateOfArrival, dateOfDeparture, latLng) {
    var city = {
      locationName: locationName,
      dateOfArrival: dateOfArrival,
      dateOfDeparture: dateOfDeparture,
      latLng: latLng,
      events: [
        {
          activityName: 'Arrival',
          date: dateOfArrival,
          time: '',
          location: locationName,
          notes: '',
        },
        {
          activityName: 'Departure',
          date: dateOfDeparture,
          time: '',
          location: locationName,
          notes: '',
        }
      ]
    }
    var tempCities = this.state.currentCities;
    tempCities.push(city);
    this.setState ({
      currentCities: tempCities
    })
    console.log(this.state);
  }

  addTags (tripName) {
    this.setState ({
      tags: tripName
    })
    console.log(this.state);
  }

  saveNewTrips() {
    var atag = this.state.tags;
    var current = this.state.currentCities;
    axios({
      method: "POST",
      url: "/api/saveNewTrip",
      data: {
        tags: atag,
        currentCities: current
      }
    });
    this.saveToSavedTags(atag);
  }

  saveToSavedTags(tag) {
    this.state.savedTags.push(tag);
  }


  // saveNewTrips() {
  //   var atag = this.state.tags;
  //   var current = this.state.currentCities;
  //   axios.post('/saveNewTrip', {
  //     tag: atag,
  //     currentCities: {
  //       locationName: "London",
  //       dateOfArrival: "2017-09-20",
  //       dateOfDeparture: "2017-09-21"
  //     },
  //   })
  // }

  tagClicked(tag) {
    axios({
      method: "GET",
      url: "/api/savedTrips",
      param:{
        tag: tag
      }
    })
    .then(res => {
      console.log(res.data)
      this.setState({
        currentCities: res.data[0].currentCities,
        tags: res.data[0].tags
      })
    })
  }

  render() {

    return (
      <div>
        <InputBar changeCityMarkers={this.changeCityMarkers} addCityToParent={this.addCity} addTagsToParent={this.addTags}
          saveNewTrips={this.saveNewTrips} currentCities={this.state.currentCities} changeCurrentEditCity={this.changeCurrentEditCity}
          />
        <EditPlanDisplay cityMarkers={this.state.cityMarkers} saveEvent={this.saveEvent} createNewEvent={this.createNewEvent} savedTags={this.state.savedTags} tagClicked={this.tagClicked} currentEditCity={this.state.currentEditCity}/>
      </div>
    )
  }
}