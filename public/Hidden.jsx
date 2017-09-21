import React from 'react';
import Home from './Home.jsx'
const Hidden = (props) => {
	return <div>
			<div onClick={(event) => {
				console.log(props.tag)
				props.tagClicked(props.tag)}}>
				<button id="clicked">{props.tag}</button>
			</div>
		</div>
}
export default Hidden;