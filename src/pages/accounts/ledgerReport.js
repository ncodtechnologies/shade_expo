import React, { Component } from 'react';
import Nav from '../../NavBar';
import DatePicker from 'react-date-picker';
import { URL_LEDGER_DT ,URL_LEDGER_REPORT_DT,URL_LEDGER_REPORT_OP} from '../constants';
import Pagination from "react-js-pagination";

class LedgerReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      dateFrom: new Date(),
      dateTo: new Date(),
      id_ledger:'',
      ledger: '',
      op:0,
      activePage: 1,
      totalCount:'',
      receiptTotal:0,
      paymentTotal:0,
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
    const id_ledger=this.state.id_ledger;
    const activePage=this.state.activePage;
    this.loadOp(_dateFrom,_dateTo,id_ledger);
    this.loadVoucherList(_dateFrom,_dateTo,id_ledger,activePage);
    this.loadAccountHead();    
  }
  
  loadAccountHead(){
    fetch(URL_LEDGER_DT)
    .then(response => response.json())
    .then(data => this.setState({ arrLedger: data }));
  }

  loadVoucherList = (_dateFrom,_dateTo,id_ledger,activePage) => {
    fetch(URL_LEDGER_REPORT_DT + `/'${_dateFrom}'` + `/'${_dateTo}'` + `/${id_ledger}` + `/${activePage}` )
    .then(response => response.json())
    .then(data => {
      this.setState({
            arrVouchers: data.items ,
            totalCount:data.totalCount,
            receiptTotal: data.receipt,
            paymentTotal: data.payment,
          })
        }
      );
    this.loadOp(_dateFrom,_dateTo,id_ledger);
  } 
  
  handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber}
      , () => {
        const activePage=this.state.activePage;        
        const _dateFrom=this.formatDate(this.state.dateFrom);
        const _dateTo=this.formatDate(this.state.dateTo);
        const id_ledger=this.state.id_ledger; 
        this.loadVoucherList(_dateFrom,_dateTo,id_ledger,activePage) 
    });
  }
  
  loadOp = (_dateFrom,_dateTo,id_ledger) => {
    fetch(URL_LEDGER_REPORT_OP + `/'${_dateFrom}'` + `/'${_dateTo}'` + `/${id_ledger}` )
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        op: data[0].opening_bal ,
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
    this.setState({ dateFrom });   
  }
  onDateToChange = dateTo => {
    this.setState({ dateTo });   
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

    const receiptTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.receipt), 0);
    const paymentTotal = this.state.arrVouchers.reduce((a, b) => +a + +(b.payment), 0);
    const _cb = (-1*this.state.op) + this.state.paymentTotal - this.state.receiptTotal;
    const cb = _cb >= 0 ? `${_cb} DR` : `${-1*_cb} CR`;
    const ob = this.state.op >= 0 ? `${this.state.op} CR` : `${-1*this.state.op} DR`;

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
                                                     
                            <div class="col-sm-6">
                                  <div class="form-group float-right">
                                    <label>Opening Balance :</label>
                                    <label>{Math.round(ob)}</label>
                                  </div>
                              </div>                           
                                <button type="button"  class="btn btn-block btn-success btn-flat" onClick={() =>this.loadVoucherList(this.formatDate(this.state.dateFrom),this.formatDate(this.state.dateTo),this.state.id_ledger,this.state.activePage)}>
                                   Search
                                </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '15%' }}>Date</th>
                          <th style={{ width: '15%' }}>Type</th>
                          <th style={{ width: '20%' }}>Description</th>
                          <th style={{ width: '10%' }}>Debit</th>
                          <th style={{ width: '10%' }}>Credit</th>
                          <th style={{ width: '10%' }}>Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRows}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th></th>
                        <th></th>
                        <th align="right">{this.state.paymentTotal}</th>
                        <th align="right">{this.state.receiptTotal}</th>
                        <th align="right" >{Math.round(cb)}</th>
                      </tfoot>
                    </table>
                  </div>

                  <div class="card-footer clearfix">
                    <Pagination
                        innerClass="pagination pagination-sm float-right"
                          activePage={this.state.activePage}
                          itemsCountPerPage={10}
                          totalItemsCount={this.state.totalCount}
                          pageRangeDisplayed={5}
                          itemClass="page-item"
                          itemClassPrev="page-item"
                          itemClassNext="page-item"                      
                          itemClassFirst="page-item"
                          itemClassLast="page-item"                      
                          linkClass="page-link"
                          linkClassFirst="page-link"                      
                          linkClassPrev="page-link"
                          linkClassNext="page-link"
                          linkClassLast="page-link"
                          onChange={this.handlePageChange.bind(this)}
                        /> 
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
        <td>{arrVoucher.date}</td>
        <td>{arrVoucher.type}</td>
        <td >{arrVoucher.narration}</td>
        <td >{Math.round(arrVoucher.payment)}</td>
        <td >{Math.round(arrVoucher.receipt)}</td>
        <td ></td>
      </tr>
    );
  }
}

export default LedgerReport;