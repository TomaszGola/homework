import React, { Component } from 'react';
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1>Hello at my app!</h1>
        <img alt='hello gif' src='https://media.giphy.com/media/26xBwdIuRJiAIqHwA/source.gif'/>
      </div>
    );
  }
}

export default Home;
