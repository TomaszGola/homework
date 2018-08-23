import React, { Component } from 'react';
import { TablePagination } from 'react-pagination-table';

const APIUrl = 'http://jsonplaceholder.typicode.com/comments'


class CommentsList2 extends Component {
  constructor(props) {
    super(props);

      this.state = {
        comments2: [],
        comments2Length: null
      }
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
      .then(data => this.setState({ comments2: data, comments2Length: data.length }))
      .catch(error => this.setState({ error }))



  }


  render() {

    const HeaderOfTable = ['#', 'Email', 'Name'];

    return (
      <div className="App">
        <h2>Table with comments 2</h2>     

          <TablePagination
            title = 'Table 2'
            headers = { HeaderOfTable }
            data = {this.state.comments2}
            columns = "id.email.name"
            perPageItemCount = {10}
            totalCount={this.state.comments2Length}

          />
      </div>
    );
  }
}

export default CommentsList2;
