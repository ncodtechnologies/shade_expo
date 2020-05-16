import React, { Component } from 'react';
import Nav from '../../NavBar';
import DatePicker from 'react-date-picker';
import {  URL_CASHBOOK_OP,URL_CASHBOOK_CREDIT,URL_CASHBOOK_DEBIT } from '../constants';
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
      op:'',
      arrDebitVouchers:[]
    }
    
    this.onLedgerChange = this.onLedgerChange.bind(this);
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
  }

  
  componentDidMount() {
    const _dateFrom=this.formatDate(this.state.dateFrom);
    const _dateTo=this.formatDate(this.state.dateTo);
    const id_account_head=this.state.id_ledger;
    this.loadOp(_dateFrom,id_account_head);
    this.loadCredit(_dateFrom,_dateTo,id_account_head);
    //this.loadDebit(_dateFrom,_dateTo,id_ledger);
    this.loadAccountHead();
    
  }
  loadAccountHead(){
    fetch(URL_LEDGER_DT)
    .then(response => response.json())
    .then(data => this.setState({ arrLedger: data }));
    //console.log(data)
  }

  loadCredit = (_dateFrom,_dateTo,id_account_head) => {
    alert(id_account_head)
    fetch(URL_CASHBOOK_CREDIT + `/'${_dateFrom}'` + `/'${_dateTo}'`+ `/${id_account_head}` )
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

  loadDebit = (_dateFrom,_dateTo,id_account_head) => {
    alert(id_account_head)
    fetch(URL_CASHBOOK_DEBIT + `/'${_dateFrom}'` + `/'${_dateTo}'`+ `/${id_account_head}` )
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        arrDebitVouchers: data ,
        })
        }
      );
    console.log(this.state.arrVouchers)
  } 

  loadOp = (_dateFrom,id_account_head) => {
    fetch(URL_CASHBOOK_OP + `/'${_dateFrom}'` + `/${id_account_head}` )
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        op: data[0].balance ,
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
        //this.loadVoucherList(_dateFrom,_dateTo);
    }
      );
   
  }

  onDateToChange = dateTo => {
    this.setState({ dateTo }
      , () => {
        const _dateFrom=this.formatDate(this.state.dateFrom);
        const _dateTo=this.formatDate(this.state.dateTo);
      //  this.loadVoucherList(_dateFrom,_dateTo);
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

  onLedgerChange = event => {
    this.setState({ id_ledger: event.target.value }
      , () => {
        const _dateFrom=this.formatDate(this.state.dateFrom);
        const _dateTo=this.formatDate(this.state.dateTo);
        const id_account_head=this.state.id_ledger;
        this.loadCredit(_dateFrom,_dateTo,id_account_head);
        this.loadOp(_dateFrom,id_account_head);
    }
    )
  }
  
  render() {
    const tableRows = this.state.arrVouchers.map((arrVoucher, index) =>
      <TableRow
      arrVoucher={arrVoucher}
      />);
      const tableDebitRows = this.state.arrDebitVouchers.map((arrVoucher, index) =>
      <TableDebitRows
      arrVoucher={arrVoucher}
      />);

    const creditTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.amount), 0);
    const debitTotal = this.state.arrDebitVouchers.reduce((a, b) => +a + +(b.amount), 0);

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
                        <th colspan={12} >
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
                              <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>Ledger</label>
                                    <select class="form-control" onChange={this.onLedgerChange} value={this.state.id_ledger}>
                                      {this.state.arrLedger.map((ledger) =>
                                        <option value={ledger.id_account_head}>{ledger.account_head}</option>)}
                                    </select>
                                  </div>
                              </div>  
                            </div>
                           
                          </th>
                          </tr>
                          <tr>
                        <th colspan={12} >
                            <div class="row" >
                              <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>From :</label>
                                    <label>{this.state.op}</label>
                                   
                                  </div>
                              </div>
                            </div>
                          </th>
                          </tr>
                         <div>
                        <section class="content">
                        <div class="container-fluid">
                        <div class="row">
                          
                       <tr>
                          <td>
                            <div class="col-lg-6">
                              <div class="card card-warning">
                                <div class="card-body">
                                  <th style={{ width: '20%' }}>Name</th>
                                  <th style={{ width: '25%' }}>Particulars</th>
                                  <th style={{ width: '25%' }}>Debit</th>
                                </div>
                               </div>
                             </div>
                             </td>
                             <td>
                            <div class="col-md-6">
                              <div class="card card-warning">
                                <div class="card-body">
                                  <th style={{ width: '20%' }}>Name</th>
                                  <th style={{ width: '25%' }}>Particulars</th>
                                  <th style={{ width: '25%' }}>Credit</th>
                                </div>
                             </div>
                           </div>
                           </td>
                        </tr>
                        
                        </div>
                        </div>
                          </section>
                          </div>
                      </thead>
                      <tbody>
                        {tableRows}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th></th>
                        <th align="right" >{creditTotal}</th>
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
        <td>{arrVoucher.narration}</td>
        <td>{arrVoucher.credit}</td>
        <td>
          <div class="btn-group">
            <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    );
  }
}

class TableDebitRows extends React.Component {

  delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

  render() {
    let arrVoucher = this.props.arrVoucher;
  
    return (
      <tr>
        <td>{arrVoucher.name}</td>
        <td>{arrVoucher.narration}</td>
        <td>{arrVoucher.debit}</td>
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