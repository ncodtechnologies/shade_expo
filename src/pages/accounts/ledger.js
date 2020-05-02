import React, { Component } from 'react';
import Nav from '../../NavBar';
import { Link } from 'react-router-dom';

import { URL_LEDGER_GROUP_DT ,URL_LEDGER_DT } from '../constants';

class LedgerGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      ledgerGroup: '',
      arrLedgerGroup: [],
      arrLedgers: [],
    }    
    this.onLedgerChange = this.onLedgerChange.bind(this);
  }
 
  componentDidMount() {
    this.loadLedgerGroup();
    this.loadLedgerList();
  }
  loadLedgerGroup(){
    fetch(URL_LEDGER_GROUP_DT)
    .then(response => response.json())
    .then(data => this.setState({ arrLedgerGroup: data }));
    //console.log(data)
  }

  loadLedgerList = () => {
    fetch(URL_LEDGER_DT )
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({arrLedgers: data })
        });
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
                        <th colspan={6} >
                            <div class="row" >
                              <div class="col-sm-4">
                                  <div class="form-group">
                                  <label>Group</label>
                                    <select class="form-control" onChange={this.onLedgerGroupChange} value={this.state.ledgerGroup}>
                                      {this.state.arrLedgerGroup.map((types) =>
                                        <option value={types.name}>{types.name}</option>)}
                                    </select>
                                  </div>
                              </div>
                              <div class="col-sm-8">
                                  <div class="form-group float-right">
                                  <Link to="./ledgerCreate" class="btn btn-tool btn-sm">
                                      <button type="submit" class="btn btn-block btn-success btn-fla">Create</button>
                                    </Link> 
                                  </div>
                              </div>
                              <button type="button"  class="btn btn-block btn-success btn-flat" onClick={this.saveLedger}>
                                   Save
                                </button>
                            </div>
                           
                          </th>
                          </tr>                      
                        
                        <tr>
                          <th style={{ width: '45%' }}>Name</th>
                          <th style={{ width: '25%' }}>Phone</th>
                          <th style={{ width: '30%' }}>Group</th>
                          <th style={{ width: '10%' }}></th>
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
        <td>{arrLedger.account_head}</td>
        <td>{arrLedger.phone}</td>
        <td>{arrLedger.name}</td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-danger"><i class="fas fa-edit"></i></button>
          </div>
        </td>
      </tr>
    );
  }
}

export default LedgerGroup;