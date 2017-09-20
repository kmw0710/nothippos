import React from 'react';
import Hidden from './Hidden.jsx';
import axios from 'axios';

class TopBar extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showDiv: false
		}
	this.showSavedTags = this.showSavedTags.bind(this);
	this.tagClicked = this.props.tagClicked.bind(this);
	}

	showSavedTags () {
    if (this.state.showDiv === true) {
    	this.setState({
     	  showDiv: false
      })
    } else if (this.state.showDiv === false){
    	this.setState({
        showDiv: true	
      })
    }
  }

  createNewTrip() {
  	axios.get('/')
  		.then(res => {
  			console.log(res);
  		})
  		.catch(err => {
  			console.log(err);
  		})
  }

	render(){
		let savedTags = this.props.savedTags.map((tag) => {
		if (this.state.showDiv === true) {
			return <Hidden tag={tag} tagClicked={this.props.tagClicked}/>
			}
		})
		return <div class="topBar">
			<button onClick={this.createNewTrip}> Create New Trip</button>
	    <button onClick={this.showSavedTags}>savedTrip</button>
	    {savedTags}
	    <button>Profile</button>	    
    </div>
	}
}
export default TopBar;