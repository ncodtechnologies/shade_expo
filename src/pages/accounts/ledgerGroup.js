import React, { Component } from 'react';
import Nav from '../../NavBar';

import { URL_LEDGER_GROUP_DT, URL_LEDGER_GROUP_SAVE } from '../constants';

class LedgerGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      ledger: '',
      arrLedgers: [],
    }
    
    this.onLedgerChange = this.onLedgerChange.bind(this);
  }

  
  componentDidMount() {
    this.loadLedgerGroup();
  }
  loadLedgerGroup(){
    fetch(URL_LEDGER_GROUP_DT)
    .then(response => response.json())
    .then(data => this.setState({ arrLedgers: data }));
    //console.log(data)
  }
 
  saveLedger = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 

                ledger : this.state.ledger ,
              })
  };
  fetch(URL_LEDGER_GROUP_SAVE, requestOptions)
      .then(response => response.json());
       this.loadLedgerGroup();
}

  delRow = (rowIndex) => {
    let _arrLedgers = this.state.arrLedgers;
    _arrLedgers.splice(rowIndex, 1);
    this.setState({
      arrLedgers: _arrLedgers
    })
  }

  onLedgerChange(event) {
    this.setState({ ledger: event.target.value })
  }

 
  render() {
    const tableRows = this.state.arrLedgers.map((arrLedger, index) =>
      <TableRow
      arrLedger={arrLedger}
       
      />);

   
    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">
        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-12">
                  <h1>Ledger Group</h1>
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
                          <th colspan={6} >                           
                            <div class="row">
                              <div class="col-sm-12">
                                  <div class="form-group">
                                    <label>Name</label>
                                    <input type="text" value={this.state.ledger} onChange={this.onLedgerChange} class="form-control" />
                                  </div>
                              </div>  
                                <button type="button"  class="btn btn-block btn-success btn-flat" onClick={this.saveLedger}>
                                   Save
                                </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '100%' }}>Name</th>
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


  delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

  render() {
    let arrLedger = this.props.arrLedger;
    return (
      <tr>
        <td>{arrLedger.name}</td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    );
  }
}

export default LedgerGroup;