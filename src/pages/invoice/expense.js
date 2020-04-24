import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

const API = '/users/account_head';

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      date: new Date(),
      amount: '',
      ledger: '',
      arrLedger: [],
      arrExpenses: [
      ]
    }

    
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onLedgerChange = this.onLedgerChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  
  componentDidMount() {
    fetch(API)
    .then(response => response.json())
    .then(data => this.setState({ arrLedger: data }));
    //console.log(data)
  }


  onDateChange = date => this.setState({ date })

  delRow = (rowIndex) => {
    let _arrExpenses = this.state.arrExpenses;
    _arrExpenses.splice(rowIndex, 1);
    this.setState({
      arrExpenses: _arrExpenses
    })
  }

  onAmountChange(event) {
    this.setState({ amount: event.target.value })

  }

  onLedgerChange(event) {
    this.setState({ ledger: event.target.value })
  }

  onAddClick(e) {
    e.preventDefault();
    let _data = this.state.arrExpenses;
    _data.push({
      date: this.state.date.toLocaleDateString("en-US"),
      id_account_head: this.state.ledger,
      amount: this.state.amount
    })

    this.setState({
      arrExpenses: _data,
      id_account_head: 0,
      amount: "",
      date: new Date()
    })

  }

  render() {
    const tableRows = this.state.arrExpenses.map((arrExpense, index) =>
      <TableRow
        arrExpense={arrExpense}
        arrLedger = {this.state.arrLedger}
      />);

    const grandTotal = this.state.arrExpenses.reduce((a, b) => +a + +(b.amount), 0);

    return (
      <div >

        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr>
                          <th colspan={4} >
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
                              <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>Date</label>
                                    <select class="form-control" onChange={this.onLedgerChange}>
                                      {this.state.arrLedger.map((ledger) =>
                                        <option value={ledger.id_account_head}>{ledger.account_head}</option>)}
                                    </select>
                                  </div>
                              </div>
                              <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>Date</label>
                                    <select class="form-control" onChange={this.onLedgerChange}>
                                      {this.state.arrLedger.map((ledger) =>
                                        <option value={ledger.id_account_head}>{ledger.account_head}</option>)}
                                    </select>
                                  </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>Description</label>
                                    <input type="text" value={this.state.amount} onChange={this.onAmountChange} class="form-control" />
                                  </div>
                              </div>
                              <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>Rate</label>
                                    <input type="text" value={this.state.amount} onChange={this.onAmountChange} class="form-control" />
                                  </div>
                              </div>
                              <div class="col-sm-4">
                                  <div class="form-group">
                                    <label>Amount</label>
                                    <input type="text" value={this.state.amount} onChange={this.onAmountChange} class="form-control" />
                                  </div>
                              </div>
                                
                              
                                <button type="button"  class="btn btn-block btn-success btn-flat" onClick={(e) => this.onAddClick(e)}>
                                   Save
                                </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: '25%' }}>Date</th>
                          <th style={{ width: '50%' }}>Ledger</th>
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
    );
  }
}


class TableRow extends React.Component {


  delRow = () => {
    this.props.delRow(this.props.rowIndex);
  }

  render() {
    let arrExpense = this.props.arrExpense;
    
    let ledger = (id_account_head) => {
      return this.props.arrLedger.filter(function (el) {
        return el.id_account_head == id_account_head;
      })[0].account_head;
    }

    return (
      <tr>
        <td>{arrExpense.date}</td>
        <td>{ledger(arrExpense.id_account_head)}</td>
        <td>{arrExpense.amount}</td>
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