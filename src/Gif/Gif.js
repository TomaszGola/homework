import React, { Component } from 'react';

import './Gif.css'

class Gif extends Component {

	render() {

		const gif = this.props.gif;

		return(
			<div className="Gif">
				<img alt={gif.title} src={gif.images.fixed_width_downsampled.url}/>
			</div>
		)
	}
}

export default Gif;