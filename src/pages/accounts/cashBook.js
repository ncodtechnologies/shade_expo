import React, { Component } from 'react';
import Nav from '../../NavBar';
import DatePicker from 'react-date-picker';
import { URL_CASHBOOK_OP, URL_CASHBOOK_CREDIT, URL_CASHBOOK_DEBIT } from '../constants';
import { URL_LEDGER_DT } from '../constants';

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
      arrLedger: [],
      arrCreditVouchers: [],
      arrDebitVouchers: []
    }

    this.onLedgerChange = this.onLedgerChange.bind(this);
    this.onDateFromChange = this.onDateFromChange.bind(this);
    this.onDateToChange = this.onDateToChange.bind(this);
  }

  componentDidMount() {
    const _dateFrom = this.formatDate(this.state.dateFrom);
    const _dateTo = this.formatDate(this.state.dateTo);
    const id_account_head = this.state.id_ledger;
    this.loadOp(_dateFrom, id_account_head);
    this.loadCredit(_dateFrom, _dateTo, id_account_head);
    this.loadDebit(_dateFrom,_dateTo,id_account_head);
    this.loadAccountHead();

  }
  loadAccountHead() {
    fetch(URL_LEDGER_DT)
      .then(response => response.json())
      .then(data => this.setState({ arrLedger: data }));
    //console.log(data)
  }

  loadCredit = (_dateFrom, _dateTo, id_account_head) => {
    alert(id_account_head)
    fetch(URL_CASHBOOK_CREDIT + `/'${_dateFrom}'` + `/'${_dateTo}'` + `/${id_account_head}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0)
          this.setState({
            arrCreditVouchers: data,
          })
      }
      );
  }

  loadDebit = (_dateFrom, _dateTo, id_account_head) => {
    fetch(URL_CASHBOOK_DEBIT + `/'${_dateFrom}'` + `/'${_dateTo}'` + `/${id_account_head}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0)
          this.setState({
            arrDebitVouchers: data,
          })
        }
      );
  }

  loadOp = (_dateFrom, id_account_head) => {
    fetch(URL_CASHBOOK_OP + `/'${_dateFrom}'` + `/${id_account_head}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0)
          this.setState({
            op: data[0].balance,
          })
      }
      );
      alert(this.state.op)
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
        const _dateFrom = this.formatDate(this.state.dateFrom);
        const _dateTo = this.formatDate(this.state.dateTo);
        const id_account_head = this.state.id_ledger;
        this.loadCredit(_dateFrom, _dateTo, id_account_head);
        this.loadDebit(_dateFrom, _dateTo, id_account_head);
        this.loadOp(_dateFrom, id_account_head);
      }
    )
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
    const balance     = debitTotal - creditTotal;
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
                            <th colspan={6} >
                              <div class="row" >
                                <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>Opening Balance :</label>
                                    <label>{this.state.op}</label>

                                  </div>
                                </div>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                      <div class="row" >
                       <div class="col-sm-6">
                       <div class="card card-warning">
                       <div class="card-body">
                      <table class="table">
                        <thead>
                          <tr>
                            <th style={{ width: '40%' }}>Name</th>
                            <th style={{ width: '35%' }}>Particulars</th>
                            <th style={{ width: '25%' }}>Debit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableDebitRows}
                        </tbody>
                        <tfoot>
                          <th>Total</th>
                          <th></th>
                          <th align="right" >{debitTotal}</th>
                        </tfoot>
                      </table>
                      </div>
                      </div>
                      </div>
                      <div class="col-sm-6">
                    <div class="card card-warning">
                      <div class="card-body">
                          <table class="table">
                            <thead>
                              <tr>
                                <th style={{ width: '40%' }}>Name</th>
                                <th style={{ width: '35%' }}>Particulars</th>
                                <th style={{ width: '25%' }}>Credit</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tableCreditRows}
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
                          <div class="row">
                      <div class="col-lg-12">
                        <div class="card card-info">
                          <div class="card-footer">
                            <label>Balance : {balance}</label>
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
        <td>{arrCredit.name}</td>
        <td>{arrCredit.narration}</td>
        <td>{arrCredit.credit}</td>
      </tr>
    );
  }
}


export default CashBook;