import React from 'react';
import MapView from './MapView.jsx';
import CityEventEntryEditor from './CityEventEntryEditor.jsx';
import querystring from 'querystring';
import { Col } from 'react-bootstrap';

export default class CityEditView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  render() {
    return (
      
        <div>
          <MapView />
          <CityEventEntryEditor createNewEvent={this.props.createNewEvent} currentEditCity={this.props.currentEditCity}/>

        </div>
      
    )
  }
}