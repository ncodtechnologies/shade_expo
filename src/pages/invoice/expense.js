import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import { URL_EXPENSE_SAVE, URL_EXPENSE_DT } from '../constants';
import { URL_LEDGER_DT,URL_EXPENSE_DEL ,LEDGER_GROUPS} from '../constants';
import SimpleReactValidator from 'simple-react-validator';

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      date: new Date(),
      id_ledger_to: "",
      description: "",
      rate: "",
      qty: "",
      amount: "",
      type: "Receipt",
      voucher_no: "1",
      ledger: "",
      arrLedger: [],
      arrExpenses: [],      
      arrLedgerFrom: [],
      arrLedgerTo: [],
    };

    this.onAmountChange = this.onAmountChange.bind(this);
    this.onRateChange = this.onRateChange.bind(this);
    this.onQtyChange = this.onQtyChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onLedgerChange = this.onLedgerChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    const id_invoice = this.props.id_invoice;
    this.loadAccountHead();
    this.loadExpenseList(id_invoice);
    console.log(id_invoice);
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


  delExpense = (id_account_voucher) => {
    
    fetch(URL_EXPENSE_DEL + `/${id_account_voucher}` )
    .then(response => response.json())
    .then(data => {
      if(data.length>0)
      this.setState({
        arrExpenses: data ,
        })
        }
      );
      const id_invoice = this.props.id_invoice;
      this.loadExpenseList(id_invoice);
  }

  loadAccountHead(){
    var id_ledger_group_from = LEDGER_GROUPS.ACCOUNT;
    var id_ledger_group_to =  LEDGER_GROUPS.INV_EXPENSE;

    fetch(`${URL_LEDGER_DT}/${id_ledger_group_from}`)
    .then(response => response.json())
    .then(data => this.setState({ arrLedgerFrom:[{id_account_head:0, account_head:"--SELECT--"},...data ]}));
    
    fetch(`${URL_LEDGER_DT}/${id_ledger_group_to}`)
    .then(response => response.json())
    .then(data => this.setState({ arrLedgerTo: [{id_account_head:0, account_head:"--SELECT--"},...data ] }));

  }

  loadExpenseList = (id_invoice) => {
    fetch(URL_EXPENSE_DT + `/${id_invoice}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0)
          this.setState({
            arrExpenses: data,
          });
      });
    //console.log(data)
  };

  saveInvoice = () => {
    if (this.validator.allValid()) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date          : this.formatDate(this.state.date),
          id_ledger_to  : this.state.id_ledger_to,
          description   : this.state.description,
          rate          : isNaN(this.state.rate) ? "" : this.state.rate,
          amount        : isNaN(this.state.amount) ? "" : this.state.amount,
          type          : this.state.type,
          voucher_no    : this.state.voucher_no,
          id_invoice    : this.props.id_invoice,
        }),
      };
      fetch(URL_EXPENSE_SAVE, requestOptions).then((response) => 
        {
          response.json();
          this.loadExpenseList(this.props.id_invoice);
          this.setState({
            id_ledger_to: 0,
            description: "",
            rate: "",
            qty: "",
            amount: "",
          })
        }
      );
      
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };


  onDateChange = (date) => this.setState({ date });

  onDelRow = (id) => {
    this.setState({ description: id });
  };

  onDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  onRateChange(event) {
    this.setState({ 
      rate: event.target.value, 
      amount: this.state.qty * event.target.value
    });
  }

  onQtyChange(event) {
    this.setState({ 
      qty: event.target.value, 
      amount: event.target.value * this.state.rate
    });
  }

  onAmountChange(event) {
    this.setState({ amount: event.target.value });
  }
  onLedgerChange(event) {
    this.setState({ id_ledger_to: event.target.value });
  }

  render() {
    const tableRows = this.state.arrExpenses.map((arrExpense, index) =>
      <TableRow
        arrExpense={arrExpense}
        arrLedger = {this.state.arrLedger}
        delExpense={this.delExpense}
      />);

    const grandTotal = this.state.arrExpenses.reduce(
      (a, b) => +a + +b.amount,
      0
    );

    return (
      <div>
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-16">
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>
                        <tr>
                          <th colspan={6}>
                            <div class="row">
                              <div class="col-sm-6">
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
                              <div class="col-sm-6">
                                <div class="form-group">
                                  <label>Ledger</label>
                                  <select
                                    class="form-control"
                                    onChange={this.onLedgerChange}
                                    value={this.state.id_ledger_to}
                                  >
                                    {this.state.arrLedgerTo.map((ledger) => (
                                      <option value={ledger.id_account_head}>
                                        {ledger.account_head}
                                      </option>
                                    ))}
                                  </select>
                                  {this.validator.message(
                                    "id_ledger_to",
                                    this.state.id_ledger_to,
                                    "required|numeric"
                                  )}
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-4">
                                <div class="form-group">
                                  <label>Description</label>
                                  <input
                                    type="text"
                                    value={this.state.description}
                                    onChange={this.onDescriptionChange}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="col-sm-2">
                                <div class="form-group">
                                  <label>Qty (Freight)</label>
                                  <input
                                    type="text"
                                    value={this.state.qty}
                                    onChange={this.onQtyChange}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="col-sm-3">
                                <div class="form-group">
                                  <label>Rate (Freight)</label>
                                  <input
                                    type="text"
                                    value={this.state.rate}
                                    onChange={this.onRateChange}
                                    class="form-control"
                                  />
                                </div>
                              </div>
                              <div class="col-sm-3">
                                <div class="form-group">
                                  <label>Amount</label>
                                  <input
                                    type="text"
                                    value={this.state.amount}
                                    onChange={this.onAmountChange}
                                    class="form-control"
                                  />
                                  {this.validator.message(
                                    "amount",
                                    this.state.amount,
                                    "required|numeric"
                                  )}
                                </div>
                              </div>

                              <button
                                type="button"
                                class="btn btn-block btn-success btn-flat"
                                onClick={this.saveInvoice}
                              >
                                Save
                              </button>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th style={{ width: "25%" }}>Date</th>
                          <th style={{ width: "25%" }}>Ledger</th>
                          <th style={{ width: "25%" }}>Description</th>
                          <th style={{ width: "25%" }}>Amount</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>{tableRows}</tbody>
                      <tfoot>
                        <th>Total</th>
                        <th />
                        <th />
                        <th align="right">{grandTotal}</th>
                        <th />
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

  render() {
    let arrExpense = this.props.arrExpense;
    
    let ledger = (id_account_head) => {
      return this.props.arrLedger.filter(function (el) {
        return el.id_account_head == id_account_head;
      })[0].account_head;
    }

    const description = (arrExpense.rate != "" && arrExpense.rate != 0) 
                        ? `${(arrExpense.amount / arrExpense.rate)} x ${arrExpense.rate}`
                        : arrExpense.description; 

    return (
      <tr>
        <td>{arrExpense.date}</td>
        <td>{arrExpense.ledger}</td>
        <td>{description}</td>
        <td>{arrExpense.amount}</td>
        <td>
          <div class="btn-group">
            <button type="button" onClick={() =>this.props.delExpense(arrExpense.id_account_voucher)} class="btn btn-outline-danger"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    );
  }
}

export default Expense;