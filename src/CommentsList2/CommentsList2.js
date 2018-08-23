import React, { Component } from 'react';

const APIUrl = 'http://jsonplaceholder.typicode.com/comments'


class CommentsList2 extends Component {
  constructor(props) {
    super(props);

  }



  render() {


    return (
      <div className="App">
        <h2>Table with comments 2</h2>          
      </div>
    );
  }
}

export default CommentsList2;
