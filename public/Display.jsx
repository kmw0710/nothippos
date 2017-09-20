import React from 'react';
const Displayed = (props) => {
	return <div>
		<h1>{props.city.locationName}</h1>
		<ul>{props.city.dateOfArrival}</ul>
		<ul>{props.city.dateOfDeparture}</ul>
	</div>			
}
export default Displayed;