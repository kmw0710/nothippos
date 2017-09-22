import React from 'react';
import Home from './Home.jsx'
const Hidden = (props) => {
	return <div>
			<div onClick={(event) => {
				console.log(props.tag)
				props.tagClicked(props.tag)}}>
				<h5 id="clicked">{props.tag}</h5>
			</div>
		</div>
}
export default Hidden;