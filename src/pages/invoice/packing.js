import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

const API = '/users/account_head';
const APILabour = '/users/invoice/id_invoice/labour';
const APIPacking = '/users/invoice/id_invoice/packing';
const APIOtherExp = '/users/invoice/id_invoice/exp';

class Packing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LabourItems:[],
      packItems: [],
      ExpenseItems:[],
    }   
  }
  
  componentDidMount() {
    this.loadLabourItem();
    this.loadOtherExp();
    this.loadPacking();
  }

  loadLabourItem = () => {
    fetch(APILabour)
    .then(response => response.json())
    .then(data => this.setState({ LabourItems: data }));
  }
  loadPacking = () => {
    fetch(APIPacking)
    .then(response => response.json())
    .then(data => this.setState({ packItems: data }));
  }
  loadOtherExp = () => {
    fetch(APIOtherExp)
    .then(response => response.json())
    .then(data => this.setState({ ExpenseItems: data }));
  }
  render() {
    const tableRowsPacking = this.state.packItems.map((packItem, index) =>
      <TableRowPacking
      packItem={packItem} rowIndex={index}
      />
    );
    const tableRowsLabour = this.state.LabourItems.map((LabourItem, index) =>
      <TableRowLabour
      LabourItem={LabourItem} rowIndex={index}
      />
    );
    const tableRowsExpense = this.state.ExpenseItems.map((ExpenseItem, index) =>
      <TableRowsExpense
      ExpenseItem={ExpenseItem} rowIndex={index}
      />
    );   

    const grandTotalPacking = this.state.packItems.reduce((a, b) => +a + +(b.weight), 0);
    const grandTotalLabour = this.state.LabourItems.reduce((a, b) => +a + +(b.amount), 0);
    const grandTotalExpense = this.state.ExpenseItems.reduce((a, b) => +a + +(b.amount), 0);

    return (
      <div >

        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
              <div class="card-header">
                <h3 class="card-title">Packing List</h3>                
              </div>
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>                       
                        <tr>
                          <th style={{ width: '50%' }}>Items</th>
                          <th style={{ width: '50%' }}>Weight</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRowsPacking}
                      </tbody>
                      <tfoot>
                        <th>Net Weight</th>
                        <th align="right">{grandTotalPacking}</th>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
              <div class="card-header">
                <h3 class="card-title">Labour</h3>                
              </div>
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>                       
                        <tr>
                          <th style={{ width: '50%' }}>Name</th>
                          <th style={{ width: '50%' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRowsLabour}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th align="right" >{grandTotalLabour}</th>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
              <div class="card-header">
                <h3 class="card-title">Other Expenses</h3>                
              </div>
                <div class="card card-info">
                  <div class="card-body p-0">
                    <table class="table">
                      <thead>                       
                        <tr>
                          <th style={{ width: '50%' }}>Expense</th>
                          <th style={{ width: '50%' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRowsExpense}
                      </tbody>
                      <tfoot>
                        <th>Total</th>
                        <th align="right" >{grandTotalExpense}</th>
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

class TableRowPacking extends React.Component {
  render() {
    let packItem = this.props.packItem;

    return (
      <tr>
        <td>{packItem.name}</td>
        <td>{packItem.weight}</td>
      </tr>
    );
  }
}

class TableRowLabour extends React.Component {
  render() {
    let LabourItem = this.props.LabourItem;

    return (
      <tr>
        <td>{LabourItem.account_head}</td>
        <td>{LabourItem.amount}</td>
      </tr>
    );
  }
}

class TableRowsExpense extends React.Component {
  render() {
    let ExpenseItem = this.props.ExpenseItem;

    return (
      <tr>
        <td>{ExpenseItem.account_head}</td>
        <td>{ExpenseItem.amount}</td>
      </tr>
    );
  }
}

export default Packing;