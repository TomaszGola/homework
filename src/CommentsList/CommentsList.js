import React, { Component } from 'react';

const APIUrl = 'http://jsonplaceholder.typicode.com/comments'


class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      error: null,
    };
  }

  componentDidMount(){

    fetch(APIUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('There is error while fetching data.');
        }
      })
      .then(data => this.setState({ comments: data }))
      .catch(error => this.setState({ error }))
  }


  render() {

    const { comments, error } = this.state;

    if(error) {
      return <p>{error.message}</p>;
    }


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
