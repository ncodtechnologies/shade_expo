import React, { Component,PropTypes  } from 'react';
import Nav from '../NavBar';
import { Link, Redirect } from 'react-router-dom';
import {URL_USER_SAVE,URL_USER_EDIT} from './constants';
import SimpleReactValidator from 'simple-react-validator';
import Checkbox from './Checkbox'

const items = [
  'One',
  'Two',
  'Three',
];

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
      hidediv: false,
      redirectToUsers : false,
      redirectToUsers : false,  
    }
    this.handleChangeUsername  = this.handleChangeUsername.bind(this);
    this.handleChangePassword  = this.handleChangePassword.bind(this);
    this.handleChangeConfirm   = this.handleChangeConfirm.bind(this);
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    const id_user=this.props.match.params.id_user;
    if(id_user!=0)
    {
      this.loadUserDt(id_user);
      this.setState({id_user});
    }
  }

  loadUserDt = (id_user) => {

    fetch(URL_USER_EDIT + `/${id_user}`)
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
 
 

saveUser = () => {
  if (this.validator.allValid()) {  
    
   const pass= this.state.password;
   const confirm = this.state.confirm;
   if(pass == confirm)  
   {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        username          : this.state.username ,
        password          : this.state.password ,
        confirm           : this.state.confirm,
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
    else{
      this.setState({ hidediv:true})
    }
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

  handleChangeConfirm (e){
    this.setState({ confirm:e.target.value})
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
  }

  createCheckbox = label => (
    <Checkbox
            label={label}
            handleCheckboxChange={this.toggleCheckbox}
            key={label}
        />
  )

  createCheckboxes = () => (
    items.map(this.createCheckbox)
  )
  render() {
   
    const { redirect, redirectToUsers } = this.state;

    if (redirect) {
      this.setState({redirect: false})
      return <Redirect to='/users'/>;
    }

    if (redirectToUsers) {
      this.setState({redirectToUsers: false})
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
                              <input type="password" value={this.state.password} onChange={this.handleChangePassword} class="form-control" />
                            </div>
                          </div>
                        </div> 
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                              <label>Confirm Password</label> 
                              <input type="password" value={this.state.confirm} onChange={this.handleChangeConfirm} class="form-control" />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12"> 
                            <div class="form-group" id="results" hidden = {!this.state.hidediv}>
                              Confirm password do not match
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div class="form-group">
                            <button type="button"  class="btn btn-block btn-success btn-flat" onClick={this.saveUser}>
                              Save
                            </button>
                            </div>
                          </div>
                        </div>
                        <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}

              <button className="btn btn-default" type="submit">Save</button>
            </form>
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


