import React from 'react';
import InputBar from './InputBar.jsx';
import Display from './Display.jsx';

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

	render() {
    let city = this.state.currentCities.map((city) => {
      return <Displayed city={city} currentCities={this.state.currentCities} />
    });
		return (
			<div>
        <TopBar createNewTrip={this.createNewTrip} 
          savedTags={this.state.savedTags} showDiv={this.state.showDiv}/>
	      <InputBar addCityToParent={this.addCity} addTagsToParent={this.addTags}/>
        {city}
			</div>
		)
	}
}
