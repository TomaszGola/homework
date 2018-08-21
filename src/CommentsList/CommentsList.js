import React, { Component } from 'react';
import { Table } from 'react-bootstrap'

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
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(comment => 
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.email}</td>
                <td>{comment.name}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CommentsList;
