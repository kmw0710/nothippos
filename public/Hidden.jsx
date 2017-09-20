import React from 'react';

const Hidden = (props) => {

	return <a onClick={props.tagClicked}>{props.tag}</a>
}

export default Hidden;