import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Home from '../Home/Home';
import CommentsList from '../CommentsList/CommentsList';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>

          <Navbar fluid inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">home</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/comments">
              Comments
            </NavItem>
          </Nav>
          </Navbar>
      
          <Route exact path='/' component={Home}/>
          <Route path='/comments' component={CommentsList}/>
        </div>
      </Router>
    );
  }
}

export default App;
