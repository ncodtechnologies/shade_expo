import React, { Component } from 'react';
import Nav from '../NavBar';
import { Link } from 'react-router-dom';
import UserCreate from './userCreate'
import { URL_USER_LIST } from './constants';
import Pagination from "react-js-pagination";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Table',
      data:null,
      date: new Date(),
      items:[],
    }
  }

  
  componentDidMount() {
   this.loadInvoiceList();
  }
  loadInvoiceList(){
    fetch(URL_USER_LIST)
    .then(response => response.json())
    .then(data => this.setState({
      items: data
      }));
  }
   
  render() {
    const tableRows = this.state.items.map((item, index) =>
      <TableRow      
        delRow={this.delRow}
        item={item} rowIndex={index}
       
      />
    );

    return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">

          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Users</h1>
                </div>               
              </div>
            </div>
          </section>
          <div class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-default">
                  <div class="card-header border-0">
                    <h3 class="card-title">Users</h3>
                    <div class="card-tools">
                    <Link to={'./userCreate/0'} >
                      <button type="submit" class="btn btn-block btn-success btn-flat">Create</button>
                    </Link>
                    </div>
                  </div>
                   
                    <div class="card-body p-0">
                      <table class="table">
                        <thead>
                          <tr>
                            <th >Username</th>
                            <th >Access</th>
                            <th ></th>
                            <th ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableRows}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class TableRow extends React.Component {
 
  getStatus = (status) => {
    if(status == 1)
      return <span class="badge bg-primary">created</span>
    else if(status == 2)
      return <span class="badge bg-warning">certified</span>  
    else if(status == 3)
      return <span class="badge bg-success">shipped</span>
  }  

  render() {
    let item = this.props.item;
    return (
      <tr>
        <td>{item.username}</td>
        <td>{item.access}</td>
        <td>
          <div class="btn-group">            
          <Link to={'./userCreate/'+ item.id_user} render={(props) => <UserCreate {...props}  id_user={this.props.match.params.id_user}/>} ><i class="fas fa-edit"></i> </Link> 
         </div>
        </td> 
        <td><button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button></td>
       
      </tr>
    );
  }
}

export default App;