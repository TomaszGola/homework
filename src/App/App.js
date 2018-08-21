import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Home from '../Home/Home';
import CommentsList from '../CommentsList/CommentsList';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h2>My app</h2>
          <Link to='/'>Home</Link>
          <Link to='/comments' >Comments </Link>

      
          
      
          <Route exact path='/' component={Home}/>
          <Route path='/comments' component={CommentsList}/>
        </div>
      </Router>
    );
  }
}

export default App;
