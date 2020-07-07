import React, { Component, useState } from 'react';
import { URL_LOGIN } from './constants';

export default function App() {

  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');


  const login = () => { 
      const requestOptions = { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username          : username ,
          password          : password ,
                })
    };
    fetch(URL_LOGIN, requestOptions)
      .then(response => response.json())
      .then(data => {
        
      });
    } 
    
  
    return (
      <div  class="hold-transition login-page" >        
      <div class="login-box">
      <div class="login-logo">
        <a href="../../index2.html"><b>Aqua</b>sign</a>
      </div>
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Sign in</p>
          <form action="../../index3.html" method="post">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="User ID" value={username} onChange={e=> setUsername(e.target.value)} />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
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

