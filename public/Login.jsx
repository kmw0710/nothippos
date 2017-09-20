import React from 'react';

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}


	}
	render() {
    return (
  		<div>
	        <h2> Not Hippos Hippos </h2>
	        <h3> Plan your trip today! </h3>
	        <button> <a href="/auth/facebook">Login with Facebook</a></button>
  		</div>
    )
	}
}
