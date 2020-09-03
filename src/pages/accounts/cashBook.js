import React, { Component } from 'react';
import Nav from '../../NavBar';
import DatePicker from 'react-date-picker';
import { URL_CASHBOOK_OP, URL_CASHBOOK_CREDIT, URL_CASHBOOK_DEBIT } from '../constants';
import { URL_LEDGER_DT,LEDGER_GROUPS} from '../constants';
import Pagination from "react-js-pagination";

class CashBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dateFrom: new Date(),
      dateTo: new Date(),
      id_ledger: '',
      ledger: '',
      op: '',
      activePage: 1,
      totalCountDebit:'',
      totalCountCredit:'',
      arrLedger: [],
      arrCreditVouchers: [],
      arrDebitVouchers: [],
      totalDebit: 0,
      totalCredit: 0,
    }

    this.onLedgerChange = this.onLedgerChange.bind(this);
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
    this.loadCashBook = this.loadCashBook.bind(this);
  }

  componentDidMount() {
    this.loadAccountHead();
  }

  loadAccountHead() {    
    var id_ledger_group =  LEDGER_GROUPS.ACCOUNT;
    fetch(`${URL_LEDGER_DT}/${id_ledger_group}`)
      .then(response => response.json())
      .then(data => this.setState({ arrLedger : [{id_account_head:0, account_head:"--SELECT--"},...data ] }));
    //console.log(data)
  }

  loadCredit = (_dateFrom, _dateTo, id_account_head,activePage) => {
    
    fetch(URL_CASHBOOK_CREDIT + `/'${_dateFrom}'` + `/'${_dateTo}'` + `/${id_account_head}`+ `/${activePage}` )
      .then(response => response.json())
      .then(data => {
          this.setState({
            arrCreditVouchers: data.items || [],
            totalCountCredit:data.totalCountCredit,
            totalCredit: data.totalCredit,
          })
      }
      );
  }

  loadDebit = (_dateFrom, _dateTo, id_account_head,activePage) => {
    fetch(URL_CASHBOOK_DEBIT + `/'${_dateFrom}'` + `/'${_dateTo}'` + `/${id_account_head}`+ `/${activePage}` )
      .then(response => response.json())
      .then(data => {
          this.setState({
            arrDebitVouchers: data.items || [],
            totalCountDebit:data.totalCountDebit,
            totalDebit: data.totalDebit,
          })
        }
      );
  }

  loadOp = (_dateFrom, id_account_head) => {
    fetch(URL_CASHBOOK_OP + `/'${_dateFrom}'` + `/${id_account_head}`)
      .then(response => response.json())
      .then(data => {
          this.setState({
            op: data[0].balance ? data[0].balance : 0
          })
      }

      );
      
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
        const _dateFrom = this.formatDate(this.state.dateFrom);
        const _dateTo = this.formatDate(this.state.dateTo);
      }
    );
  }

  onDateToChange = dateTo => {
    this.setState({ dateTo }
      , () => {
        const _dateFrom = this.formatDate(this.state.dateFrom);
        const _dateTo = this.formatDate(this.state.dateTo);
      }
    );

  }

  onLedgerChange = event => {
    this.setState({ id_ledger: event.target.value }
      , () => {

      }
    )
  }

  loadCashBook = () => {
    const _dateFrom = this.formatDate(this.state.dateFrom);
    const _dateTo = this.formatDate(this.state.dateTo);
    const id_account_head = this.state.id_ledger;
    const activePage=this.state.activePage;
    this.loadCredit(_dateFrom, _dateTo, id_account_head,activePage);
    this.loadDebit(_dateFrom, _dateTo, id_account_head,activePage);
    this.loadOp(_dateFrom, id_account_head);
  }

  handlePageChangeCredit = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber}
      , () => {
        const _dateFrom = this.formatDate(this.state.dateFrom);
        const _dateTo = this.formatDate(this.state.dateTo);
        const id_account_head = this.state.id_ledger;
        const activePage=this.state.activePage;
        this.loadCredit(_dateFrom, _dateTo, id_account_head,activePage);
    });
  }

  handlePageChangeDebit = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber}
      , () => {
        const _dateFrom = this.formatDate(this.state.dateFrom);
        const _dateTo = this.formatDate(this.state.dateTo);
        const id_account_head = this.state.id_ledger;
        const activePage=this.state.activePage;
        this.loadDebit(_dateFrom, _dateTo, id_account_head,activePage);
    });
  }

  render() {
    const tableCreditRows = this.state.arrCreditVouchers.map((arrCredit, index) =>
      <TableCreditRow
      arrCredit={arrCredit}
      />);
    const tableDebitRows = this.state.arrDebitVouchers.map((arrVoucher, index) =>
      <TableDebitRows
        arrVoucher={arrVoucher}
      />);

    const creditTotal = this.state.arrCreditVouchers.reduce((a, b) => +a + +(b.credit), 0);
    const debitTotal = this.state.arrDebitVouchers.reduce((a, b) => +a + +(b.debit), 0);
    const balance     = this.state.op + debitTotal - creditTotal;
    return (

      <div class="wrapper" >
        <Nav />
        <div class="content-wrapper">

          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Cash Book</h1>
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
                              <div class="row">
                                <button type="button"  class="btn btn-block btn-success btn-flat" onClick={this.loadCashBook}>
                                    Search
                                  </button>
                              </div>

                            </th>
                          </tr>
                          <tr>
                            <th colspan={6} >                    
                              <div class="row" >
                                <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>Opening Balance :</label>
                                    <label>{this.state.op}</label>
                                  </div>
                                  </div>
                              </div>
                              <div class="row" >
                                <div class="col-md-6">
                                  <div class="form-group">
                                  <Pagination
                                    innerClass="pagination pagination-sm float-right"
                                      activePage={this.state.activePage}
                                      itemsCountPerPage={10}
                                      totalItemsCount={this.state.totalCountDebit}
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
                                      onChange={this.handlePageChangeDebit.bind(this)}
                                    />      
                                  </div>
                                </div>
                                <div class="col-md-6">
                                <Pagination
                                    innerClass="pagination pagination-sm float-right"
                                      activePage={this.state.activePage}
                                      itemsCountPerPage={10}
                                      totalItemsCount={this.state.totalCountCredit}
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
                                      onChange={this.handlePageChangeCredit.bind(this)}
                                    />      
                                </div>
                            </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                      <div class="row" >
                       <div class="col-md-6">
                       <div class="card card-warning">
                       <div class="card-body">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style={{ width: '15%' }}>Date</th>
                            <th style={{ width: '30%' }}>Name</th>
                            <th style={{ width: '30%' }}>Particulars</th>
                            <th style={{ width: '25%' }}>Receipt</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableDebitRows}
                        </tbody>
                        <tfoot>
                          <th>Total</th>
                          <th></th>
                          <th></th>
                          <th align="right" >{debitTotal}</th>
                        </tfoot>
                      </table>
                      </div>
                      </div>
                      </div>
                      <div class="col-md-6">
                    <div class="card card-warning">
                      <div class="card-body">
                          <table class="table">
                            <thead>
                              <tr>
                                <th style={{ width: '15%' }}>Date</th>
                                <th style={{ width: '30%' }}>Name</th>
                                <th style={{ width: '30%' }}>Particulars</th>
                                <th style={{ width: '25%' }}>Payment</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tableCreditRows}
                            </tbody>
                            <tfoot>
                              <th>Total</th>
                              <th></th>
                              <th></th>
                              <th align="right" >{creditTotal}</th>
                            </tfoot>
                          </table>
                          </div>
                          </div>
                          </div>
                          </div>
                          <div class="row">
                      <div class="col-lg-12">
                        <div class="card card-info">
                          <div class="card-footer">
                            <label>Balance : {balance}</label>
                            <button 
                                onClick={()=> {window.open(`./#/cashBookPdf/${this.state.id_ledger}/${this.formatDate(this.state.dateFrom)}/${this.formatDate(this.state.dateTo)}/`, '_blank')}} 
                                type="submit" class="btn btn-primary float-right">
                              Print
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

class TableDebitRows extends React.Component {

  delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

  render() {
    let arrVoucher = this.props.arrVoucher;

    return (
      <tr>
        <td>{arrVoucher.date}</td>
        <td>{arrVoucher.name}</td>
        <td>{arrVoucher.narration}</td>
        <td>{arrVoucher.debit}</td>
      </tr>
    );
  }
}


class TableCreditRow extends React.Component {

  delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

  render() {
    let arrCredit = this.props.arrCredit;

    return (
      <tr>
        <td>{arrCredit.date}</td>
        <td>{arrCredit.name}</td>
        <td>{arrCredit.narration}</td>
        <td>{arrCredit.credit}</td>
      </tr>
    );
  }
}


export default CashBook;