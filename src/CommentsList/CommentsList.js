import React, { Component } from 'react';
import { Table } from 'react-bootstrap'

const APIUrl = 'http://jsonplaceholder.typicode.com/comments'


class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      error: null,
      sortType: ((a,b) => a.id - b.id),
      typeOfSort: 'byIdDown',
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

      this.byIdUp = e => {
        e.preventDefault()
        this.setState(
            {
              sortType: ((a,b) => b.id - a.id),
              typeOfSort: 'byIdUp',
            }

          )
      }

      this.byIdDown = e => {
        e.preventDefault()
        this.setState(
            {
              sortType: ((a,b) => a.id - b.id),
              typeOfSort: 'byIdDown'
            }
          )
      }

      this.byEmailAlphabetically = e => {
        e.preventDefault()
        this.setState(
            {
              sortType: ((a,b) => a.email.localeCompare(b.email)),
              typeOfSort: 'byEmailAlphabetically'
            }
          )
      } 
      
      this.byEmailNotAlphabetically = e => {
        e.preventDefault()
        this.setState(
            {
              sortType: ((a,b) => b.email.localeCompare(a.email)),
              typeOfSort: 'byEmailNotAlphabetically'
            }
          )
      }
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
              
                {
                  this.state.typeOfSort === 'byIdDown' ?
                  <th   onClick = { this.byIdUp } >#</th>
                : 
                  <th  onClick = { this.byIdDown } >#</th>
                }
              
                {
                  this.state.typeOfSort === 'byEmailAlphabetically' ?
                  <th onClick={this.byEmailAlphabetically} >Email</th>
                :
                  <th onClick={this.byEmailNotAlphabetically} >Email</th>
                }


              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {comments.sort(this.state.sortType).map(comment => 
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
