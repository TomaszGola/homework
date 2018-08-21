import React, { Component } from 'react';

const APIUrl = 'http://jsonplaceholder.typicode.com/comments'


class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    };
  }

  componentDidMount(){

    fetch(APIUrl)
      .then(response => response.json())
      .then(data => this.setState({ comments: data }))
  }


  render() {

    const { comments } = this.state;

    return (
      <div className="App">
        <h2>List with comments</h2>
        <ul>
          {  comments.map(comment => 
            <li key={comment.id}>
              <p>{comment.name}</p>
           </li>
            )}
        </ul> 
      </div>
    );
  }
}

export default CommentsList;
