import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

import Home from '../Home/Home';
import CommentsList from '../CommentsList/CommentsList';
import CommentsList2 from '../CommentsList2/CommentsList2';

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
              <NavItem eventKey={2} href="/comments2">
                Comments2
              </NavItem>

            </Nav>  
          </Navbar>
      
          <Route exact path='/' component={Home}/>
          <Route path='/comments' component={CommentsList}/>
          <Route path='/comments2' component={CommentsList2}/>
        </div>
      </Router>
    );
  }
}

export default App;
