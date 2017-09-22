import React from 'react';
import TopBar from './TopBar.jsx';
import SeeAllCities from './SeeAllCities.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class ShowCityTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }


  render() {
    return (
      <div>
          <TopBar savedTags={this.props.savedTags} tagClicked={this.props.tagClicked}/>
          <SeeAllCities zoom={this.props.zoom} mapCenter={this.props.mapCenter} currentCities={this.props.currentCities} tags={this.props.tags} 
          cityMarkers={this.props.cityMarkers}/>
      </div>
    )
  }
}