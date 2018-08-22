import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import sortArrows from '../sort-arrows.svg'

const APIUrl = 'http://jsonplaceholder.typicode.com/comments'


class CommentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      commentsLength: null,
      error: null,
      sortType: ((a,b) => a.id - b.id),
      sortedById: true,
      sortedByEmail: null,
    };
 


  }

  componentDidMount(){

    fetch(APIUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('There is error while fetching data. Status code: ', response.status);
        }
      })
      .then(data => this.setState({ comments: data, commentsLength: data.length }))
      .catch(error => this.setState({ error }))
      



      this.byIdUp = e => {
        e.preventDefault()
        this.setState(
            {
              sortType: ((a,b) => b.id - a.id),
              sortedById: false,
            }

          )
      }

      this.byIdDown = e => {
        e.preventDefault()
        this.setState(
            {
              sortType: ((a,b) => a.id - b.id),
              sortedById: true
            }
          )
      }

      this.byEmailAlphabetically = e => {
        e.preventDefault()
        this.setState(
            {
              sortType: ((a,b) => a.email.localeCompare(b.email)),
              sortedByEmail: false
            }
          )
      } 
      
      this.byEmailNotAlphabetically = e => {
        e.preventDefault()
        this.setState(
            {
              sortType: ((a,b) => b.email.localeCompare(a.email)),
              sortedByEmail: true
            }
          )
      }

  }


  render() {

    const { comments, error } = this.state;

    if(error) {
      return <p>{error.message + ' status code ' + error.status}</p>;
    }



    return (
      <div className="App">
        <h2>List with comments</h2>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              
                {
                  this.state.sortedById ?
                    <th onClick = { this.byIdUp } >
                      # <img src={sortArrows} height='10px' alt='sort arrows'/> 
                    </th>
                  :
                    <th onClick = { this.byIdDown } >
                      # <img src={sortArrows} height='10px' alt='sort arrows'/>
                    </th>
                }
              
                {
                  this.state.sortedByEmail  ?
                    <th onClick={this.byEmailAlphabetically} >
                      Email <img src={sortArrows} height='10px' alt='sort arrows'/>
                    </th>
                  :
                    <th onClick={this.byEmailNotAlphabetically} >
                      Email <img src={sortArrows} height='10px' alt='sort arrows'/>
                    </th>
                }


              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            { 
              comments.sort(this.state.sortType).map(comment => 
                comment.email.includes('.biz') ?
                  <tr key={comment.id}>
                    <td>{comment.id}</td>
                    <td>{comment.email}</td>
                    <td>{comment.name}</td>
                  </tr>
                :
                  ''
              )
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CommentsList;
