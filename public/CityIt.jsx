import React from 'react';

export default class CityIt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    let city = this.props.currentCities.map((city, i) => {
      return (
        <div className="eachCity">
          <h4> {city.locationName} </h4>
          <h4> <small> {city.dateOfArrival} - {city.dateOfDeparture} </small> </h4>

        </div>
       )
    });
    return (
        <div className="allCity">
          <h4> <b> {this.props.tags} </b> </h4>
          {city}

          
        </div>
    )
  }
}