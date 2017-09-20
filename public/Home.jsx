import React from 'react';
import InputBar from './InputBar.jsx';
import Displayed from './Display.jsx';
import TopBar from './TopBar.jsx';
import Hidden from './Hidden.jsx';
import axios from 'axios';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCities: [],
      tags: '',
      savedTags: ['hi', 'hello']
    }
    this.addCity = this.addCity.bind(this);
    this.addTags = this.addTags.bind(this);
    this.tagClicked = this.tagClicked.bind(this);
    this.saveNewTrips = this.saveNewTrips.bind(this);
  }

  addCity (locationName, dateOfArrival, dateOfDeparture) {
    var city = {
      locationName: locationName,
      dateOfArrival: dateOfArrival,
      dateOfDeparture: dateOfDeparture
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
      method: "post",
      url: "/saveNewTrips",
      data: {
        tag: atag,
        currentCities: [current[0], current[1], current[2]]
      }
    })
    .then(res => {
      return `your ${Tripname} is saved!`
    })
    .catch(err => {
      console.log(err)
    })
  }

  tagClicked(tag) {
    axios({
      method: "GET",
      url: "/savedTrips",
      param:{
        tag: tag
      }
    })
    .then(res => {
      this.setState({
        currentCities: res.data.currentCities,
        savedTags: res.data.savedTags
      })
    })
  }

  render() {
    let city = this.state.currentCities.map((city) => {
      return <Displayed city={city} currentCities={this.state.currentCities} />
    });
    return (
      <div>
        <TopBar createNewTrip={this.createNewTrip} savedTags={this.state.savedTags}
          tagClicked={this.tagClicked}/>
        <InputBar addCityToParent={this.addCity} addTagsToParent={this.addTags}
          saveNewTrips={this.saveNewTrips}/>
        {city}
        <form>
          <button type="Submit" onClick={(event) => {
            this.saveNewTrips()
          }}>Save</button>
        </form>
      </div>
    )
  }
}
