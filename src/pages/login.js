import React, { Component } from 'react';
import { URL_LOGIN } from './constants';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: false,
    }
    this.handleChangeUsername  = this.handleChangeUsername.bind(this);
    this.handleChangePassword  = this.handleChangePassword.bind(this);
  }

  login = () => { 
      const requestOptions = { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username          : this.state.username,
          password          : this.state.password,
        })
    };
    fetch(URL_LOGIN, requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.length>0)
        {
          this.setState({error: false})
          localStorage.setItem('ShadeUser', data[0].id_user);
          window.location.reload();
        }
        else
          this.setState({error: true})
      });
    } 
   
  handleChangeUsername (e){
    this.setState({ username:e.target.value})
  }
  handleChangePassword (e){
    this.setState({ password:e.target.value})
  }
  
  componentDidMount() {
    
  }

 
  render() {

    return (
      <div  class="hold-transition login-page" >        
      <div class="login-box">
      <div class="login-logo">
        <a href="#"><b>Aqua</b>sign</a>
      </div>
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Sign in</p>
          <form action="../../index3.html" method="post">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="User ID" value={this.state.username} onChange={this.handleChangeUsername} />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  {this.state.error &&
                  <label for="remember" style={{color: "red"}} >
                    Invalid Login!
                  </label>
                  }
                </div>
              </div>
              <div class="col-4">
                <button type="button" onClick={() =>this.login()} class="btn btn-primary btn-block">Sign In</button>
              </div>
            </div>
          </form>
          
         </div>
       </div>
      </div>
     </div>
    );
  }
}

