import React, { Component } from 'react';
import Nav from '../../NavBar';
import DatePicker from 'react-date-picker';
import SimpleReactValidator from 'simple-react-validator';

import { URL_VOUCHER_SAVE, URL_VOUCHER_DT ,URL_VOUCHER_DEL} from '../constants';
import { URL_LEDGER_DT } from '../constants';

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      date: new Date(),
      id_ledger_from:'',
      id_ledger_to:'',
      description:'',
      rate:'',
      amount: '',
      type:'Payment',
      voucher_no:'1',
      id_invoice:'1',
      ledger: '',
      arrLedger: [],
      arrVouchers: [],
      arrType:[
              {type:'Payment'},
              {type:'Receipt'}
            ]
    }
    
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onLedgerFromChange = this.onLedgerFromChange.bind(this);
    this.onLedgerToChange = this.onLedgerToChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.validator = new SimpleReactValidator();
  }

  
  componentDidMount() {
    const date_ = this.formatDate(this.state.date);
    const type_ = this.state.type;
    this.loadAccountHead();
    this.loadVoucherList(date_,type_);
  }
  loadAccountHead(){
    fetch(URL_LEDGER_DT)
    .then(response => response.json())
    .then(data => this.setState({ arrLedger: data }));
    //console.log(data)
  }

  loadVoucherList = (date_,type_) => {
    fetch(URL_VOUCHER_DT + `/'${date_}'` + `/'${type_}'` )
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
    if (this.validator.allValid()) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
                date          : this.formatDate(this.state.date),
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
  fetch(URL_VOUCHER_SAVE, requestOptions)
      .then(response => response.json());
      const _date=this.formatDate(this.state.date);
       this.loadVoucherList(_date,this.state.type);
}
else
{
 this.validator.showMessages();
 this.forceUpdate();
}

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
        const _date=this.formatDate(this.state.date);
        this.loadVoucherList(_date,this.state.type);
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

  onDescriptionChange(event) {
    this.setState({ description: event.target.value })
  }

  onTypeChange(event) {
    this.setState({ type: event.target.value }
      , () => {
        this.loadVoucherList(this.formatDate(this.state.date),this.state.type);
    });
  }

  onAmountChange(event) {
    this.setState({ amount: event.target.value })
  }

  onLedgerFromChange(event) {
    this.setState({ id_ledger_from: event.target.value })
  }

  onLedgerToChange(event) {
    this.setState({ id_ledger_to: event.target.value })
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
                  <h1>Voucher</h1>
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
                                      className="form-control"
                                      onChange={this.onDateChange}
                                      value={this.state.date}
                                      format={"dd/MM/yyyy"}
                                    />
                                  </div>
                              </div>
                              <div class="col-sm-8">
                                  <div class="form-group float-right">
                                    <label>Type</label>
                                    <select class="form-control" onChange={this.onTypeChange} value={this.state.type}>
                                      {this.state.arrType.map((types) =>
                                        <option value={types.type}>{types.type}</option>)}
                                    </select>
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
                                    <select class="form-control" onChange={this.onLedgerFromChange} value={this.state.id_ledger_from}>
                                      <option>--Select--</option>
                                      {this.state.arrLedger.map((ledger) =>
                                        <option value={ledger.id_account_head}>{ledger.account_head}</option>)}
                                    </select>
                                    {this.validator.message('id_ledger_from', this.state.id_ledger_from, 'required|numeric')}
                                  </div>
                              </div>
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>To</label>
                                    <select class="form-control" onChange={this.onLedgerToChange} value={this.state.id_ledger_to}>
                                     <option>--Select--</option>
                                      {this.state.arrLedger.map((ledger) =>
                                        <option value={ledger.id_account_head}>{ledger.account_head}</option>)}
                                    </select>
                                    {this.validator.message('id_ledger_to', this.state.id_ledger_to, 'required|numeric')}
                                  </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>Remarks</label>
                                    <input type="text" value={this.state.description} onChange={this.onDescriptionChange} class="form-control" />
                                  </div>
                              </div>
                              <div class="col-sm-6">
                                  <div class="form-group">
                                    <label>Amount</label>
                                    <input type="text" value={this.state.amount} onChange={this.onAmountChange} class="form-control" />
                                    {this.validator.message('amount', this.state.amount, 'required|numeric')}
                                  </div>
                              </div>
                                
                              
                                <button type="button"  class="btn btn-block btn-success btn-flat" onClick={this.saveVoucher}>
                                   Save
                                </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '50%' }}>From</th>
                          <th style={{ width: '25%' }}>To</th>
                          <th style={{ width: '25%' }}>Remarks</th>
                          <th style={{ width: '25%' }}>Amount</th>
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
                        <th></th>
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

  delVoucher = (id_account_voucher) => {
    
    fetch(URL_VOUCHER_DEL + `/${id_account_voucher}` )
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        arrVouchers: data ,
        })
        }
      );
      //this.loadVoucherList(date);
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
            <button type="button"  onClick={() => this.delVoucher(arrVoucher.id_account_voucher)} class="btn btn-outline-danger">
              <i class="fas fa-trash"></i>
          </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default Expense;