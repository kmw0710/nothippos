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
      savedTags: ['hi', 'hello']
    }
    this.addCity = this.addCity.bind(this);
    this.addTags = this.addTags.bind(this);
    this.tagClicked = this.tagClicked.bind(this);
    this.saveNewTrips = this.saveNewTrips.bind(this);
    this.changeCurrentEditCity = this.changeCurrentEditCity.bind(this);
    this.createNewEvent = this.createNewEvent.bind(this);
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
      eventName: null
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

  saveEvent () {

  }

  addCity (locationName, dateOfArrival, dateOfDeparture) {
    var city = {
      locationName: locationName,
      dateOfArrival: dateOfArrival,
      dateOfDeparture: dateOfDeparture,
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
      url: "/saveNewTrip",
      data: {
        tag: atag,
        currentCities: {
          locationName: current[0],
          dateOfArrival: current[1],
          dateOfArrival: current[2]
        }
      }
    })
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
      url: "/savedTrips",
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
        <InputBar addCityToParent={this.addCity} addTagsToParent={this.addTags}
          saveNewTrips={this.saveNewTrips} currentCities={this.state.currentCities} changeCurrentEditCity={this.changeCurrentEditCity}
          />
        <EditPlanDisplay createNewEvent={this.createNewEvent} savedTags={this.state.savedTags} tagClicked={this.tagClicked} currentEditCity={this.state.currentEditCity}/>
      </div>
    )
  }
}