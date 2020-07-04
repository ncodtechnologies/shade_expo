import React, { Component } from 'react';
import Nav from '../NavBar';
import Invoice from './invoice';
import { Link, Redirect } from 'react-router-dom';
import {URL_USER_SAVE,URL_USER_DT} from './constants';

import SimpleReactValidator from 'simple-react-validator';


class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      data:null,
      id_user: 0,
      username:'',
      password:'',
      access:'true',
      items: [],
      redirectToInvoice : false,
      redirectToInvoice : false,  
    }
    this.handleChangeUsername  = this.handleChangeUsername.bind(this);
    this.handleChangePassword  = this.handleChangePassword.bind(this);
    this.validator = new SimpleReactValidator();
  }
  componentDidMount() {
    const id_user=this.props.match.params.id_user;
    
    if(id_user!=0)
    {
      this.loadInvoiceDt(id_user);
      this.setState({id_user});
    }
  }

  loadInvoiceDt = (id_user) => {

    fetch(URL_USER_DT + `/${id_user}`)
    .then(response => response.json())
    .then(data => 
      {
        if(data.length>0)
          this.setState(
              { 
                username          : data[0].username , 
                password          : data[0].password ,
              })
      }
    );
  }
 
 

saveInvoice = () => {
  if (this.validator.allValid()) {     
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username          : this.state.username ,
        password          : this.state.password ,
        access            : this.state.access,
        id_user           : this.state.id_user,
              })
  };
  fetch(URL_USER_SAVE, requestOptions)
      .then(response => {
         response.json();
         this.setState({ redirect : true });
      });
  } 
  else
   {
    this.validator.showMessages();
    this.forceUpdate();
  }
 
}
  
  handleChangeUsername (e){
    this.setState({ username:e.target.value})
  }

  handleChangePassword (e){
    this.setState({ password:e.target.value})
  }
  render() {
   
    const { redirect, redirectToInvoice } = this.state;

    if (redirect) {
      this.setState({redirect: false})
      return <Redirect to='/users'/>;
    }

    if (redirectToInvoice) {
      this.setState({redirectToInvoice: false})
      return <Redirect to={`/users/0/${this.props.match.params.id_user}`}/>;
    }

    return (
      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>User Creation</h1>
                </div>
              </div>
            </div>
          </section>

          <div class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-12">

                  <div class="card card-info">
                    <div class="card-header">
                      <h3 class="card-title">User</h3>
                    </div>
                    <div class="card-body">
                      <form >                    
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Username</label> 
                              <input type="text" value={this.state.username} onChange={this.handleChangeUsername} class="form-control" />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Password</label> 
                              <input type="text" value={this.state.password} onChange={this.handleChangePassword} class="form-control" />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                            <button type="button"  class="btn btn-block btn-success btn-flat" onClick={this.saveInvoice}>
                                   Save
                            </button>
                            </div>
                          </div>
                        </div>
                        

                        
                      </form>
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

export default App;
