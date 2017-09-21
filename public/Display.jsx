import React from 'react';

export default class Displayed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }
    this.changeValue = this.changeValue.bind(this);
  }
  changeValue () {
    this.props.changeCurrentEditCity(this.props.idx);
  }


  render() {
    return (
      <div>
          <h4 onClick={this.changeValue}>{this.props.city.locationName}</h4>
      </div>
    )
  }
}