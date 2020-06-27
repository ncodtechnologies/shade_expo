import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Nav from '../NavBar';
import SimpleReactValidator from 'simple-react-validator';

import {URL_NOTIFICATION_LIST} from './constants';

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description:'',
      redirect : false,
    }
    
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.validator = new SimpleReactValidator();
  }
  
  componentDidMount() {   
  }  

  saveLedger = () => {
    if (this.validator.allValid()) {     
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                  description     : this.state.description ,
                })
    };
    fetch(URL_NOTIFICATION_LIST, requestOptions)
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

  delRow = (rowIndex) => {
    let _arrVouchers = this.state.arrVouchers;
    _arrVouchers.splice(rowIndex, 1);
    this.setState({
      arrVouchers: _arrVouchers
    })
  }

  onDescriptionChange(event) {
    this.setState({ description: event.target.value })
  }

  render() {
  
    const { redirect } = this.state;

    if (redirect) {
      this.setState({redirect: false})
      return <Redirect to='/notification'/>;
    }

    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">

        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Notification Create</h1>
                </div>
              </div>
            </div>
          </section>

        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>                           
                            <div class="row">                           
                              <div class="col-sm-12">
                                  <div class="form-group">
                                    <label>Description</label>
                                    <textarea multiline={true} type="text" value={this.state.description} onChange={this.onDescriptionChange} class="form-control" />
                                  </div>
                              </div>                          
                              <button type="button"  class="btn btn-block btn-success btn-flat" onClick={this.saveLedger}>
                                   Save
                              </button>
                            </div>
                          </th>
                        </tr>
                      
                      </thead>
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

export default Expense;