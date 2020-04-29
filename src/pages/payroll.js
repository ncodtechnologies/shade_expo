import React, { Component } from 'react';
import Nav from '../NavBar';
import DatePicker from 'react-date-picker';
import { URL_PAYROLL_SAVE, URL_PAYROLL_DT } from './constants';
import { URL_ACCOUT_HEAD_DT } from './constants';

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      date: new Date(),
      id_ledger:'',
      type:'',
      amount: '',
      ledger: '',
      arrLedger: [],
      arrVouchers: [],
      arrType:[
              {type:'Allowance'},
              {type:'Salary'},
              {type:'Loan'}
            ]
    }
    
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onLedgerChange = this.onLedgerChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  
  componentDidMount() {
    const date_=this.formatDate(this.state.date);
    this.loadAccountHead();
    this.loadVoucherList(date_);
  }
  loadAccountHead(){
    fetch(URL_ACCOUT_HEAD_DT)
    .then(response => response.json())
    .then(data => this.setState({ arrLedger: data }));
    //console.log(data)
  }

  loadVoucherList = (date_) => {
    fetch(URL_PAYROLL_DT + `/'${date_}'` )
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
                id_ledger     : this.state.id_ledger,
                amount        : this.state.amount ,
                type          : this.state.type ,
              })
  };
  fetch(URL_PAYROLL_SAVE, requestOptions)
      .then(response => response.json());
      const date_=this.formatDate(this.state.date);
      this.loadVoucherList(date_);
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


  onDateChange = date => {
    this.setState({ date }
      , () => {
        const date_=this.formatDate(this.state.date);
        this.loadVoucherList(date_);
    });
     }

  delRow = (rowIndex) => {
    let _arrVouchers = this.state.arrVouchers;
    _arrVouchers.splice(rowIndex, 1);
    this.setState({
      arrVouchers: _arrVouchers
    })
  }


  onTypeChange(event) {
    this.setState({ type: event.target.value })
  }

  onAmountChange(event) {
    this.setState({ amount: event.target.value })
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
                  <h1>Payroll</h1>
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
                                    <label>Date</label>
                                    <DatePicker
                                      className={"form-control"}
                                      onChange={this.onDateChange}
                                      value={this.state.date}
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
                              <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>Name</label>
                                    <select class="form-control" onChange={this.onLedgerChange} value={this.state.id_ledger}>
                                      {this.state.arrLedger.map((ledger) =>
                                        <option value={ledger.id_account_head}>{ledger.account_head}</option>)}
                                    </select>
                                  </div>
                              </div>
                              <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>Type</label>
                                    <select class="form-control" onChange={this.onTypeChange} value={this.state.type}>
                                      {this.state.arrType.map((types) =>
                                        <option value={types.type}>{types.type}</option>)}
                                    </select>
                                  </div>
                              </div>
                              <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>Amount</label>
                                    <input type="text" value={this.state.amount} onChange={this.onAmountChange} class="form-control" />
                                  </div>
                              </div>
                                
                              
                                <button type="button"  class="btn btn-block btn-success btn-flat" onClick={this.saveVoucher}>
                                   Save
                                </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '40%' }}>Name</th>
                          <th style={{ width: '30%' }}>Type</th>
                          <th style={{ width: '30%' }}>Amount</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
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
        <td>{arrVoucher.name}</td>
        <td>{arrVoucher.type}</td>
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