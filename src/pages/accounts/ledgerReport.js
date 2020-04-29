import React, { Component } from 'react';
import Nav from '../../NavBar';
import DatePicker from 'react-date-picker';
import { URL_EXPENSE_SAVE, URL_VOUCHER_DT } from '../constants';

const API = '/users/account_head';

class Expense extends Component {
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
      arrType:[
              {type:'Payment'},
              {type:'Receipt'}
            ]
    }
    
    this.onLedgerChange = this.onLedgerChange.bind(this);
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
  }

  
  componentDidMount() {
   // const date_ = this.state.dateFrom.toISOString().slice(0, 10);
   // const date = this.state.dateTo.toISOString().slice(0, 10);
    this.loadAccountHead();
    //this.loadVoucherList(date_,date);
  }
  loadAccountHead(){
    fetch(API)
    .then(response => response.json())
    .then(data => this.setState({ arrLedger: data }));
    //console.log(data)
  }

  loadVoucherList = (date_,date) => {
    fetch(URL_VOUCHER_DT + `/'${date_}'` + `/'${date}'` )
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

  saveVoucher = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
                date          : new Date().toISOString().slice(0, 10),
                id_ledger_from: this.state.id_ledger_from ,
                id_ledger_to  : this.state.id_ledger_to ,
                description   : this.state.description ,
                rate          : this.state.rate  ,
                amount        : this.state.amount ,
                type          : this.state.type ,
                voucher_no    : this.state.voucher_no ,
                id_invoice    : this.state.id_invoice,
              })
  };
  fetch(URL_EXPENSE_SAVE, requestOptions)
      .then(response => response.json());
      const _date=this.state.date.toISOString().slice(0, 10)
       this.loadVoucherList(_date,this.state.type);
}


  onDateFromChange = dateFrom => {
    this.setState({ dateFrom }
      , () => {
        const date_=this.state.dateFrom.toISOString().slice(0, 10)
        //this.loadVoucherList(date_,this.state.type);
    }
      );
   
  }
  onDateToChange = dateTo => {
    this.setState({ dateTo }
      , () => {
        //const date_=this.state.date.toISOString().slice(0, 10)
       // this.loadVoucherList(date_,this.state.type);
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
                  <h1>Accounts</h1>
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
                                    <label>From</label>
                                    <DatePicker
                                      className={"form-control"}
                                      onChange={this.onDateFromChange}
                                      value={this.state.dateFrom}
                                      format={"dd/MM/yyyy"}
                                    />
                                  </div>
                              </div>
                              <div class="col-sm-4">
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
                                    <label>From</label>
                                    <select class="form-control" onChange={this.onLedgerChange} value={this.state.id_ledger}>
                                      {this.state.arrLedger.map((ledger) =>
                                        <option value={ledger.id_account_head}>{ledger.account_head}</option>)}
                                    </select>
                                  </div>
                              </div>
                             
                            </div>
                            <div class="row">                          
                                                          
                                <button type="button"  class="btn btn-block btn-success btn-flat" onClick={this.saveVoucher}>
                                   Search
                                </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '50%' }}>Date</th>
                          <th style={{ width: '25%' }}>Type</th>
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
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    );
  }
}

export default Expense;