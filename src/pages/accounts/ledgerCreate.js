import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../NavBar';
import SimpleReactValidator from 'simple-react-validator';

import { URL_LEDGER_SAVE ,URL_LEDGER_GROUP_DT} from '../constants';

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      code: '',
      id:'',
      name:'',
      op:'',
      address:'',
      phone: '',
      arrLedgerGroup: [],
    }
    
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onIdChange = this.onIdChange.bind(this);
    this.onOpChange = this.onOpChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.validator = new SimpleReactValidator();
  }

  
  componentDidMount() {
    this.loadLedgerGroup();
  }
  loadLedgerGroup(){
    fetch(URL_LEDGER_GROUP_DT)
    .then(response => response.json())
    .then(data => this.setState({ arrLedgerGroup: data }));
    //console.log(data)
  }

  saveLedger = () => {
    if (this.validator.allValid()) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
                  id            : this.state.id ,
                  name          : this.state.name ,
                  code          : this.state.code ,
                  op            : this.state.op  ,
                  address       : this.state.address ,
                  phone         : this.state.phone ,
                })
    };
    fetch(URL_LEDGER_SAVE, requestOptions)
        .then(response => response.json());
    } 
    else
     {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
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

  onCodeChange(event) {
    this.setState({ code: event.target.value })
  }

  onNameChange(event) {
    this.setState({ name: event.target.value })
  }

  onIdChange(event) {
    this.setState({ id: event.target.value })
  }

  onOpChange(event) {
    this.setState({ op: event.target.value })
  }

  onAddressChange(event) {
    this.setState({ address: event.target.value })
  }
  onPhoneChange(event) {
    this.setState({ phone: event.target.value })
  }
 
  render() {
  
    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">

        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Ledger</h1>
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
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>Code</label>
                                    <input type="text" value={this.state.code} onChange={this.onCodeChange} class="form-control" />
                                    {this.validator.message('code', this.state.code, 'required|alpha_num_space')}
 
                                  </div>
                              </div>
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" value={this.state.name} onChange={this.onNameChange} class="form-control" />
                                    {this.validator.message('name', this.state.name, 'required|alpha_num_space')}
                                 </div>
                              </div>
                            </div>
                            <div class="row" >
                              <div class="col-sm-5">
                                  <div class="form-group">
                                    <label>Ledger Group</label>
                                    <select class="form-control" onChange={this.onIdChange} value={this.state.id}>
                                    <option value="">Select</option>
                                      {this.state.arrLedgerGroup.map((types) =>
                                        <option value={types.id_ledger_group}>{types.name}</option>)}
                                    </select> 
                                    {this.validator.message('id', this.state.id, 'required|alpha_num_space')}
 
                                  </div>
                              </div>
                              <div class="col-sm-1">
                                  <div class="form-group">
                                    <Link to="./ledgerGroup" class="btn btn-tool btn-sm">                                    
                                     <button type="submit" class="btn btn-block btn-success btn-flat">+</button>
                                    </Link>
                                  </div>
                              </div>
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>Opening Balance</label>
                                    <input type="text" value={this.state.op} onChange={this.onOpChange} class="form-control" />
                                    {this.validator.message('op', this.state.op, 'required|numeric')}
                                  </div>
                              </div>
                            </div>
                           
                            <div class="row">
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>Address</label>
                                    <input type="text" value={this.state.address} onChange={this.onAddressChange} class="form-control" />
                                    {this.validator.message('address', this.state.address, 'required|alpha_num_space')}
                                  </div>
                              </div>
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>Phone</label>
                                    <input type="text" value={this.state.phone} onChange={this.onPhoneChange} class="form-control" />
                                    {this.validator.message('phone', this.state.phone, 'required|phone')}
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