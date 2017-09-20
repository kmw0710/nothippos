import React from 'react';
import Home from './Home.jsx'

const Hidden = (props) => {
	return <div>
			<a onClick={(event) => {
				props.tagClicked(props.tag)
			}}>
			{props.tag}
			</a>
		</div>
}

export default Hidden;