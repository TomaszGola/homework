import React, { Component } from 'react';
import Gif from '../Gif/Gif';


const APIUrl = 'http://api.giphy.com/v1/gifs/search?q=funny+animals&api_key=Y1Z2TMGf8Gzi6yKqaCw47sXRuAyQmBjH&limit=10'

class Gifs extends Component {
	constructor(props) {
		super(props);

		this.state = {
			gifs: [],
			error: null
		}
	}

componentDidMount(){
	fetch(APIUrl)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('There is error while fetching data. status code: ' + response.status);
			}
		})
		.then(data => this.setState({
			gifs: data.data
		}))
		.catch(error => this.setState({ error: error }))
}

render() {

	const { gifs } = this.state;

	return (
		<div>
			{
				gifs.map(gif => 
					<Gif key={gif.id} gif={gif}/>
				)
			}
		</div>
		)
	}
}

export default Gifs;