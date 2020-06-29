import React, { Component } from 'react';
import Nav from '../NavBar';
import { Link } from 'react-router-dom';
import Notification from './notification'
import { URL_NOTIFICATION,URL_NOTIFICATION_DEL } from './constants';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: 'Table',
      data:null,
      date: new Date(),
      invItems:[]
    }
  }
  
  componentDidMount() {
  this.loadNotification();
  }
  loadNotification(){
    fetch(URL_NOTIFICATION)
    .then(response => response.json())
    .then(data => this.setState({ invItems: data }));
    //console.log(data)
  }
  
  delNotification = (id_notification) => {
    fetch(URL_NOTIFICATION_DEL + `/${id_notification}` )
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        invItems: data ,
        })
        }
      );
      this.loadNotification();
  }
  render() {
    const tableRows = this.state.invItems.map((invItem, index) =>
      <TableRow      
        invItem={invItem} rowIndex={index}
       delNotification={this.delNotification}
      />
    );
    return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-12">
                  <h1>Notification</h1>
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
                    <h3 class="card-title">Notification</h3>
                    <div class="card-tools">
                    <Link to={'./notificationCreate'} >
                      <button type="submit" class="btn btn-block btn-success btn-flat">Create</button>
                    </Link>
                    </div>
                  </div>                   
                    <div class="card-body p-0">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style={{ width: '35%' }}>Date</th>
                            <th  style={{ width: '50%' }}>Desciption</th>
                            
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
 
  render() {
    let invItem = this.props.invItem;
    let read = invItem.isread;
    if (invItem.isread == 0 )
    read ="Read";
    else
    read = "Unread" ;
    
    return (
      <tr>
        <td>{invItem.date}</td>
        <td>{invItem.description}</td>
        <td>
        <div class="btn-group">
            <button type="button"  class="btn btn-outline-danger" onClick={() => this.props.delNotification(invItem.id_notification)}>
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default App;