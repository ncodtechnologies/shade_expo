import React, { Component } from 'react';
import Nav from '../../NavBar';
import DatePicker from 'react-date-picker';
import {  URL_LEDGER_REPORT_DT } from '../constants';
import { URL_LEDGER_DT } from '../constants';

class LedgerReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      dateFrom: new Date(),
      dateTo: new Date(),
      id_ledger:'',
      ledger: '',
      arrLedger: [],
      arrVouchers: [],
    }
    
    this.onLedgerChange = this.onLedgerChange.bind(this);
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
  }

  
  componentDidMount() {
    const _dateFrom=this.formatDate(this.state.dateFrom);
    const _dateTo=this.formatDate(this.state.dateTo);
    this.loadVoucherList(_dateFrom,_dateTo);
    this.loadAccountHead();
    
  }
  loadAccountHead(){
    fetch(URL_LEDGER_DT)
    .then(response => response.json())
    .then(data => this.setState({ arrLedger: data }));
    //console.log(data)
  }

  loadVoucherList = (_dateFrom,_dateTo) => {
    fetch(URL_LEDGER_REPORT_DT + `/'${_dateFrom}'` + `/'${_dateTo}'` )
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        arrVouchers: data ,
        })
        }
      );
    console.log(this.state.arrVouchers)
  } 

formatDate = date => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

  onDateFromChange = dateFrom => {
    this.setState({ dateFrom }
      , () => {
        const _dateFrom=this.formatDate(this.state.dateFrom);
        const _dateTo=this.formatDate(this.state.dateTo);
        this.loadVoucherList(_dateFrom,_dateTo);
    }
      );
   
  }
  onDateToChange = dateTo => {
    this.setState({ dateTo }
      , () => {
        const _dateFrom=this.formatDate(this.state.dateFrom);
        const _dateTo=this.formatDate(this.state.dateTo);
        this.loadVoucherList(_dateFrom,_dateTo);
    }
      );
   
  }

  delRow = (rowIndex) => {
    let _arrVouchers = this.state.arrVouchers;
    _arrVouchers.splice(rowIndex, 1);
    this.setState({
      arrVouchers: _arrVouchers
    })
  }

  onLedgerChange(event) {
    this.setState({ id_ledger: event.target.value })
  }
  
  render() {
    const tableRows = this.state.arrVouchers.map((arrVoucher, index) =>
      <TableRow
      arrVoucher={arrVoucher}
        arrLedger = {this.state.arrLedger}
      />);

    const grandTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.amount), 0);

    return (
      
      <div class="wrapper" >
      <Nav />
      <div class="content-wrapper">

        <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Ledger Report</h1>
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
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>From</label>
                                    <DatePicker
                                      className={"form-control"}
                                      onChange={this.onDateFromChange}
                                      value={this.state.dateFrom}
                                      format={"dd/MM/yyyy"}
                                    />
                                  </div>
                              </div>
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>To</label>
                                    <DatePicker
                                      className={"form-control"}
                                      onChange={this.onDateToChange}
                                      value={this.state.dateTo}
                                      format={"dd/MM/yyyy"}
                                    />
                                  </div>
                              </div>
                            </div>
                           
                          </th>
                          </tr>
                          <tr>
                          <th colspan={6} >
                            <div class="row" >                              
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>Ledger</label>
                                    <select class="form-control" onChange={this.onLedgerChange} value={this.state.id_ledger}>
                                      {this.state.arrLedger.map((ledger) =>
                                        <option value={ledger.id_account_head}>{ledger.account_head}</option>)}
                                    </select>
                                  </div>
                              </div>
                             
                            </div>
                            <div class="row">                          
                                                          
<<<<<<< HEAD
                                <button type="button"  class="btn btn-block btn-success btn-flat" onClick={() => this.loadVoucherList(this.formatDate(this.state.dateFrom),this.formatDate(this.state.dateTo))}>
=======
                                <button type="button"  class="btn btn-block btn-success btn-flat" onClick={this.loadVoucherList(this.formatDate(this.state.dateFrom),this.formatDate(this.state.dateTo))}>
>>>>>>> 473dcadbdb11ca4d94c6380ef393e3707d90c8a4
                                   Search
                                </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '20%' }}>Date</th>
                          <th style={{ width: '20%' }}>Type</th>
                          <th style={{ width: '25%' }}>Description</th>
                          <th style={{ width: '25%' }}>Debit</th>
                          <th style={{ width: '25%' }}>Credit</th>
                          <th style={{ width: '25%' }}>Balance</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th align="right" >{grandTotal}</th>
                      </tfoot>
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
    let arrVoucher = this.props.arrVoucher;
    
   

    return (
      <tr>
        <td>{arrVoucher.acc_from}</td>
        <td>{arrVoucher.acc_to}</td>
        <td>{arrVoucher.description}</td>
        <td>{arrVoucher.amount}</td>
        <td>{arrVoucher.description}</td>
        <td>{arrVoucher.amount}</td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    );
  }
}

export default LedgerReport;