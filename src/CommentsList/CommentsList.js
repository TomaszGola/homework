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
      commentsAfterFiltring: [],
      commentsAfterFiltringLength: null,
      error: null,
      sortType: ((a,b) => a.id - b.id),
      sortedById: true,
      sortedByEmail: null,
      filtringDomain: '',
      firstElementOnPage: 0,
      lastElementOnPage: 20,
      amountElementsOnPage: 20,
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
      .then(data => this.setState({ 
        comments: data, 
        commentsLength: data.length,
        commentsAfterFiltring: data,
        commentsAfterFiltringLength: data.length 
      }))
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

      this.filterByDomain = e => {
        let temporaryTable = []

        e.preventDefault()
        
        this.state.comments.map(
              comment =>
              comment.email.includes(e.target.value) ?
              temporaryTable.push(comment)
            :
              ''
          )

        this.setState({
            commentsAfterFiltring: temporaryTable,
            commentsAfterFiltringLength: temporaryTable.length,
            firstElementOnPage: 0,
            lastElementOnPage: this.state.amountElementsOnPage
          })
      }

      this.prevPage = e => {
        e.preventDefault()
        
          this.state.firstElementOnPage <= 0 + this.state.amountElementsOnPage - 1 ?
            this.setState({
              firstElementOnPage: 0,
              lastElementOnPage: 0 + this.state.amountElementsOnPage              
            })
          :
            this.setState({
              firstElementOnPage: this.state.firstElementOnPage - this.state.amountElementsOnPage,
              lastElementOnPage: this.state.lastElementOnPage - this.state.amountElementsOnPage                 
            })  
        
      }

      this.nextPage = e => {
        e.preventDefault()
        
          this.state.lastElementOnPage >= this.state.commentsAfterFiltringLength - this.state.amountElementsOnPage + 1 ?
            this.setState({
              firstElementOnPage: this.state.commentsAfterFiltringLength - this.state.amountElementsOnPage,
              lastElementOnPage: this.state.commentsAfterFiltringLength
            })
          :
            this.setState({
              firstElementOnPage: this.state.firstElementOnPage + this.state.amountElementsOnPage,
              lastElementOnPage: this.state.lastElementOnPage + this.state.amountElementsOnPage              
            })  
        
      }

  }


  render() {

    const { error, commentsAfterFiltring } = this.state;

    if(error) {
      return <p>{error.message + ' status code ' + error.status}</p>;
    }


    return (
      <div className="App">
        <h2>Table with comments</h2>
        <div>
        <p>Filtered by domain: </p>
        
        <select value={this.state.value} onChange={this.filterByDomain}>
          <option value=''>all</option>
          <option value=".biz">.biz</option>
          <option value=".ca">.ca</option>
          <option value=".co.uk">.co.uk</option>
          <option value=".com">.com</option>
          <option value=".info">.info</option>
          <option value=".io">.io</option>
          <option value=".me">.me</option>
          <option value=".name">.name</option>
          <option value=".net">.net</option>
          <option value=".org">.org</option>
          <option value=".tv">.tv</option>
          <option value=".us">.us</option>
        </select>
        
        </div>

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
              commentsAfterFiltring.sort(this.state.sortType)
                .slice( this.state.firstElementOnPage , this.state.lastElementOnPage )
                  .map(comment => 
                      <tr key={comment.id}>
                        <td>{comment.id}</td>
                        <td>{comment.email}</td>
                        <td>{comment.name}</td>
                      </tr>
                    )  
            }
          </tbody>
        </Table>
        <button onClick={this.prevPage}>prev</button>
        <button onClick={this.nextPage}>next</button>        
      </div>
    );
  }
}

export default CommentsList;
